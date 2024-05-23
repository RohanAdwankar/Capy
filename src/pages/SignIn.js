import React, { useState } from "react";
import "./SignIn.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { store } from "../Main.js";


export default function SignIn() {


	const [isSignedIn, setSignedIn] = store.useState("signedIn", {default: false});

	const location = useLocation();
	const navigate = useNavigate();
	return (
		<div className="">

            <div>
                                       
            </div>
			<br />
			<input type="text" placeholder="Username" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/> <br />
			<input type="text" placeholder="Password" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/>
			<br />
			<input type="checkbox" className="Remember-Me"></input>
			Remember me?
			<br />
			<button
				onClick={() => {

					setSignedIn(true);
					navigate("/");

				}}

			
			className="Sign-In-Button">Sign in</button>
			<br />
			<br />
			<div>
			New here?
			</div>
			<button type="button" variant="contained"
                
                onClick={() => {
                  navigate("/signup");
                }}
                className="Sign-Up-Button">Sign Up Here</button>
			
		</div>
	);
}
