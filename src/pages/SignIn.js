import React, { useState } from "react";
import "./SignIn.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { store } from "../Main.js";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

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
    <div className="">
      <div></div>
      <br />
      <input
        type="text"
        placeholder="Username"
        className="rounded-full bg-gray-100 p-2 pl-5 mb-2"
        value={username}
        onChange={handleUsernameChange}
      />{" "}
      <br />
      <div className="Password-Input">
        <input
          type={type}
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="current-password"
          className="rounded-full bg-gray-100 p-2 pl-5 mb-2"
        />
        <span className="Icon-Container" onClick={handleToggle}>
          <Icon class="absolute mr-10" icon={icon} size={25} />
        </span>
      </div>
      <br />
      <button onClick={handleSubmit} className="Sign-In-Button">
        Sign in
      </button>
      <br />
      <br />
      <div>New here?</div>
      <button
        type="button"
        variant="contained"
        onClick={() => {
          navigate("/signup");
        }}
        className="Sign-Up-Button"
      >
        Sign Up Here
      </button>
    </div>
  );
}
