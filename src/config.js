import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
Firebase.initializeApp({
  apiKey: "AIzaSyACiRoGPsqUpb0j-0x5KsP-2Y1u9AdhQpI",
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
//   apiKey: "AIzaSyACiRoGPsqUpb0j-0x5KsP-2Y1u9AdhQpI",
//   authDomain: "sub-out.firebaseapp.com",
//   databaseURL: "https://sub-out.firebaseio.com",
//   projectId: "sub-out",
//   storageBucket: "sub-out.appspot.com",
//   messagingSenderId: "831431957639",
//   appId: "1:831431957639:web:f69262ea1fdbf9d996ac22"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
