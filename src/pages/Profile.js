import React, { useState } from "react";
import profile from '../assets/coda.png'

export default function Profile({ title }) {
	return (
		<div className="place-content-center">
			<h1 className="text-2xl font-bold mb-5">{title}</h1>

			<div className="flex items-center my-5">
				<img src={profile} alt="Profile" className="w-24 h-auto m-5 rounded-full"/>
				<div>
					<h1 className="text-xl font-bold">Ur Mom</h1>
					<button className="text-blue-400">Change profile picture</button>
				</div>
			</div>


            <p>

            </p>
		</div>
	);
}
