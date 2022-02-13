import React from "react";

export default function SignIn(props) {
  return (
    <div>
      <button onClick={props.signInWithGoogle}> Sign In! </button>
    </div>
  );
}
