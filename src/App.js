import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { BrowserRouter,Routes,Route,Link,useParams } from 'react-router-dom';
import TaxiRoom from './room/TaxiRoom';
import TaxiRoomDetail from './room/TaxiRoomDetail'

function App() {
  const parmas= useParams()
  return(
    <Routes>
      <Route path='/' element={<TaxiRoom/>}></Route>
      <Route path='/TaxiRoomDetail/:name' element={<TaxiRoomDetail/>}></Route>
    </Routes>
  )
=======
import logo from './logo.svg';
import Join from './joinForm.jsx';
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.text())
      .then(message => {
        setMessage(message);
      });
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {message}
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
>>>>>>> 1fb08c43acc2ab79a5d1de27d5fca92ca8b56ccd
}

export default App;
