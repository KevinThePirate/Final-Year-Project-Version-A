import React from "react";
import { db } from "../firebase";
import { collection, addDoc, FieldValue, Timestamp } from "firebase/firestore";

export default function AddItem(props) {
  const [title, setTitle] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const userItemRef = collection(db, `users/${props.user.uid}/todos`);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, `users/${props.user.uid}/todos`), {
        title,
        createdAt: new Date(),
        checkInCounter: 0,
        lastCheckInDate: "",
        index: props.userItems.length + 1,
      });
      setTitle("");
    }
    props.getUserData();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input_container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="btn_container">
        <button>Add</button>
      </div>
    </form>
  );
}
