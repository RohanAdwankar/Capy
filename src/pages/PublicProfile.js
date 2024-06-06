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
    <div>
      <h1>Public Profile</h1>
      <button
        className="bg-black text-white rounded-full p-2 px-5 ml-10 hover:bg-gray-500"
        onClick={() => {
          navigate(`/friends`);
        }}
      >
        Back
      </button>
      <p>User ID: {username}</p>
      <UserEvents username={username} />
      {/* Fetch and display the user's profile based on the userId */}
    </div>
    // <div>
    // {isSignedIn ? (
    // 	<div>
    // 		<div className="place-content-center">

    // 			<div className="flex items-center my-5">
    // 				<ProfilePicture />
    // 				<div>
    // 					<PfpUpload/>
    // 				</div>
    // 			</div>
    // 		</div>
    // 	</div>
    // ) : (
    // 	<div>
    // 		<div className="flex items-center my-5">
    // 			<p>Please Sign In</p>
    // 		</div>

    // 	</div>

    // )}
    // </div>
  );
}
