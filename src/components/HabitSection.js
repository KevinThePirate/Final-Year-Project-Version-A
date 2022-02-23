import React from "react";
import { useState } from "react";
import AddItem from "./AddItem";
import LineItem from "./LineItem";

export default function HabitSection(props) {
  const handleSignOut = () => {
    console.log(props.userInfo.displayName);
    props.signUserOut();
    console.log(props.userInfo.displayName);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div>
      <p> User: {props.userInfo.displayName}</p>
      <p> ID: {props.userInfo.uid}</p>
      <button onClick={handleSignOut}>Sign Out!</button>
      <h2>Daily Habits:</h2>
      {props.userItems.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          handleDelete={props.handleDelete}
          handleCheckIn={props.handleCheckIn}
          getUserData={props.getUserData}
        />
      ))}
      <button onClick={open}>Add Item!</button>
      {modalOpen && (
        <div>
          <AddItem
            user={props.userInfo}
            getUserData={props.getUserData}
            userItems={props.userItems}
            modalOpen={modalOpen}
            handleClose={close}
          />
        </div>
      )}
    </div>
  );
}
