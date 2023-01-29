// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtIQhc5wKRwu7dDHKyH5HFEytRMnJiLxw",
  authDomain: "newmad1.firebaseapp.com",
  projectId: "newmad1",
  storageBucket: "newmad1.appspot.com",
  messagingSenderId: "137999259256",
  appId: "1:137999259256:web:4d3af12ab9753e56a27f8d"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
     app=firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };