import firebaseConfig from "../shared/firebase-config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

document.querySelector("#google-sign-in__btn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      renderUserData(user);
    })
    .catch((error) => console.log(error));
});

function renderUserData(user) {
  document.querySelector(".google-mail__data").style.display = "flex";
  document.querySelector(".google-mail__img").style.display = "block";
  document
    .querySelector(".google-mail__img")
    .setAttribute("src", user.photoURL);
  document.querySelector(".user-name").innerText = user.displayName;
  document.querySelector(".user-email").innerText = user.email;
  document.querySelector("#google-sign-out__btn").style.display = "block";
  document.querySelector("#google-sign-in__btn").style.display = "none";
}

document
  .querySelector("#google-sign-out__btn")
  .addEventListener("click", () => {
    signOut(auth)
      .then(() => removeUserData())
      .catch((error) => console.log(error));
  });

function removeUserData() {
  document.querySelector("#google-sign-out__btn").style.display = "none";
  document.querySelector(".google-mail__data").style.display = "none";
  document.querySelector("#google-sign-in__btn").style.display = "block";
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    renderUserData(user);
  } else {
    removeUserData();
  }
});
