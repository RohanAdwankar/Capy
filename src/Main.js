import React from 'react'
import './Main.css';
import logo from './assets/capy.png'
import profile from './assets/coda.png'
import Event from "./Event";

function Main() {
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

					{/* <navigation> */}
						<button type="button" className="font-bold ml-5 text-left my-1" >All Events</button>  
						<button type="button" className="text-left ml-5 my-1 text-sky-400">My Events</button> 
						<button type="button" className="text-left ml-5 my-1 text-sky-400">Groups</button> 
						<button type="button" className="text-left ml-5 my-1 text-sky-400">Friends</button> 
						<button type="button" className="text-left ml-5 my-1 text-sky-400">Profile</button>
					{/* </navigation> */}

					<button className="mt-auto px-4 py-2 bg-black text-white rounded-full mb-5">New Event</button>
				</div>

				<main className="flex-grow overflow-y-auto px-4 py-4 pt-20">
					<Event />
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
    // <div className="w-screen">
    //   <div class="left-sidebar">
    //     <header className="Main-header">
    //       <img src={logo} className="Main-logo" alt="logo"/>
    //       <div class="Header-options">
    //         <div className="Main-title">
    //           <h1 className="Title">
    //             Capy
    //           </h1>
    //           <h2 className="Motto">
    //             ok i pull up
    //           </h2>
    //         </div>
    //         <div class="Main-buttons mt-10">
              // <button type="button" className="All-Events" variant="contained">All Events</button>
              // <button type="button" className="My-Events" variant="contained">My Events</button>
              // <button type="button" className="Groups" variant="contained">Groups</button>
              // <button type="button" className="Friends" variant="contained">Friends</button>
              // <button type="button" className="Profile" variant="contained">Profile</button>
    //         </div>

          
    //       </div>

    //     </header>

    //     <header className="Main-profile">
          // <div>
          //   <h1 className="Profile-name">Ur Mom</h1>
          //   <button type="button" className="Sign-Out" variant="contained">Sign Out</button>
          // </div>
          // <img src={profile} className="Profile-Img" alt="Profile"/>


    //     </header>

    //   </div>    
    // </div>
  );
}

export default Main;
