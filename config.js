import * as firebase from 'firebase';
require ('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyDIxnnF44qTh1Z3657vMGmXnaEH98XW6Ew",
    authDomain: "student-hub-f3bfe.firebaseapp.com",
    databaseURL: "https://student-hub-f3bfe.firebaseio.com",
    projectId: "student-hub-f3bfe",
    storageBucket: "student-hub-f3bfe.appspot.com",
    messagingSenderId: "232590523103",
    appId: "1:232590523103:web:ef602441545cfe1b85876a"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();