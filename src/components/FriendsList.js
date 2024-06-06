import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendList = ({ friends, setFriends, onRemoveFriend, filter }) => {
  const [hoveredFriend, setHoveredFriend] = useState(null);
  
  // Filter friends based on the search filter
  const friendsFiltered = friends.filter((friend) => {
    let name = friend.username ? friend.username.toLowerCase() : '';
    return name.includes(filter.toLowerCase());
  });

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
            <button onClick={() => onRemoveFriend(friend.username)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 w-full">
              Remove Friend
            </button>
        </div>
      ))}
    </div>
  );
};

export default FriendList;