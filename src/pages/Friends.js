import React, { useState, useEffect } from "react";
import FriendList from "../components/FriendsList";

export default function Friends() {
	const [filter, setFilter] = useState('');
	const [newFriendOpen, setNewFriendOpen] = useState(false);

	const friends = [
		{ id: 1, name: 'Eggert', profilePic: 'Egg.jpg', note: '' },
		{ id: 2, name: 'Smallberg', profilePic: 'Smallberg.jpg', note: '' },
		{ id: 3, name: 'Bjorn', profilePic: 'Bjorn.jpg', note: '' },
		{ id: 4, name: 'Alex', profilePic: 'Alex.jpg', note: '' },
		{ id: 5, name: 'Sara', profilePic: 'Sara.jpg', note: '' },
		// { id: 6, name: 'John', profilePic: 'John.jpg', note: '' },
		// { id: 7, name: 'Emily', profilePic: 'Emily.jpg', note: '' },
		// { id: 8, name: 'Michael', profilePic: 'Michael.jpg', note: '' },
		// { id: 9, name: 'Jessica', profilePic: 'Jessica.jpg', note: '' },
		// { id: 10, name: 'Katie', profilePic: 'Katie.jpg', note: '' },
		// { id: 11, name: 'Benjamin', profilePic: 'Benjamin.jpg', note: '' },
		// { id: 12, name: 'Sophia', profilePic: 'Sophia.jpg', note: '' },
		// { id: 13, name: 'William', profilePic: 'William.jpg', note: '' },
		// { id: 14, name: 'Olivia', profilePic: 'Olivia.jpg', note: '' },
		// { id: 15, name: 'James', profilePic: 'James.jpg', note: '' },
	];

	const [friendsFiltered, setFriendsFiltered] = useState(friends);

	useEffect(() => {
		console.log(filter);
		setFriendsFiltered(friends.filter((friend) => {
			let name = friend.name.toLowerCase();
			return name.includes(filter.toLowerCase());
		}));
		console.log(friendsFiltered)
	}, [filter])

	return (
		<div className="min-w-max m-4">
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3" onClick={()=>{setNewFriendOpen(!newFriendOpen)}}>
				Add New Friend
			</button>
			{newFriendOpen && (
				<div class="mb-5">
					<input type="text" placeholder="Username" className="rounded bg-gray-100 p-2 pl-5 mb-2 w-full"/>
					<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-3 w-full">
						Add Friend
					</button>
				</div>
			)}
			<div className="flex">
				<input type="text" placeholder="Search your friends" className="rounded bg-gray-100 p-2 pl-5 mb-2 w-full h-full"
					onChange={(e) => {setFilter(e.target.value)}}
				/>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 h-full">
					Search
				</button>
			</div>

			{(friends.length > 0) ? (
				(friendsFiltered.length > 0) ? (
					<FriendList friends={friendsFiltered}/>
				) : (
					<p>No friends found.</p>
				)
			) : (
				<p>You have no friends.</p>
			)}
		</div>
	);
}
