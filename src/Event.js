import React, { useState } from "react";

export default function Event() {
  return (
    <div className="place-content-center">
      {" "}
      <header className="w-screen text-6xl font-mono flex justify-center">
        {"Create a new event"}
      </header>
      <body className="Main-body bg-slate-400 w-6/12 h-96 content-center">
        <div>
          {"INPUT TITLE:"}
          <input type="text" />
        </div>
        <div>
          {"INPUT TIME"}
          <input type="text" />
        </div>
        <div>
          {"INPUT LOCATION"}
          <input type="text" />
        </div>
        <div>
          {"INPUT DESCRIPTION"}
          <input type="text" />
        </div>
        <div> {"WORDS WORDS WORDS WORDS"}</div>
      </body>
    </div>
  );
}
