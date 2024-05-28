import React, { useState } from "react";
import Event from "./Event";

export default function AllEvents() {
	return (
		<div className="flex justify-center items-center max-h-screen m-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-screen">
				<Event/>
				<Event/>
				<Event/>
				<Event/>
				<Event/>
				<Event/>
				<Event/>
			</div>
		</div>
	);
}
