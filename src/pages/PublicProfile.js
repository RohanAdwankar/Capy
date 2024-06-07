import React, { useState, useEffect } from "react";
import profile from "../assets/coda.png";
import PfpUpload from "./PfpUpload";
import { store } from "../Main.js";
import { ProfilePicture } from "../Main.js";
import { useParams, useNavigate } from "react-router-dom";
import UserEvents from "./UserEvents";
import axios from "axios";

export default function PublicProfile() {
  const { username } = useParams();
  const [isSignedIn, setSignedIn] = store.useState("signedIn", {
    default: false,
  });
  const navigate = useNavigate();
  const [userProfilePicture, setUserProfilePicture] = useState();

  useEffect(() => {
    const fetchFriendProfilePicture = async () => {
      try {
        const friendProfile = await axios.get("/api/getUserProfile", {
          params: { username: username },
        });
        setUserProfilePicture(friendProfile.data.profilePicture);
      } catch (error) {
        console.error("Failed to fetch friendProfile", error);
      }
    };

    fetchFriendProfilePicture();
  }, [username]); // Add username to dependency array if it can change

  return (
    <div className="max-w-xl px-4 pb-10 bg-white shadow-lg sm:rounded-3xl">
      <div className="max-w-md mx-auto px-10 pt-5">
        <button
          className="mt-4 bg-indigo-500 text-white rounded-lg px-5 p-2 hover:bg-indigo-700"
          onClick={() => {
            navigate(`/friends`);
          }}
        >
          Back
        </button>
        <div>
          <h1 className="text-2xl font-semibold pb-3">{username}'s Profile</h1>
          <img
            src={`data:image/jpeg;base64,${userProfilePicture}`}
            className="w-36 h-36 rounded-full mx-auto"
          />
        </div>
        <div className="divide-y divide-gray-200">
          <UserEvents username={username} />
        </div>
      </div>
    </div>
  );
}
