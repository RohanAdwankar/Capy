import React, { useState } from "react";

export default function MyEvents({ title }) {
	return (
		<div className="flex justify-center items-center h-full">
			<h1 className="text-2xl font-bold mb-5 pr-8">{ title}</h1>
		</div>
	);
}
