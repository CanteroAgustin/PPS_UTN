import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDu4n9I1i--EiTidNE4d7NJ0Skp23l__To",
  authDomain: "practicaprofesionalsuper-f9964.firebaseapp.com",
  projectId: "practicaprofesionalsuper-f9964",
  storageBucket: "practicaprofesionalsuper-f9964.appspot.com",
  messagingSenderId: "684672745450",
  appId: "1:684672745450:web:69afb74cfe4081576bfc93"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };