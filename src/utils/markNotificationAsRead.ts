import {  doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
export const markNotificationAsRead = async (notificationId: string) => {
    const notificationRef = doc(db, "notifications", notificationId);
    try {
      await updateDoc(notificationRef, {
        read: true,
      });
      console.log('Notification marked as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };