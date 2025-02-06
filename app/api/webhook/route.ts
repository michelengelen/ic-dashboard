import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!))
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const headers = req.headers;
    let provider: 'github' | 'gitlab' | 'bitbucket' | undefined;

    // Determine the service sending the webhook
    if (headers.get('X-GitHub-Event')) {
      provider = 'github';
    } else if (headers.get('X-Gitlab-Event')) {
      provider = 'gitlab';
    } else if (headers.get('X-Event-Key')) {
      provider = 'bitbucket';
    } else {
      return NextResponse.json({ success: false, message: 'Unknown webhook source' }, { status: 400 });
    }

    // Extract relevant issue/PR data
    const isIssue = body.issue !== undefined;
    const isPR = body.pull_request !== undefined;

    if (!isIssue && !isPR) {
      return NextResponse.json({ success: false, message: 'Not an Issue or PR event' }, { status: 400 });
    }

    const eventType = isIssue ? 'issue' : 'pr';
    const title = isIssue ? body.issue.title : body.pull_request.title;
    const repository = body.repository.full_name;
    // const senderEmail = body.sender?.email || null;

    // Find the user based on OAuth provider ID
    const serviceUser = await prisma.service.findFirst({
      where: { provider, providerId: body.sender?.id?.toString() },
      include: { user: { include: { preferences: true } } }
    });

    if (!serviceUser || !serviceUser.user || !serviceUser.user.preferences) {
      return NextResponse.json({ success: false, message: 'No user found for this event' }, { status: 404 });
    }

    const user = serviceUser.user;
    const preferences = user.preferences;

    // Check user notification settings
    if (!preferences?.[provider]) {
      return NextResponse.json({ success: true, message: `User disabled notifications for ${provider}` });
    }

    if (!user.pushToken) {
      return NextResponse.json({ success: false, message: 'User has no push notification token' }, { status: 400 });
    }

    // Create notification in database
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: eventType,
        title,
        message: `New ${eventType} in ${repository}`,
        repository
      }
    });

    // Send push notification via Firebase
    await admin.messaging().send({
      token: user.pushToken,
      notification: {
        title: `New ${eventType.toUpperCase()} in ${repository}`,
        body: title
      }
    });

    return NextResponse.json({ success: true, message: 'Notification sent' });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
