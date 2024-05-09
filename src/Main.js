import React, { useEffect, useState } from 'react'
import './Main.css';
import logo from './assets/capy.png'
import profile from './assets/coda.png'
import Event from "./CreateEvent";
import Profile from './Profile';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

function Main() {
	const location = useLocation();
	const navigate = useNavigate();
	const boldNavClass = (path) => ("text-left ml-5 my-1 " + ((location.pathname === path) ? 'font-bold' : 'font-light text-sky-400'));
	const setPage = (path) => () => navigate(path);

  	return (
		<div className="flex min-h-screen">
			<div className="flex flex-col h-screen px-10 py-2">
				<div className="flex items-center my-5">
					<img src={logo} alt="Logo" className="w-12 h-auto mr-2 rounded-full" />
					<div>
						<h1 className="text-xl font-bold">Capy</h1>
						<p className="text-sm text-gray-500 roboto-slab font-light text-black">ok i pull up</p>
					</div>
				</div>

				{/* navigation */}
				<button onClick={setPage('/')} className={boldNavClass('/')}>All Events</button>  
				<button onClick={setPage('/my')} className={boldNavClass('/my')}>My Events</button> 
				<button onClick={setPage('/groups')} className={boldNavClass('/groups')}>Groups</button> 
				<button onClick={setPage('/friends')} className={boldNavClass('/friends')}>Friends</button> 
				<button onClick={setPage('/profile')} className={boldNavClass('/profile')}>Profile</button>

				{ (location.pathname !== '/create') ?
					<button onClick={setPage('/create')} className="mt-auto px-4 py-2 bg-black text-white rounded-full mb-5">New Event</button> :
					null
				}
			</div>

			{/* main content */}
			<main className="flex-grow overflow-y-auto p-10 pr-20 pt-20">
				<Routes>
					<Route path="/" element={<div>all events</div>}/>
					<Route path="/my" element={<div>my events</div>}/>
					<Route path="/groups" element={<div>groups</div>}/>
					<Route path="/friends" element={<div>friends</div>}/>
					<Route path="/profile" element={<Profile/>}/>
					<Route path="/create" element={<Event />}/>
				</Routes>
			</main>

			{/* floating top right section */}
			<div className="fixed top-0 right-0 flex items-center p-5">
				<div className='p-0 m-0'>
					<h1 className="Profile-name">Ur Mom</h1>
					<button type="button" className="Sign-Out" variant="contained">Sign Out</button>
				</div>
				<img src={profile} className="Profile-Img" alt="Profile"/>
			</div>
		</div>
  );
}

export default Main;
