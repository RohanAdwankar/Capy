import React, { useState, useEffect } from "react";
import FriendList from "../components/FriendsList";
import { store } from "../Main.js";
import axios from "axios";

export default function Friends() {

	const [isSignedIn, setSignedIn] = store.useState("signedIn", {default: false});


    const [filter, setFilter] = useState('');
	const [newFriendUsername, setNewFriendUsername] = useState('');
    const [newFriendOpen, setNewFriendOpen] = useState(false);
    const [friends, setFriends] = useState([]);

	useEffect(() => {
		const fetchFriends = async () => {
			try {
				const response = await axios.get('/api/getFriends');
				setFriends(response.data.friends);
			} catch (error) {
				console.error('Error fetching friends:', error);
			}
		};
	
		fetchFriends();
	}, [friends]);

	const handleAddFriend = async () => {
        try {
            const response = await axios.post('/api/addFriend', { friendUsername: newFriendUsername });
            console.log(response.data);

            const addedFriend = response.data.friend;
            setFriends([...friends, addedFriend]);
            setNewFriendUsername('');
            setNewFriendOpen(false);
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    // Filter friends based on the search filter
	const friendsFiltered = friends.filter((friend) => {
		let name = friend.name ? friend.name.toLowerCase() : '';
		return name.includes(filter.toLowerCase());
	});

    return (

		<div>
			{isSignedIn ? (

				<div className="min-w-max m-4">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3" onClick={() => { setNewFriendOpen(!newFriendOpen) }}>
					Add New Friend
				</button>
				{newFriendOpen && (
					<div className="mb-5">
						<input type="text"
							placeholder="Username"
							className="rounded bg-gray-100 p-2 pl-5 mb-2 w-full"
							value={newFriendUsername} onChange={(e) => setNewFriendUsername(e.target.value)} />
						<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-3 w-full"
							onClick={handleAddFriend}>
							Add Friend
						</button>
					</div>
				)}
				<div className="flex">
					<input type="text" placeholder="Search your friends" className="rounded bg-gray-100 p-2 pl-5 mb-2 w-full h-full"
						onChange={(e) => { setFilter(e.target.value) }}
					/>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 h-full">
						Search
					</button>
				</div>

				{(friends.length > 0) ? (
					(friendsFiltered.length > 0) ? (

						<FriendList friends={friendsFiltered} />
						
					) : (
						<p>No friends found.</p>
					)
				) : (
					<p>Click "Add New Friend" to get more friends.</p>
				)}
				</div>





			) : (

				<div>
				<div className="flex items-center my-5">
					<p>Please Sign In</p>
				</div>
			
				</div>


			)}



		</div>
    );
}