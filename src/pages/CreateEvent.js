import React, { useState } from "react";

export default function CreateEvent() {
	return (
		<div className="flex items-center my-5">
			<div>
				<input type="text" placeholder="Event Title" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/> <br />
				<input type="text" placeholder="Event Location" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/> <br />
				<input type="text" placeholder="Joe mama london" className="rounded-full bg-gray-100 p-2 pl-5 mb-2" /> <br />
				<button className="bg-black text-white rounded-full p-2 px-5 mt-10">Create Event</button>
			</div>
		</div>
	);
}
