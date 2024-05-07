import React from 'react'
import './Main.css';
import logo from './assets/capy.png'
import profile from './assets/coda.png'

function Main() {
  return (
    <div className="w-screen">
      

      <div class="left-sidebar">
        <body className="Main-body">
          
          <h1 className="Body-Header">Explore all events</h1>

        </body>

        <header className="Main-header">
          <img src={logo} className="Main-logo" alt="logo"/>
          <div class="Header-options">
            <div className="Main-title">
              <h1 className="Title">
                Capy
              </h1>
              <h2 className="Motto">
                ok i pull up
              </h2>
            
            </div>
            <br></br>
            <div class="Main-buttons">
              <button type="button" className="All-Events" variant="contained">All Events</button>
              <button type="button" className="My-Events" variant="contained">My Events</button>
              <button type="button" className="Groups" variant="contained">Groups</button>
              <button type="button" className="Friends" variant="contained">Friends</button>
              <button type="button" className="Profile" variant="contained">Profile</button>


            </div>

          
          </div>

        </header>

        <header className="Main-profile">
          <div>
            <h1 className="Profile-name">Ur Mom</h1>
            <button type="button" className="Sign-Out" variant="contained">Sign Out</button>
          </div>
          <img src={profile} className="Profile-Img" alt="Profile"/>


        </header>

      </div>    










      
    </div>
  );
}

export default Main;
