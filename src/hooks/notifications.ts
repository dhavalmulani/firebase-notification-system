import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from '../firebaseConfig';
import axios from "axios";

const VAPID_KEY = process.env.REACT_APP_FIREBASE_VAPID_KEY;

export const notifications = (status:string) => {
const sendNotification = async (token:string) => {
  const url = process.env.REACT_APP_API_ENDPOINT || "";
  const headers = {
    'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN }`,
    'Content-Type': 'application/json'
  };

  // Define dynamic title and body based on status
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

  const data = {
    message: {
      token: token,
      notification: {
        body: body,
        title: title
      }
    }
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log('Notification sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
    const requestPermission = async () => {
      // Requesting permission from the user to show notifications
      const permission = await Notification.requestPermission();
      if (permission === "granted") {

        // Initialize Firebase Messaging
        const messaging =  getMessaging(app);
        if (messaging) {

        // Get the FCM token for the current device
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        sendNotification(token)
        
        // Listen for incoming messages while the app is in the foreground
        onMessage(messaging, (payload) => {
          if (payload.notification) {
            const { title, body } = payload.notification;
            // Display the notification using the browser's Notification API
            new Notification(title || "default", { body });
          }
        });
        return token;
        }
      }
    };
    requestPermission();

};
