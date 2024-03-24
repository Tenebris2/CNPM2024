import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app"
const firebaseConfig = {
    apiKey: "AIzaSyDeCFKmR_zo8cXiczmNzbOoByKjeHpAmyw",
    authDomain: "todo-app-53a4e.firebaseapp.com",
    projectId: "todo-app-53a4e",
    storageBucket: "todo-app-53a4e.appspot.com",
    messagingSenderId: "1067734142541",
    appId: "1:1067734142541:web:e89dab339468602ed31604",
  };
  const application = initializeApp(firebaseConfig);
  export const auth = getAuth(application);