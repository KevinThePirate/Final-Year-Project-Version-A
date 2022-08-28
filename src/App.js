import logo from "./logo.svg";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { db, authentication } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  orderBy,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  update,
} from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";

import SignIn from "./components/SignIn";
import HabitSection from "./components/HabitSection";
import MoodTrackingSection from "./components/MoodTracking/MoodTrackingSection";
import VirtualPet from "./components/VirtualPet/VirtualPet";

function App() {
  //const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  //const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  let userItemRef = collection(db, `users/${userInfo.uid}/todos`);
  const [userItems, setUserItems] = useState([]);
  const [standHabits, setStandHabits] = useState([]);

  let localItemArray = [];
  let testArr = [];
  const getUserData = () => {
    //console.log("Ran getUserData()");
    //console.log(userInfo);
    userItemRef = collection(db, `users/${userInfo.uid}/todos`);
    const sortedItemsQuery = query(userItemRef, orderBy("index"));
    /*onSnapshot(qu, (snapshot) => {
      let books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      console.log(books);
    });*/
    getDocs(sortedItemsQuery)
      .then((snapshot) => {
        //const q = query(citiesRef, orderBy("name", "desc"), limit(3));
        //const qu = query(userItemRef, orderBy("id", "desc"), limit(10));
        //console.log(qu);
        localItemArray = [];
        //console.log({ userInfo });
        //console.log(snapshot.docs);
        snapshot.docs.forEach((doc) => {
          localItemArray.push({ ...doc.data(), id: doc.id });
        });
        setUserItems(localItemArray);
        //console.log({ bookArr });
      })
      .catch((error) => console.log(error.message));
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        // console.log("re");
        // console.log(re.user);
        // console.log(re.user.uid);
        // console.log(`users/${re.user.uid}/todos`);
        // console.log({ userInfo });
        setUserInfo(re.user);
        // console.log({ userInfo });
        getUserData();
      })
      .then(getUserData)
      .catch((err) => console.log(err));
    getUserData();
  };
  const handleDelete = async (id) => {
    console.log("delete func");
    await deleteDoc(doc(db, `users/${userInfo.uid}/todos`, id));
  };

  const handleCheckIn = async (id, currentCount) => {
    console.log("base func ran");
    const docRef = doc(db, `users/${userInfo.uid}/todos`, id);

    await updateDoc(docRef, {
      checkInCounter: currentCount + 1,
      lastCheckInDate: new Date().toDateString(),
    });
  };

  const signUserOut = () => {
    signOut(authentication)
      .then(() => {
        // Sign-out successful.
        console.log("Signed Out");
        console.log(userInfo.displayName);
        setUserInfo("");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
    console.log("Test");
  };

  const getStandardHabits = () => {
    let localArr = [];
    let standHabitsCol = collection(db, "standardHabits");
    getDocs(standHabitsCol)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const habit = doc.data().habitTitle;
          localArr.push(habit);
        });
        setStandHabits(localArr);
      })
      .catch((error) => console.log(error.message));
  };

  /*getDocs(userItemRef)
    .then((snapshot) => {
      //console.log(snapshot.docs);
      snapshot.docs.forEach((doc) => {
        bookArr.push({ ...doc.data(), id: doc.id });
      });
      setBooks(bookArr);
      // console.log({ bookArr });
    })
    .catch((error) => console.log(error.message));*/
  useEffect(() => getUserData(), [userInfo, handleDelete]);

  useEffect(() => getStandardHabits(), []);

  const petRef = useRef(null);
  const accessEXP = () => {
    petRef.current();
  };

  return (
    <div className="App">
      {userInfo.uid ? (
        <div style={{ color: "white" }}>
          <p> User: {userInfo.displayName}</p>
          <p> ID: {userInfo.uid}</p>
        </div>
      ) : (
        <SignIn signInWithGoogle={signInWithGoogle} />
      )}
    </div>
  );
}

export default App;
