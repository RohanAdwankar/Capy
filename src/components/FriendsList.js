import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendList = ({ friends }) => {
  const [friendDetails, setFriendDetails] = useState([]);

  useEffect(() => {
    const fetchFriendDetails = async () => {
      try {
        const friendDetailsPromises = friends.map(async (friend) => {
          const response = await axios.get(`/api/getUserProfile?username=${friend.username}`);
          return response.data;
        });
        const friendDetailsData = await Promise.all(friendDetailsPromises);
        setFriendDetails(friendDetailsData);
      } catch (error) {
        console.error('Error fetching friend details:', error);
      }
    };

    fetchFriendDetails();
  }, [friends]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {friendDetails.map((friend) => (
        <div key={friend.username} className="bg-white shadow-lg rounded-lg p-4 m-3 cursor-pointer hover:bg-gray-100">
          <img
            src={`data:image/jpeg;base64,${friend.profilePicture}`}
            alt={friend.username}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold mt-2 text-center">{friend.username}</h3>
        </div>
      ))}
    </div>
  );
};

export default FriendList;