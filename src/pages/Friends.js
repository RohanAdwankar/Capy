import React, { useState, useEffect } from "react";
import FriendList from "../components/FriendsList";

export default function Friends() {
	const [type, setType] = useState('my');
	const [filter, setFilter] = useState('');

	const friends = [
		{ id: 1, name: 'Eggert', profilePic: 'Egg.jpg', note: '' },
		{ id: 2, name: 'Smallberg', profilePic: 'Smallberg.jpg', note: '' },
		{ id: 3, name: 'Bjorn', profilePic: 'Bjorn.jpg', note: '' },
		{ id: 4, name: 'Alex', profilePic: 'Alex.jpg', note: '' },
		{ id: 5, name: 'Sara', profilePic: 'Sara.jpg', note: '' },
		{ id: 6, name: 'John', profilePic: 'John.jpg', note: '' },
		{ id: 7, name: 'Emily', profilePic: 'Emily.jpg', note: '' },
		{ id: 8, name: 'Michael', profilePic: 'Michael.jpg', note: '' },
		{ id: 9, name: 'Jessica', profilePic: 'Jessica.jpg', note: '' },
		{ id: 10, name: 'Katie', profilePic: 'Katie.jpg', note: '' },
		{ id: 11, name: 'Benjamin', profilePic: 'Benjamin.jpg', note: '' },
		{ id: 12, name: 'Sophia', profilePic: 'Sophia.jpg', note: '' },
		{ id: 13, name: 'William', profilePic: 'William.jpg', note: '' },
		{ id: 14, name: 'Olivia', profilePic: 'Olivia.jpg', note: '' },
		{ id: 15, name: 'James', profilePic: 'James.jpg', note: '' },
		{ id: 16, name: 'Emma', profilePic: 'Emma.jpg', note: '' },
		{ id: 17, name: 'Alexander', profilePic: 'Alexander.jpg', note: '' },
		{ id: 18, name: 'Ava', profilePic: 'Ava.jpg', note: '' },
		{ id: 19, name: 'Michael', profilePic: 'Michael.jpg', note: '' },
		{ id: 20, name: 'Isabella', profilePic: 'Isabella.jpg', note: '' },
		{ id: 21, name: 'Daniel', profilePic: 'Daniel.jpg', note: '' },
		{ id: 22, name: 'Mia', profilePic: 'Mia.jpg', note: '' },
		{ id: 23, name: 'Matthew', profilePic: 'Matthew.jpg', note: '' },
		{ id: 24, name: 'Charlotte', profilePic: 'Charlotte.jpg', note: '' },
		{ id: 25, name: 'Joseph', profilePic: 'Joseph.jpg', note: '' },
		{ id: 26, name: 'Amelia', profilePic: 'Amelia.jpg', note: '' },
		{ id: 27, name: 'David', profilePic: 'David.jpg', note: '' },
		{ id: 28, name: 'Sophie', profilePic: 'Sophie.jpg', note: '' },
		{ id: 29, name: 'Andrew', profilePic: 'Andrew.jpg', note: '' },
		{ id: 30, name: 'Emily', profilePic: 'Emily.jpg', note: '' },
		{ id: 31, name: 'Benjamin', profilePic: 'Benjamin.jpg', note: '' },
		{ id: 32, name: 'Olivia', profilePic: 'Olivia.jpg', note: '' },
		{ id: 33, name: 'Jacob', profilePic: 'Jacob.jpg', note: '' },
		{ id: 34, name: 'Ava', profilePic: 'Ava.jpg', note: '' },
		{ id: 35, name: 'William', profilePic: 'William.jpg', note: '' },
		{ id: 36, name: 'Sophia', profilePic: 'Sophia.jpg', note: '' },
		{ id: 37, name: 'James', profilePic: 'James.jpg', note: '' },
		{ id: 38, name: 'Emma', profilePic: 'Emma.jpg', note: '' },
		{ id: 39, name: 'Alexander', profilePic: 'Alexander.jpg', note: '' },
		{ id: 40, name: 'Isabella', profilePic: 'Isabella.jpg', note: '' }
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

	useEffect(() => {
		// Fetch the friends list
	}, [type]);

	return (
		<div className="block my-5">
			<div className="flex justify-center mb-5">
				<div className="mr-20">
					<select className="rounded bg-gray-100 p-2 pl-5 mb-2 w-full h-full" onChange={(e)=>{setType(e.target.value)}}>
						<option value="your">My Friends</option>
						<option value="for new">Find New Friends</option>
					</select>
				</div>
				<div className="flex">
					<input type="text" placeholder={`Search ${type} friends`} className="rounded bg-gray-100 p-2 pl-5 mb-2 w-full h-full"
						onChange={(e) => {setFilter(e.target.value)}}
					/>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
						Search
					</button>
				</div>
			</div>

			<FriendList friends={friendsFiltered}/>
		</div>
	);
}
