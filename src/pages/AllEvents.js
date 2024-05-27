import React, { useState } from "react";
import Event from "./Event";

export default function AllEvents() {
	return (
		<div className="flex justify-center items-center h-full">
			<div className="flex items-center my-5">
			</div>
			<Event/>
			<Event/>
			<Event/>
		</div>
	);
}
