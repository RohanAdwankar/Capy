import React, { useState } from "react";

export default function MyEvents({ title }) {
	return (
		<div className="">
			<h1 className="text-2xl font-bold mb-5 justify-self-center">{title}</h1>

			<div className="flex items-center my-5">
				<p>Create an event or click "Pull Up" to an event to see it show up here.</p>
			</div>
		</div>
	);
}
