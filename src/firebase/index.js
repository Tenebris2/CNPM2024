import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDeCFKmR_zo8cXiczmNzbOoByKjeHpAmyw",
  authDomain: "todo-app-53a4e.firebaseapp.com",
  projectId: "todo-app-53a4e",
  storageBucket: "todo-app-53a4e.appspot.com",
  messagingSenderId: "1067734142541",
  appId: "1:1067734142541:web:e89dab339468602ed31604",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
