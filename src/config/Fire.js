import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAEs1rhpzDbnxagQOLwFl5LUpqTHZ2XGIo",
  authDomain: "roommate-5923e.firebaseapp.com",
  databaseURL: "https://roommate-5923e.firebaseio.com",
  projectId: "roommate-5923e",
  storageBucket: "roommate-5923e.appspot.com",
  messagingSenderId: "762141443316",
  appId: "1:762141443316:web:7cc16750627b495ba58aa1",
  measurementId: "G-2H80ZW6BN9",
};

const fireBase = firebase.initializeApp(firebaseConfig);
export default fireBase;
