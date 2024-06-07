import React, { useState } from "react";
import profile from "../assets/coda.png";
import PfpUpload from "./PfpUpload";
import { store } from "../Main.js";
import { ProfilePicture } from "../Main.js";

export default function Profile() {
  const [isSignedIn, setSignedIn] = store.useState("signedIn", {
    default: false,
  });

  return (
    <div>
      {isSignedIn ? (
        <div className="place-content-center flex items-center my-5">
          <PfpUpload />
        </div>
      ) : (
        <div className="flex items-center my-5">
          <p>Please Sign In</p>
        </div>
      )}
    </div>
  );
}
