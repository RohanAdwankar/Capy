import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendList = ({ friends, setFriends, onRemoveFriend, filter }) => {
  // const [friendDetails, setFriendDetails] = useState([]);
  const [hoveredFriend, setHoveredFriend] = useState(null);

  // useEffect(() => {
  //   setFriendDetails(friends);
  // }, [friends]);

    // Filter friends based on the search filter
    const friendsFiltered = friends.filter((friend) => {
      let name = friend.username ? friend.username.toLowerCase() : '';
      return name.includes(filter.toLowerCase());
    });

  const handleRemoveFriend = async (friendUsername) => {
    try {
      // Make a POST request to remove the friend
      await axios.post('/api/removeFriend', { friendUsername, withCredentials: true });
      
      // Update friendDetails by filtering out the removed friend
      setFriends(friends.filter(friend => friend.username !== friendUsername));
      
      // If there is an onRemoveFriend function passed as prop, call it to update parent state
      if (onRemoveFriend) {
        onRemoveFriend(friendUsername);
      }
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {friendsFiltered.map((friend) => (
        <div
          key={friend.username}
          className="bg-white shadow-lg rounded-lg p-4 m-3 cursor-pointer hover:bg-gray-100"
          onMouseEnter={() => setHoveredFriend(friend.username)} 
          onMouseLeave={() => setHoveredFriend(null)} 
        >
          <img
            src={`data:image/jpeg;base64,${friend.profilePicture}`}
            alt={friend.username}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold mt-2 text-center">{friend.username}</h3>
          {hoveredFriend === friend.username && ( // Show button only when friend is hovered
            <button onClick={() => handleRemoveFriend(friend.username)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 w-full">
              Remove Friend
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FriendList;