
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBRHt5bgeJjIE5G_DPmbfN0PItrCBV0-2s",
  authDomain: "makemyapp-defaa.firebaseapp.com",
  projectId: "makemyapp-defaa",
  storageBucket: "makemyapp-defaa.firebasestorage.app",
  messagingSenderId: "995080125295",
  appId: "1:995080125295:web:c8eda34d5694866d87869a",
  measurementId: "G-9YYJP2Q07L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);