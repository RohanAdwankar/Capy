import React, { useState } from "react";
import FriendList from "../components/FriendsList";

export default function Friends() {
	return (
		<div className="flex justify-center items-center h-full m-4">
			<FriendList />
		</div>
	);
}
