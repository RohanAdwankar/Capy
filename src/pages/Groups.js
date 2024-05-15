import React, { useState } from "react";

export default function Groups({ title }) {
	return (
		<div className="place-content-center">
			<h1 className="text-2xl font-bold mb-5">{title}</h1>

			<div className="flex items-center my-5">
				<p>Join a group to see their events here.</p>
			</div>
		</div>
	);
}
