import React, { useState } from 'react';
import "./profile.css";


function PfpUpload() {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [profilePictureUploaded, setProfilePictureUploaded] = useState(false);

  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        setErrorMessage('Please upload a .jpeg, .jpg, or .png file');
        return;
      }
  
      setErrorMessage('');
      let reader = new FileReader();
  
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setUploadedImage(file);
      }
  
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = async () => {
    if (!uploadedImage) {
      console.error('No image uploaded');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', uploadedImage);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', 
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }



      console.log('Profile picture uploaded successfully');


      setProfilePictureUploaded(true);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div>
      <h2>Upload your Square Profile Picture</h2>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {errorMessage && <div>{errorMessage}</div>}
      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
      )}
      <br></br>
      <button className="Upload-Image" 
        onClick={handleUploadButtonClick}
        variant="contained">
          Upload Profile Picture
      </button>
      {profilePictureUploaded && <div>Profile picture uploaded successfully! Reload to see new profile picture</div>}
    </div>
  );
}

export default PfpUpload;