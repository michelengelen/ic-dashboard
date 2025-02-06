import React from 'react';
import { redirect } from "next/navigation";
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}!</h1>
      <p>Your email: {session.user?.email}</p>
    </div>
  );
}
