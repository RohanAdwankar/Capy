import React, { useState } from "react";
import axios from "axios";

export default function CreateEvent() {
	const [eventData, setEventData] = useState({
		title: "",
		time: "",
		location: "",
		description: "",
	});

	function handleEventSubmission() {
		axios.get("/api/createEvent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(eventData),
		}).then((res) => {
			console.log(res);
		});
	}

	return (
		<div className="">
			<h1 className="text-2xl font-bold mb-5">Create a New Event</h1>

			<input type="text" placeholder="Event Title" className="rounded-full bg-gray-100 p-2 pl-5 mb-2" onChange={(event)=> 
				setEventData({...eventData, title: event.target.value})
			}/> <br />
			<input type="text" placeholder="Event Location" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/> <br />
			<input type="text" placeholder="Joe mama london" className="rounded-full bg-gray-100 p-2 pl-5 mb-2" /> <br />

			<button className="bg-black text-white rounded-full p-2 px-5 mt-10" onClick={handleEventSubmission}>Create Event</button>
			

			{/* <div className="Main-body bg-slate-400 w-full h-96 content-center">
				<div>
					{"INPUT TITLE:"}
					<input type="text" />
				</div>
				<div>
					{"INPUT TIME"}
					<input type="text" />
				</div>
				<div>
					{"INPUT LOCATION"}
					<input type="text" />
				</div>
				<div>
					{"INPUT DESCRIPTION"}
					<input type="text" />
				</div>
				<div> {"WORDS WORDS WORDS WORDS"}</div>
			</div> */}
		</div>
	);
}
