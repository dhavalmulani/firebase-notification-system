importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyA7cuJLQQeXyCx1cAnLbV8eEwyigFnIkKk",
    authDomain: "fir-notifications-e6800.firebaseapp.com",
    projectId: "fir-notifications-e6800",
    storageBucket: "fir-notifications-e6800.appspot.com",
    messagingSenderId: "1016747941125",
    appId: "1:1016747941125:web:6fec1512f5a0aa1ce96b6c",
    measurementId: "G-H67ZEQZKP6"
};

firebase.initializeApp(firebaseConfig);
self.addEventListener('notificationclick', event => {
    const url = event.notification.data.FCM_MSG.data.url
    if (url) {
        clients.openWindow(url);
    }
    event.notification.close();
});
const messaging = firebase.messaging();
