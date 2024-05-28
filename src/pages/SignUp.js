import React, { useState } from "react";
import "./SignIn.css";

export default function SignUp() {

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState("");


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
				throw new Error('Failed to create user');
			}
			return response.text();

		})
		.then(responseText => {
			console.log(responseText);
			setSuccessMessage("Account created successfully!");

		})
		.catch(error => {
			console.error('Error creating user:', error);
		});

	};

	return (
		<div className="">

            <div>
				{successMessage && <p>{successMessage}</p>}
            </div>
			<br />
			<input type="text"
				placeholder="Username"
				className="rounded-full bg-gray-100 p-2 pl-5 mb-2"
				value={username}
				onChange={handleUsernameChange}
			/> <br />
            <input type="text"
				placeholder="Email"
				className="rounded-full bg-gray-100 p-2 pl-5 mb-2"
				value={email}
				onChange={handleEmailChange}
			/>
            <input type="text"
				placeholder="Re-enter Email"
				className="rounded-full bg-gray-100 p-2 pl-5 mb-2"
				value={confirmEmail}
				onChange={handleConfirmEmailChange}
			/> <br />
			<input type="password"
				placeholder="Password"
				className="rounded-full bg-gray-100 p-2 pl-5 mb-2"
				value={password}
				onChange={handlePasswordChange}
			/>
            <input type="password"
				placeholder="Re-enter Password"
				className="rounded-full bg-gray-100 p-2 pl-5 mb-2"
				value={confirmPassword}
				onChange={handleConfirmPasswordChange}
			/> <br />

			<br />
			<button className="Sign-Up-Button" onClick={handleSubmit}>Sign Up</button>
		</div>
	);
}
