import React, { useEffect, useState } from "react";
import "./Main.css";
import logo from "./assets/capy.png";
import capy_gif from "./assets/capy.gif";
import capybara from "./assets/capy.jpg";
import profile from "./assets/profile.jpg";
import Event from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Groups from "./pages/Groups";
import MyEvents from "./pages/MyEvents";
import AllEvents from "./pages/AllEvents";
import Loading from "./Loading";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import axios from 'axios';
import { createStore, useGlobalState } from 'state-pool';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";


const store = createStore({"signedIn" : false});

//Get Profile Username
const ProfileName = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
      fetch('/api/profile', {
          method: 'GET',
          credentials: 'include', 
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch username');
          }
          return response.json();
      })
      .then(data => {
          setUsername(data.username);
      })
      .catch(error => {
          console.error('Error fetching username:', error);
      });
  }, []); 

  return (
      <h1 className="Profile-name">{username}</h1>
  );
};



const ProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
      fetch('/api/profile', {
          method: 'GET',
          credentials: 'include', 
      })
      .then(response => {
          return response.json();
      })
      .then(data => {
          setProfilePicture(data.profilePicture);
      })
      .catch(error => {
          console.error('Error fetching Profile Picture:', error);
      });
  }, [store.useState("signedIn")]); 

  return (
    <div>
      <img className="Profile-Img" src={profilePicture ? 
        `data:image/jpeg;base64,${profilePicture}` :
        profile
      }/>
    </div>
  );
};



function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setSignedIn] = store.useState("signedIn", {default: false});
  const [isSidebarHovered, setSidebarHovered] = useState(false);

  useEffect(() => {
    setSignedIn(false);
  }, []);
  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const boldNavClass = (path) =>
    "text-left ml-5 my-1 " +
    (location.pathname === path ? "font-bold" : "font-light text-sky-400");
  const setPage = (path) => () => navigate(path);
  const [title, setTitle] = useState("All Events");

  const pages = {
    "/": { title: "All Events" },
    "/my": { title: "My Events" },
    "/groups": { title: "Groups" },
    "/friends": { title: "Friends" },
    "/profile": { title: "Profile" },
    "/about": {title: "About"}
  };

  useEffect(() => {
    if (pages[location.pathname]) {
      setTitle(pages[location.pathname].title);
    }
    if (location.pathname === "/create") {
      setTitle("Create Event");
    }
  }, [location.pathname])

  return (
    <div className="App">
      {isLoading ? (
        <center><Loading /></center>
      ) : (
        <div className="flex min-h-screen bg-gradient-to- from-orange-200 to-transparent">
          <div className="flex flex-col h-screen px-10 py-2 min-w-56 bg-gradient-to-t from-orange-100 to-transparent fixed"
            onMouseOver={() => {setSidebarHovered(true)}}
            onMouseOut={() => {setSidebarHovered(false)}}
          >
            <div className="flex items-center my-5 ">
              <img
                src={isSidebarHovered ? capy_gif : capybara}
                alt="Logo"
                className="w-12 h-auto mr-2"
              />
              <div>
                <h1 className="text-xl font-bold">Capy</h1>
                <p className="text-sm roboto-slab font-light text-black">
                  ok i pull up
                </p>
              </div>
            </div>

            {/* navigation */}
            {Object.keys(pages).map((path) => (
              <button
                key={path}
                onClick={() => {
                  setTitle(pages[path].title);
                  navigate(path);
                }}
                className={boldNavClass(path)}
              >
                {pages[path].title}
              </button>
            ))}

            {location.pathname !== "/create" ? (
              <button
                onClick={() => {
                  setTitle("Create Event");
                  navigate("/create");
                }}
                className="mt-auto px-4 py-2 bg-black text-white rounded-full mb-5"
              >
                New Event
              </button>
            ) : null}
          </div>

          {/* main content */}
          <main className="flex-grow overflow-y-auto p-10 justify-self-center ml-56"> {/* Adjusted the margin-left */}
            <div className="flex justify-center roboto-slab font-bold text-2xl">
              {title}
            </div>
            <div className="flex justify-center">
              <Routes>
                <Route path="/" element={<AllEvents />} />
                <Route path="/my" element={<MyEvents />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create" element={<Event />} />
                <Route path="/signin" element={<SignIn />}  />
                <Route path="/signout" element={<SignOut/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </main>

          {/* floating top right section */}
          <div className="absolute top-0 right-0 flex items-center p-5">
            <div className="p-0 m-0">
              {isSignedIn ? (
                <div className="mr-3">
                  <h1 className="Profile-name"><ProfileName /></h1>
                  <button type="button" variant="contained"
                    onClick={() => {
                      navigate("/signout");
                      setTitle("Sign Out");
                      setSignedIn(false);
                    }}
                    className="font-light text-sky-400 text-right">
                    Sign Out
                  </button>
                </div>
              ) : (
                  <div className="mr-3">
                    <h1 className="Profile-name">Guest</h1>
                    <button type="button" variant="contained"
                      onClick={() => {
                        navigate("/signin");
                        setTitle("Sign In");
                      }}
                      className={'text-right ' + (location.pathname === '/signin' ? "font-bold" : "font-light text-sky-400")}>
                      Sign In
                    </button>
                  </div>
                )
              }
            </div>
            {/* <img src={profile} className="Profile-Img" alt="Profile" /> */}
            <ProfilePicture />
          </div>
        </div>
      )}
    </div>
  );
}

export { store };
export { ProfilePicture };
export default Main;
