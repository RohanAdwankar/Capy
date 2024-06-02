import React, { useState } from 'react';

const FriendList = ({ friends }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {friends.map((friend) => (
        <div key={friend.id} className="bg-white shadow-lg rounded-lg p-4 m-3 cursor-pointer hover:bg-gray-100">
          <img
            src={friend.profilePic}
            alt={friend.name}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold mt-2 text-center">{friend.name}</h3>
        </div>
      ))}
    </div>
  );
};



export default FriendList;