import React from 'react';
import Room from './Room';
import "./App.css"

function App() {
  return (
    <div className="App h-screen w-screen items-center justify-center bg-gray-100  p-4 mt-10 overflow-hidden" >
      <h1>3-D model of room with the furniture.</h1>
      <Room />
    </div>
  );
}

export default App;
