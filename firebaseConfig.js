import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyAVjfBhilux_3BIyx486cRR2dsybsseKA8",
//   authDomain: "team-a5651.firebaseapp.com",
//   databaseURL: "https://team-a5651-default-rtdb.firebaseio.com",
//   projectId: "team-a5651",
//   storageBucket: "team-a5651.appspot.com",
//   messagingSenderId: "804446190852",
//   appId: "1:804446190852:web:0c224d3c24ade8b792e451"
// };


const firebaseConfig = {
  apiKey: "AIzaSyB_h8fvb2J3XFdP6TGlynRsNV_79fxlZvU",
  authDomain: "finalproject-9e9c9.firebaseapp.com",
  projectId: "finalproject-9e9c9",
  storageBucket: "finalproject-9e9c9.appspot.com",
  messagingSenderId: "111093244594",
  appId: "1:111093244594:web:6f138df7685f0f61abdfab"
};


const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { db }

