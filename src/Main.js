import React, { useEffect, useState } from "react";
import "./Main.css";
import logo from "./assets/capy.png";
import profile from "./assets/coda.png";
import Event from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Groups from "./pages/Groups";
import MyEvents from "./pages/MyEvents";
import AllEvents from "./pages/AllEvents";
import Loading from "./Loading";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const boldNavClass = (path) =>
    "text-left ml-5 my-1 " +
    (location.pathname === path ? "font-bold" : "font-light text-sky-400");
  const setPage = (path) => () => navigate(path);
  const [title, setTitle] = useState("INSERT TITLE HERE");

  return (
    <div className="App">
      {isLoading ? (
        <Loading />
      ) : (
      <div className="flex min-h-screen bg-gradient-to- from-orange-200 to-transparent">
      <div className="flex flex-col h-screen px-10 py-2 min-w-56 bg-gradient-to-t from-orange-100 to-transparent">
        <div className="flex items-center my-5 ">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-auto mr-2 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">Capy</h1>
            <p className="text-sm text-gray-500 roboto-slab font-light text-black">
              ok i pull up
            </p>
          </div>
        </div>

        {/* navigation */}
        <button
          onClick={() => {
            navigate("/");
            setTitle("All Events");
          }}
          className={boldNavClass("/")}
        >
          All Events
        </button>
        <button
          onClick={() => {
            navigate("/my");
            setTitle("My Events");
          }}
          className={boldNavClass("/my")}
        >
          My Events
        </button>
        <button
          onClick={() => {
            navigate("/groups");
            setTitle("Groups");
          }}
          className={boldNavClass("/groups")}
        >
          Groups
        </button>
        <button
          onClick={() => {
            navigate("/friends");
            setTitle("Friends");
          }}
          className={boldNavClass("/friends")}
        >
          Friends
        </button>
        <button
          onClick={() => {
            navigate("/profile");
            setTitle("Profile");
          }}
          className={boldNavClass("/profile")}
        >
          Profile
        </button>

        {location.pathname !== "/create" ? (
          <button
            onClick={setPage("/create")}
            className="mt-auto px-4 py-2 bg-black text-white rounded-full mb-5"
          >
            New Event
          </button>
        ) : null}
      </div>

      {/* main content */}
      <main className="flex-grow overflow-y-auto p-10 justify-self-center">
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
          </Routes>
        </div>
      </main>

      {/* floating top right section */}
      <div className="fixed top-0 right-0 flex items-center p-5">
        <div className="p-0 m-0">
          <h1 className="Profile-name">Ur Mom</h1>
          <button type="button" className="Sign-Out" variant="contained">
            Sign Out
          </button>
        </div>
        <img src={profile} className="Profile-Img" alt="Profile" />
      </div>
    </div>


      )}

    </div>
  );
}

export default Main;
