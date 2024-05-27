import React, { useState } from "react";
import FriendList from "../components/FriendsList";

export default function Friends() {
	return (
		<div className="place-content-center">

			<div className="flex items-center my-5">
			<h1 className="text-1xl"></h1>
			</div>
			<FriendList />

		</div>
	);
}
