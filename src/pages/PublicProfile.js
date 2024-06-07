import React, { useState } from "react";
import profile from "../assets/coda.png";
import PfpUpload from "./PfpUpload";
import { store } from "../Main.js";
import { ProfilePicture } from "../Main.js";
import { useParams, useNavigate } from "react-router-dom";
import UserEvents from "./UserEvents";

export default function PublicProfile() {
  const { username } = useParams();
  const [isSignedIn, setSignedIn] = store.useState("signedIn", {
    default: false,
  });
  const navigate = useNavigate();

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold">{username}'s Profile</h1>
            <button
              className="mt-4 bg-indigo-500 text-white rounded-lg p-2 px-5 hover:bg-indigo-700"
              onClick={() => {
                navigate(`/friends`);
              }}
            >
              Back
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            <UserEvents username={username} />
          </div>
        </div>
      </div>
    </div>
  );
}
