import React, { useState } from 'react';
import "./profile.css";


function PfpUpload() {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

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


      window.location.reload();
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div>
      <h2>Upload your Square Profile Picture</h2>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
      )}
      <br></br>
      <button className="Upload-Image" 
        onClick={handleUploadButtonClick}
        variant="contained">
          Upload Profile Picture
      </button>
    </div>
  );
}

export default PfpUpload;