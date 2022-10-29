import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import app from "./firebaseconfig";

const auth = getAuth(app);
const database = getDatabase(app);

const SignupUser = (obj) => {
  const { email, password, username, contact, } = obj;

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(obj);
        const reference = ref(database, `users/${user.uid}`);
        obj.id = user.uid;
        set(reference, obj)
          .then(() => {
            resolve("User Created Successfully");
          })
          .catch((err) => {
            reject(err);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  });
};

let loginUser = (obj) => {
  const { email, password } = obj;
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const reference = ref(database, `users/${user.uid}`);
        onValue(reference, (e) => {
          let status = e.exists();
          console.log(status);
          if (status) {
            resolve(e.val());
          } else {
            reject("Data Not Found");
          }
        });
      })
      .catch(() => { })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        reject(errorMessage);
        // ..
      });
  });
};

let checkUser = () => {
  const user = auth.currentUser;
  return new Promise((resolve, reject) => {

    onAuthStateChanged(auth, (user) => {


      if (user) {
        resolve(user)
      } else {
        reject("no user")
      }
    })
  })
}

const sendData = (obj, nodeName, id) => {

  let postListRef;

  return new Promise((resolve, reject) => {


    if (id) {

      postListRef = ref(database, `${nodeName}/${id}`);
    } else {
      let addRef = ref(database, nodeName)

      obj.id = push(addRef).key;

      postListRef = ref(database, `${nodeName}/${obj.id}`);

    }

    set(postListRef, obj).then((res) => {
      resolve("Data Send")
    }).catch((err) => {
      reject(err)
    })
  })
}

const getData = (nodeName, id) => {

  let reference = ref(database, `${nodeName}/${id ? id : ""}`)

  return new Promise((resolve, reject) => {

    onValue(reference, (snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val()
        console.log(data)

        if (id) {
          resolve(data)
        } else {
          resolve(Object.values(data))
        }
        // if (id) {
        //   resolve(data)
        // }else{

        // }
      } else {
        // no Data Found
        reject('no Data Found')
      }
    }, {
      onlyOnce: false
    });
  })
}




export { SignupUser, loginUser, checkUser, sendData, getData };
