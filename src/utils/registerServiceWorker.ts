

//  Registers the service worker for Firebase Messaging.
export const registerServiceWorker = async (): Promise<void> => {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service worker registered successfully.');
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    } else {
      console.warn('Service workers are not supported in this browser.');
    }
  };
  