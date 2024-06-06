import React, { useState } from "react";
import "./SignIn.css";
import { store } from "../Main.js";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/coda.png';


export default function SignUp() {

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [isValid, setIsValid] = useState(true);
	const [isSignedIn, setSignedIn] = store.useState("signedIn", {default: false});
	
	const navigate = useNavigate();


	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleConfirmEmailChange = (event) => {
		setConfirmEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleConfirmPasswordChange = (event) => {
		setConfirmPassword(event.target.value);
	};


	const handleSubmit = (event) => {
		
		event.preventDefault();

		const regex = /^[^\s@]+@(?:[a-z]+\.)?ucla\.edu$/;

		const isValidEmail = regex.test(email);
		setIsValid(isValidEmail);

		if (!isValid){
			alert("Invalid email address");
			return;
		}


		if (password !== confirmPassword){
			alert("Passwords do not match");
			return;
		}
		if (email !== confirmEmail){
			alert("Emails do not match");
			return;
		}


		const userData = {
			username: username,
			password: password,
			email: email
		};


		fetch('/api/createUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),


		})
		.then(response => {
			if (!response.ok) {
				return response.json();
			}
			return response.text();
			
		})
		.then(responseData => {
			if (typeof responseData === 'string') {
				setSignedIn(true);
				navigate("/profile");
				
			} else {
				alert(responseData.error);
			}
		})
		.catch(error => {
			console.error('Error creating user:', error);
			alert('Failed to create user. Please try again later.');
		});

	};

	return (
		<div className="flex items-center justify-center min-h-screen overflow-hidden">
            <div className="bg-white rounded-lg shadow-lg flex w-3/4 h-3/4 transform -translate-y-20">
				<div className="w-1/2">
					<img src={logo} alt="Sign In" className="object-cover h-full w-full rounded-l-lg" />
				</div>
				<div className="w-1/2 p-8">
					<h1 className="text-4xl font-bold mb-6 text-center">Welcome to Capy!</h1>
					<form className="space-y-4">
						<input
							type="text"
							placeholder="Username"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={username}
							onChange={handleUsernameChange}
						/>
						<input
							type="email"
							placeholder="UCLA-Affiliated Email"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={email}
							onChange={handleEmailChange}
						/>
						<input
							type="email"
							placeholder="Retype Email Address"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={confirmEmail}
							onChange={handleConfirmEmailChange}
						/>
						<input
							type="password"
							placeholder="Password"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={password}
							onChange={handlePasswordChange}
						/>
						<input
							type="password"
							placeholder="Retype Password"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={confirmPassword}
							onChange={handleConfirmPasswordChange}
						/>
						<button
							type="submit"
							className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
							onClick={handleSubmit}
						>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>

	
			//	{successMessage && <p>{successMessage}</p>}
	);
}
