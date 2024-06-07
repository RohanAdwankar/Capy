import React, { useState } from "react";
import "./SignIn.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { store } from "../Main.js";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import logo from '../assets/coda.png';

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [isSignedIn, setSignedIn] = store.useState("signedIn", {
    default: false,
  });
  const [signedInUsername, setSignedInUsername] = store.useState(
    "signedInUsername",
    { default: "" }
  );

  const location = useLocation();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        return response.text();
      })
      .then((responseText) => {
        console.log(responseText);
        setSignedIn(true);
        setSignedInUsername(userData.username);
        console.log("USERNAME JOHNNY IS NOW:", signedInUsername);
        navigate("/my");
      })
      .catch((error) => {
        console.error("Invalid password or username", error);
        alert("Invalid password or username");
      });
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full min-w-[60%] overflow-hidden rounded-lg">
      <div className="bg-white rounded-lg shadow-lg flex w-full h-full transform translate-y-20">
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

            <div className="Password-Input">
              <input
                type={type}
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
              />
              <span className="Icon-Container" onClick={handleToggle}>
                <Icon class="absolute mr-10" icon={icon} size={25} />
              </span>
            </div>
						
						<button
							type="submit"
							className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
							onClick={handleSubmit}
						>
							Sign In
						</button>

            <button
              type="button"
              variant="contained"
              onClick={() => {
                navigate("/signup");
              }}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Sign Up Here
            </button>

					</form>
				</div>
			</div>
		</div>

  );
}
