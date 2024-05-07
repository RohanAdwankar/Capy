import React, {useState} from 'react'
import './Main.css';
import logo from './assets/capy.png'

function Main() {
  return (
    <div className="w-screen">
      <header className="Main-header">
        <img src={logo} className="Main-logo" alt="logo"/>

        <h1 className="Main-title">CAPY</h1>
        <button type="button" className="Main-login" variant="contained">Login</button>
        


      </header>
      <body className="Main-body">
        Ok Pull up



        

      </body>



      
    </div>
  );
}

export default Main;
