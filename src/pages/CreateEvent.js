import React, { useState } from "react";
import axios from "axios";

export default function CreateEvent() {
	const [eventData, setEventData] = useState({
		user: "",
		title: "",
		location: "",
		date: "",
		description: "",
	});

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	async function handleEventSubmission() {
		console.log(eventData)
		await axios.post("/api/createEvent", eventData, {
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			console.log(res);
			setSubmitted(true);
		}).catch((error) => {
			console.error('Error:', error);
			setError(true);
		});
	}

	const inputFieldClass = "rounded-full bg-gray-100 p-2 pl-5 mb-2"

	return (
		<div className="mt-5">
			{!submitted ? (
				<>
					<input type="text" placeholder="What you doing?" className={inputFieldClass} onChange={(event)=> 
						setEventData({...eventData, title: event.target.value})
					}/> <br />
					<input type="text" placeholder="Where it at?" className={inputFieldClass} onChange={(event) => {
						setEventData({...eventData, location: event.target.value})
					}}/> <br />
					<input type="text" placeholder="When?" className={inputFieldClass} onChange={(event) => {
						setEventData({...eventData, date: event.target.value})
					}}/> <br />

					<button className="bg-black text-white rounded-full p-2 px-5 mt-10" onClick={handleEventSubmission}>Create Event</button>
				</>
			) : (
				<p>
					{error ? "Error creating event." : "Event created successfully!"} <br />
					<button className="bg-black text-white rounded-full p-2 px-5 mt-10" onClick={
						() => {
							setSubmitted(false);
							setError(false);
						}
					}>Create Another Event</button>
				</p>
			)}
		</div>
	);
}
