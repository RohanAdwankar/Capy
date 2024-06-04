import React, { useState, useEffect } from "react";
import FriendList from "../components/FriendsList";
import { store } from "../Main.js";
import Loading from "../components/Loading"
import axios from "axios";
import { set } from "mongoose";

export default function Friends() {

	const [isSignedIn, setSignedIn] = store.useState("signedIn", {default: false});

	const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState('');
	const [newFriendUsername, setNewFriendUsername] = useState('');
    const [newFriendOpen, setNewFriendOpen] = useState(false);
    const [friends, setFriends] = useState([]);
	const [status, setStatus] = useState('Loading...');

	useEffect(() => {
		const fetchFriends = async () => {
			try {
				const response = await axios.get('/api/getFriends', { withCredentials: true });
				setFriends(response.data.friends);
				setStatus('');
				setLoading(false);
			} catch (error) {
				console.error('Error fetching friends:', error);
				setStatus('Error fetching friends');
				setLoading(false);
			}
		};
	
		fetchFriends();
	}, []);

	const handleAddFriend = async () => {
        try {
			setStatus('Adding ' + newFriendUsername + ' as a friend...');
            const response = await axios.post('/api/addFriend', { friendUsername: newFriendUsername, withCredentials: true });
            console.log(response.data);

            const addedFriend = response.data.friend;
            setFriends([...friends, addedFriend]);
            setNewFriendUsername('');
            setNewFriendOpen(false);
			setStatus(newFriendUsername + ' added successfully');
        } catch (error) {
            // console.error('Error adding friend:', error);
			console.log(error);
			if (error.response && error.response.status === 404) {
				setStatus(`User ${newFriendUsername} not found`);
			} else if (error.response && error.response.status === 400) {
				setStatus(`${newFriendUsername} is already your friend`);
			} else if (error.response && error.response.status === 401) {
				setStatus("Bruh you're literally " + newFriendUsername + " wtf are you really that lonely");
			} else {
				setStatus('Error adding friend');
			}
        }
    };

	const handleRemoveFriend = async (friendUsername) => {
		try {
			setStatus('Removing ' + friendUsername + ' from friends...')
		  	// Make a POST request to remove the friend
		  	const response = await axios.post('/api/removeFriend', { friendUsername: friendUsername, withCredentials: true });
		 	// console.log(response.data);
		  
		 	// Update friendDetails by filtering out the removed friend
			setFriends(friends.filter(friend => friend.username !== friendUsername));
			setStatus(friendUsername + ' removed successfully');
		} catch (error) {
			console.log(error);
			if (error.response && error.response.status === 404) {
				setStatus(`${friendUsername} is not your friend`);
			} else {
				setStatus('Error removing friend');
			}
		}
	  };

    // // Filter friends based on the search filter
	// const friendsFiltered = friends.filter((friend) => {
	// 	let name = friend.name ? friend.name.toLowerCase() : '';
	// 	return name.includes(filter.toLowerCase());
	// });


	if (loading) return <Loading />;

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

				{(status !== '') && <p>{status}</p>}

				{(friends.length > 0) ? (
					<FriendList friends={friends} setFriends={setFriends} filter={filter} onRemoveFriend={handleRemoveFriend} />
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