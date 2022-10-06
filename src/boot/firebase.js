import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async (/* { app, router, ... } */) => {
//   // something to do
// })


// const firebaseConfig = {
//   apiKey: "AIzaSyACxq9roQyZfqEkjGYAFCpfFkYhnFdyu1Q",
//   authDomain: "heian-io-dev.firebaseapp.com",
//   projectId: "heian-io-dev",
//   storageBucket: "heian-io-dev.appspot.com",
//   messagingSenderId: "296041537044",
//   appId: "1:296041537044:web:1abbd06d0f1e6bb65d5101"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCNI0hghJ8-Uh2qlgod2uFSFDMp_RV4pqU",
  authDomain: "littera-lis-43a10.firebaseapp.com",
  databaseURL: "https://littera-lis-43a10-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "littera-lis-43a10",
  storageBucket: "littera-lis-43a10.appspot.com",
  messagingSenderId: "727501793244",
  appId: "1:727501793244:web:f9f4dedf6808d0bf92d119",
  measurementId: "G-R1LFW4TF9J"
};

console.log('BOOT firebase.js')

import { initializeApp } from "firebase/app"
const fbapp = initializeApp(firebaseConfig)

import { getAuth, connectAuthEmulator } from "firebase/auth"
const auth = getAuth()

import { getFunctions, connectFunctionsEmulator  } from "firebase/functions"
const func = getFunctions()

import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
const fsdb = getFirestore()

import { getStorage, connectStorageEmulator } from "firebase/storage"
const storage = getStorage()

connectAuthEmulator(auth, "http://localhost:9099")
connectFunctionsEmulator(func, "localhost", 5001)
connectFirestoreEmulator(fsdb, 'localhost', 8080)
connectStorageEmulator(storage, "localhost", 9199)




export default boot(async ({ app, router, store, Vue }) => {
  //Vue.prototype.$firebase = firebase
  router.beforeEach((to, from, next) => {
    console.log('before route', from.path, '=>', to.path)
    auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        localStorage.setItem('currentUser', null);
        if ((to.path != "/login") && (to.path != "/register") )next("/login"); else next();
      }
      if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        if (to.path == '/login') next("/"); else next();
      }
    })

  })
})



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";

// import { firebaseui } from 'firebaseui'

// const firebaseConfig = {
//   apiKey: "AIzaSyCNI0hghJ8-Uh2qlgod2uFSFDMp_RV4pqU",
//   authDomain: "littera-lis-43a10.firebaseapp.com",
//   databaseURL: "https://littera-lis-43a10-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "littera-lis-43a10",
//   storageBucket: "littera-lis-43a10.appspot.com",
//   messagingSenderId: "727501793244",
//   appId: "1:727501793244:web:f9f4dedf6808d0bf92d119",
//   measurementId: "G-R1LFW4TF9J"
// };

// // Initialize Firebase
// const fbapp = initializeApp(firebaseConfig);
// const anal = getAnalytics(fbapp);
// const auth = getAuth();
// const rtdb = getDatabase(fbapp);
// const fsdb = getFirestore(fbapp);

// let email = "marko.petejan@gmail.com";
// let password = "tiramisu";

// // auth.onAuthStateChanged((user) => {
// //     if (user) {
// //         // User is signed in.
// //         console.log("user already logged in", user);
// //     } else {
// //         // User is not signed in.
// //         console.log("user NOT logged in... logging in...");
// //         login();
// //     }
// // });

// const login = () =>
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       console.log("LOGGED IN AS USER", userCredential);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });

// export default async ({ app, router, store }) => {
//   return new Promise(resolve => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       resolve()
//       unsubscribe()
//       if (!user) login()
//     })
//   })
// }




/*
https://stackoverflow.com/questions/68381469/how-to-mount-quasar-app-to-dom-after-firebase-connection-is-initialized
As mentioned earlier, boot file runs before Vue component is instantiated. Now you can access this instance of Firebase Auth in any component you want.

import {auth} from "@/boot/firebase"

auth.onAuthStateChanged((user) => {
  //...
})

https://github.com/steveclarke/quasar-firebase-example/tree/master/src/boot


https://dev.to/quasar/to-the-stars-with-quasar-firebase-email-authentication-37dh



*/
