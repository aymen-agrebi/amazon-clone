// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

  const firebaseConfig = {
    apiKey: "AIzaSyBBkq6iifZrpxGus03EQ2lI0QAQRGz_13I",
    authDomain: "marketplace-react-291a9.firebaseapp.com",
    projectId: "marketplace-react-291a9",
    storageBucket: "marketplace-react-291a9.appspot.com",
    messagingSenderId: "912558848298",
    appId: "1:912558848298:web:794ec98aa72d17dcea0653",
    measurementId: "G-KGMKH91ZFE"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  export { db, auth };