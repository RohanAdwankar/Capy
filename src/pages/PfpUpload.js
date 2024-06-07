import React, { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";

function PfpUpload() {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [profilePictureUploaded, setProfilePictureUploaded] = useState(false);

  const CurrentProfilePicture = () => {
    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {
      fetch("/api/profile", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch Profile Picture");
          }
          return response.json();
        })
        .then((data) => {
          setProfilePicture(data.profilePicture);
        })
        .catch((error) => {
          console.error("Error fetching Profile Picture:", error);
        });
    }, []);

    return (
      <div className="w-48 h-48 relative overflow-hidden rounded-full">
        <img
          className="absolute min-w-full min-h-full object-cover"
          src={`data:image/jpeg;base64,${profilePicture}`}
        />
      </div>
    );
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setUploadedImage(file);
    }
  };

  const handleUploadButtonClick = async () => {
    if (!uploadedImage) {
      console.error("No image uploaded");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", uploadedImage);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to upload profile picture");
      }

      console.log("Profile picture uploaded successfully");

      setProfilePictureUploaded(true);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white">
      <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          Current Profile Picture:
        </h2>
        <div className="flex flex-col items-center justify-center">
          <CurrentProfilePicture />
        </div>
      </div>
      <div className="h-4" />
      <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          Upload your Square Profile Picture
        </h2>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/png, image/gif, image/jpeg, image/jpg"
          className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border-0 file:rounded-full file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {imagePreview && (
          <div className="mt-4 flex justify-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-100 h-100 object-cover rounded-lg border border-gray-300 shadow-md"
            />
          </div>
        )}
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUploadButtonClick}
        >
          Upload Profile Picture
        </button>
        {profilePictureUploaded && (
          <div className="mt-4 text-center text-green-600">
            Profile picture uploaded successfully! Reload to see new profile
            picture.
          </div>
        )}
      </div>
    </div>
  );
}

export default PfpUpload;
