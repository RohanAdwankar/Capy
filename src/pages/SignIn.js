import React, { useState } from "react";
import "./SignIn.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { store } from "../Main.js";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'







export default function SignIn() {
	const [password, setPassword] = useState("");
	const [type, setType] = useState('password');
	const [icon, setIcon] = useState(eyeOff);

	const handleToggle = () => {
		if (type==='password'){
		   setIcon(eye);
		   setType('text')
		} else {
		   setIcon(eyeOff)
		   setType('password')
		}
	 }


	const [isSignedIn, setSignedIn] = store.useState("signedIn", {default: false});

	const location = useLocation();
	const navigate = useNavigate();
	return (
		<div className="">

            <div>
                                       
            </div>
			<br />
			<input type="text" placeholder="Username" className="rounded-full bg-gray-100 p-2 pl-5 mb-2"/> <br />
			<div className="Password-Input">
				<input 
					type={type}
					name="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="current-password"
					className="rounded-full bg-gray-100 p-2 pl-5 mb-2"
				/>
				<span className="Icon-Container" onClick={handleToggle}>
					<Icon class="absolute mr-10" icon={icon} size={25}/>
				</span>
			</div>

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
