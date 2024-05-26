import React, { useState } from 'react';

const FriendList = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'Eggert', profilePic: 'Egg.jpg', note: '' },
    { id: 2, name: 'Smallberg', profilePic: 'Smallberg.jpg', note: '' },
    { id: 3, name: 'IU', profilePic: 'IU.jpg', note: '' },
    { id: 3, name: 'IU', profilePic: 'IU.jpg', note: '' },
    { id: 3, name: 'IU', profilePic: 'IU.jpg', note: '' },
    { id: 3, name: 'IU', profilePic: 'IU.jpg', note: '' },
    { id: 3, name: 'IU', profilePic: 'IU.jpg', note: '' },
    { id: 3, name: 'IU', profilePic: 'IU.jpg', note: '' },
    { id: 3, name: 'IU', profilePic: 'IU.jpg', note: '' },
    { id: 3, name: 'test', profilePic: 'IU.jpg', note: '' },

  ]);

  const handleNoteChange = (friendId, note) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === friendId ? { ...friend, note } : friend
      )
    );
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-screen">
      {friends.map((friend) => (
        <div key={friend.id} className="bg-white shadow-lg rounded-lg p-4">
          <img
            src={friend.profilePic}
            alt={friend.name}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold mt-2 text-center">{friend.name}</h3>
          <input
            type="text"
            value={friend.note}
            onChange={(e) => handleNoteChange(friend.id, e.target.value)}
            placeholder="Write a note..."
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
      ))}
    </div>
  );
};



export default FriendList;