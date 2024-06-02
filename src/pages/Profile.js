import React, { useState } from "react";
import profile from '../assets/coda.png'
import PfpUpload from "./PfpUpload";
import { store } from "../Main.js";
import { ProfilePicture } from "../Main.js";




export default function Profile() {

	const [isSignedIn, setSignedIn] = store.useState("signedIn", {default: false});

	return (
		<div>
		{isSignedIn ? (
			<div>
				<div className="place-content-center">

					<div className="flex items-center my-5">
						<ProfilePicture />
						<div>
							<PfpUpload/>
						</div>
					</div>
				</div>
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
