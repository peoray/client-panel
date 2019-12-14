import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8c0_Cvy0w2R2nJEGmhG9e2nP31Il4Gu0",
  authDomain: "client-panel-e75d3.firebaseapp.com",
  databaseURL: "https://client-panel-e75d3.firebaseio.com",
  projectId: "client-panel-e75d3",
  storageBucket: "client-panel-e75d3.appspot.com",
  messagingSenderId: "676708999300",
  appId: "1:676708999300:web:375d4b8abefc103a0622d1"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: firebaseConfig.projectId })
  .firestore();
