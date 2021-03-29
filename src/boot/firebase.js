import firebase from "firebase/app"

import "firebase/auth"
import "firebase/database"

var firebaseConfig = {
  apiKey: "AIzaSyBCdzcOSZkWH8GLn28YMAIaB8gTh69R8eU",
  authDomain: "awesome-todo-966b8.firebaseapp.com",
  databaseURL: "https://awesome-todo-966b8-default-rtdb.firebaseio.com",
  projectId: "awesome-todo-966b8",
  storageBucket: "awesome-todo-966b8.appspot.com",
  messagingSenderId: "728346055311",
  appId: "1:728346055311:web:057dbb421f3f1855b2d6fa"
}

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }