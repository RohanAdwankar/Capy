import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from '../assets/coda.png';


export default function CreateEvent() {
  const rightNow = Date.now();
  const oneHourLater = new Date(rightNow + 1000 * 60 * 60);
  const defaultEventTime = new Date(oneHourLater.setMinutes(0, 0, 0)); // 1 hour from now, rounded down to the nearest hour

  const [eventData, setEventData] = useState({
    title: "",
    location: "",
    date: defaultEventTime,
    time: `${String(defaultEventTime.getHours()).padStart(2, "0")}:${String(
      defaultEventTime.getMinutes()
    ).padStart(2, "0")}`,
    description: "",
  });
  const [uploadedImage, setUploadedImage] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      setUploadedImage(file);
    }
  };

  const requiredFields = ["title", "location", "date", "time"];

  async function handleEventSubmission() {
    try {
      for (let field of requiredFields) {
        if (!eventData[field]) {
          alert("Please fill out all required fields.");
          return;
        }
      }

      console.log("Event data before submission:", eventData);
      console.log("Uploaded image:", uploadedImage);

      const formData = new FormData();

      for (let field in eventData) {
        formData.append(field, eventData[field]);
      }

      formData.append("image", uploadedImage);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      await axios.post("/api/createEvent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      setError(true);
    }
  }

  const inputFieldClass = "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="mt-5">
      {!submitted ? (
        <>
        <div className="flex items-center justify-center min-h-screen overflow-hidden">
          <div className="bg-white rounded-lg shadow-lg flex w-3/4 h-3/4 transform -translate-y-20"> 
            <img src={logo} alt="Sign" className="object-cover h-full w-full rounded-l-lg" />
          </div>

          <div className="w-1/2 p-8">
            <h1 className="text-4x1 font-bold mb-6 text-center">What's Happening?</h1>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="What are you doing?"
                className={inputFieldClass}
                onChange={(event) =>
                  setEventData({ ...eventData, title: event.target.value })
                }
              />{" "}
              <input
                type="text"
                placeholder="Where is it at?"
                className={inputFieldClass}
                onChange={(event) => {
                  setEventData({ ...eventData, location: event.target.value });
                }}
              />{" "}
              <DatePicker
                placeholderText="What day?"
                selected={eventData.date}
                className={inputFieldClass}
                onChange={(date) => {
                  setEventData({ ...eventData, date: date });
                }}
              />
              <input
                type="time"
                placeholder="What time?"
                value={eventData.time}
                className={inputFieldClass}
                onChange={(event) => {
                  setEventData({ ...eventData, time: event.target.value });
                }}
              />{" "}
              <textarea
                placeholder="Optional event description. What's going down?"
                className="rounded-lg bg-gray-100 p-2 pl-5 mt-10 mb-2 w-full"
                onChange={(event) => {
                  setEventData({ ...eventData, description: event.target.value });
                }}
              ></textarea>{" "}
              <input type="file" onChange={handleImageChange} accept="image/png, image/gif, image/jpeg image/jpg" />
              <button
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={handleEventSubmission}
              >
                Create Event
              </button>
            </form>
          </div>
        </div>
          {/*<input
            type="text"
            placeholder="What are you doing?"
            className={inputFieldClass}
            onChange={(event) =>
              setEventData({ ...eventData, title: event.target.value })
            }
          />{" "}
          <br />
          <input
            type="text"
            placeholder="Where is it at?"
            className={inputFieldClass}
            onChange={(event) => {
              setEventData({ ...eventData, location: event.target.value });
            }}
          />{" "}
          <br />
          {/* <input type="text" placeholder="When?" className={inputFieldClass} onChange={(event) => {
						setEventData({...eventData, date: event.target.value})
					}}/> <br /> 
          <DatePicker
            placeholderText="What day?"
            selected={eventData.date}
            className={inputFieldClass}
            onChange={(date) => {
              setEventData({ ...eventData, date: date });
            }}
          />
          <br />
          <input
            type="time"
            placeholder="What time?"
            value={eventData.time}
            className={inputFieldClass}
            onChange={(event) => {
              setEventData({ ...eventData, time: event.target.value });
            }}
          />{" "}
          <br />
          <textarea
            placeholder="Optional event description. What's going down?"
            className="rounded-lg bg-gray-100 p-2 pl-5 mt-10 mb-2 w-full"
            onChange={(event) => {
              setEventData({ ...eventData, description: event.target.value });
            }}
          ></textarea>{" "}
          <br />
          <input type="file" onChange={handleImageChange} accept="image/png, image/gif, image/jpeg image/jpg" />
          <br />
          <button
            className="bg-black text-white rounded-full p-2 px-5 mt-10"
            onClick={handleEventSubmission}
          >
            Create Event
          </button>*/}
        </>
      ) : (
        <p>
          {error ? "Error creating event." : "Event created successfully!"}{" "}
          <br />
          <button
            className="bg-black text-white rounded-full p-2 px-5 mt-10"
            onClick={() => {
              setSubmitted(false);
              setError(false);
            }}
          >
            Create Another Event
          </button>
        </p>
      )}
    </div>
  );
}
