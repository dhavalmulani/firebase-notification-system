import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app, db } from '../firebaseConfig';
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";

const VAPID_KEY = process.env.REACT_APP_FIREBASE_VAPID_KEY;

export const notifications = (status: string) => {
  const sendNotification = async (token: string,) => {
    const url = process.env.REACT_APP_API_ENDPOINT || "";
    const headers = {
      'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    };

    let title: string;
    let body: string;
    switch (status) {
      case 'success':
        title = 'Success Notification';
        body = 'Your operation was successful!';
        break;
      case 'info':
        title = 'Information Notification';
        body = 'Here is some important information for you.';
        break;
      case 'warning':
        title = 'Warning Notification';
        body = 'Please be cautious, something needs your attention.';
        break;
      default:
        title = 'Notification';
        body = 'You have a new message.';
        break;
    }
const uuid = new Date().toISOString()
    const data = {
      message: {
        token: token,
        notification: {
          body: body,
          title: title,
          
        }
      }
    };

    try {
      const response = await axios.post(url, data, { headers });
      console.log('Notification sent successfully:', response.data);
          // Save notification to Firestore
    await setDoc(doc(db, "notifications", uuid), {
      title,
      body,
      read: false,
      timestamp: new Date(),
    });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const messaging = getMessaging(app);
      if (messaging) {
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        
        sendNotification(token);

        onMessage(messaging, (payload) => {
          if (payload.notification) {
            const { title, body } = payload.notification;
            const notification = new Notification(title || "default", { body });

            notification.onclick = (data) => {
              console.log("chalse",data)
              // markNotificationAsRead(notificationId);
            };
          }
        });

        return token;
      }
    }
  };

  requestPermission();
};