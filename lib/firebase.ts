import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "dein_api_key",
  authDomain: "dein_project.firebaseapp.com",
  projectId: "dein_project_id",
  storageBucket: "dein_project.appspot.com",
  messagingSenderId: "dein_sender_id",
  appId: "dein_app_id",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPushPermission = async () => {
  try {
    const token = await getToken(messaging, {vapidKey: "dein_vapid_key"});
    if (token) return token;
  } catch (error) {
    console.error("Push-Berechtigung fehlgeschlagen", error);
  }
};

export const listenForPushMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Push erhalten:", payload);
    if (payload.notification?.title) {
      new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
    }
    return
  });
};
