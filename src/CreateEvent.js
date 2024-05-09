import React, { useState } from "react";

export default function CreateEvent() {
	return (
		<div className="place-content-center">
			<h1 className="text-2xl font-bold mb-5">Create a New Event</h1>

			<input type="text" placeholder="Event Title" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/> <br />
			<input type="text" placeholder="Event Location" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/> <br />
			<input type="text" placeholder="Blahdy blah blah" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/> <br />

			<button className="bg-black text-white rounded-full p-2 px-5 mt-10">Create Event</button>
			

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
