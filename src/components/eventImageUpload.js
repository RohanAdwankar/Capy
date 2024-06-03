import React, { useState } from 'react';

function EventImageUpload() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);

      // TODO: Upload the image to the server
    }
  };

  return (
    <div>
      <h2>Upload an Image for the Event</h2>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {/* TODO: Remove this part when server exists */}
      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} className="rounded-full "/>
      )}
    </div>
  );
}

export default EventImageUpload;