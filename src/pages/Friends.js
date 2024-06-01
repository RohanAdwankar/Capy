import React, { useState, useEffect } from "react";
import FriendList from "../components/FriendsList";

export default function Friends() {
	const [type, setType] = useState('my');

	useEffect(() => {
		// Fetch the friends list
	}, [type]);

	return (
		<div className="block my-5">
			<div className="flex justify-center">
				<div className="mr-10">
					<select className="rounded-full bg-gray-100 p-2 pl-5 mb-2 w-full h-full" onChange={(e)=>{setType(e.target.value)}}>
						<option value="your">My Friends</option>
						<option value="for new">Find New Friends</option>
					</select>
				</div>
				<div className="flex">
					<input type="text" placeholder={`Search ${type} friends`} className="rounded-full bg-gray-100 p-2 pl-5 mb-2 w-full h-full"/>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2">
						Search
					</button>
				</div>
			</div>

			<FriendList />
		</div>
	);
}
