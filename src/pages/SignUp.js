import React, { useState } from "react";
import "./SignIn.css";

export default function SignUp() {
	return (
		<div className="">

            <div>
                                       
            </div>
			<br />
			<input type="text" placeholder="Username" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/> <br />
            <input type="text" placeholder="Email" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/>
            <input type="text" placeholder="Re-enter Email" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/> <br />

			
			<input type="password" placeholder="Password" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/>
            <input type="password" placeholder="Re-enter Password" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/> <br />

			<br />
			<button className="Sign-Up-Button">Sign Up</button>
		</div>
	);
}
