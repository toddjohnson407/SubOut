import { API_KEY, APP_ID, MESSAGING_SENDER_ID } from 'react-native-dotenv'
import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
Firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: "sub-out.firebaseapp.com",
  projectId: "sub-out",
  storageBucket: "sub-out.appspot.com",
});

export const db = Firebase.firestore();
export const auth = Firebase.auth();
export const storage = Firebase.storage();

export let createTimestamp = () => Firebase.firestore.Timestamp.fromDate(new Date())
export let arrayPush = (item) => Firebase.firestore.FieldValue.arrayUnion(item)
export let arrayRemove = (item) => Firebase.firestore.FieldValue.arrayRemove(item)



// var firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: "sub-out.firebaseapp.com",
//   databaseURL: "https://sub-out.firebaseio.com",
//   projectId: "sub-out",
//   storageBucket: "sub-out.appspot.com",
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
