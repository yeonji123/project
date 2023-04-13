import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";



// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB-QZL-1JtLFJ1Z59E_m4-d9H6ifsziDqQ",
  authDomain: "check-83c37.firebaseapp.com",
  databaseURL: "https://check-83c37-default-rtdb.firebaseio.com",
  projectId: "check-83c37",
  storageBucket: "check-83c37.appspot.com",
  messagingSenderId: "227830654669",
  appId: "1:227830654669:web:f8991b8bd395e6b0086b84",
  
};


// const firebaseConfig = {
//   apiKey: "AIzaSyB_h8fvb2J3XFdP6TGlynRsNV_79fxlZvU",
//   authDomain: "finalproject-9e9c9.firebaseapp.com",
//   projectId: "finalproject-9e9c9",
//   storageBucket: "finalproject-9e9c9.appspot.com",
//   messagingSenderId: "111093244594",
//   appId: "1:111093244594:web:6f138df7685f0f61abdfab"
// };


const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const storage = getStorage(app);

export { db, storage }


