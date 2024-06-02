import React, { useState } from 'react';

function PfpUpload() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);

      // TODO: Upload the image to the server

      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error('Failed to upload profile picture');
        }

        console.log('Profile picture uploaded successfully');
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }

    }
  };

  return (
    <div>
      <h2>Upload your Square Profile Picture</h2>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {/* TODO: Remove this part when server exists */}
      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} className="rounded-full "/>
      )}
    </div>
  );
}

export default PfpUpload;