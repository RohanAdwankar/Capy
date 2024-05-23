import React, { useState } from "react";
import profile from '../assets/coda.png'
import PfpUpload from "./PfpUpload";
import { store } from "../Main.js";




export default function Profile({ title }) {

	const [isSignedIn, setSignedIn] = store.useState("signedIn", {default: false});

	return (
		<div>
		{isSignedIn ? (
			<div>
				<div className="place-content-center">
					<h1 className="text-2xl font-bold mb-5">{title}</h1>

					<div className="flex items-center my-5">
						<img src={profile} alt="Profile" className="w-24 h-auto m-5 rounded-full"/>
						<div>
							<h1 className="text-xl font-bold">Ur Mom</h1>
							<PfpUpload/>
						</div>
					</div>
				</div>
			</div>
		) : (
			<div>
				<h1 className="text-2xl font-bold mb-5">{title}</h1>
				<div className="flex items-center my-5">
					<p>Please Sign In</p>
				</div>
			
			</div>

		)}
		</div>

	);
}
