// NOTE
// Please use your own firebase details below. For more details visit: https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/development/firebaseIntegration.html

import firebase from "firebase/app";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBkTZDNl_gZh5LFe9yT0qHL-Ss_iUugYZE",
  authDomain: "cs5224-cobalt.firebaseapp.com",
  databaseURL: "https://cs5224-cobalt.firebaseio.com",
  projectId: "cs5224-cobalt",
  storageBucket: "cs5224-cobalt.appspot.com",
  messagingSenderId: "982532369150",
  appId: "1:982532369150:web:8306974ad26fd4d44593af",
  measurementId: "G-P1NJ7RWT6Z"
};

firebase.initializeApp(config);
