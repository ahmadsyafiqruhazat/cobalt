import firebase from "firebase/app";
import "firebase/auth";

export default {
  isUserLoggedIn: () => {
    let isAuthenticated = false;

    // get firebase current user
    const firebaseCurrentUser = firebase.auth().currentUser;

    if (firebaseCurrentUser) isAuthenticated = true;
    else isAuthenticated = false;

    return localStorage.getItem("userInfo") && isAuthenticated;
  }
};
