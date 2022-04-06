// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYnDBrGDqSz1mLQekVCp0XVnCVxiqgHnY",
    authDomain: "authentication-email-pass.firebaseapp.com",
    projectId: "authentication-email-pass",
    storageBucket: "authentication-email-pass.appspot.com",
    messagingSenderId: "527429980390",
    appId: "1:527429980390:web:ea4e1d6c656314b7096b27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;