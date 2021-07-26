import firebase from "firebase/app";

import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIa67jbeG7EUhq-VFRXp5mSE-48AMEkig",
  authDomain: "question-e60ed.firebaseapp.com",
  projectId: "question-e60ed",
  storageBucket: "question-e60ed.appspot.com",
  messagingSenderId: "194856475001",
  appId: "1:194856475001:web:1d688f417c675cd97737a8",
};

// firebase.initializeApp(firebaseConfig);

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
