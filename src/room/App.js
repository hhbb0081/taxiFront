import React, { useState, useEffect } from 'react';
import { BrowserRouter,Routes,Route,Link,useParams } from 'react-router-dom';
import TaxiRoom from './TaxiRoom';
import TaxiRoomDetail from './TaxiRoomDetail'
import Login from "../login/Login";
import Join from "../join/Join";
import Find from "../login/Find";

function App() {
  const parmas= useParams()
  return(
    <Routes>
      <Route path='/' element={<TaxiRoom/>}></Route>
      <Route path='/TaxiRoomDetail/:name' element={<TaxiRoomDetail />}></Route>
      <Route path="/login" element={<Login/>}></Route> 
      <Route path='/join' element={<Join />}></Route> 
      <Route path='/find' element={<Find/>}></Route> 
    </Routes>
  )
}

export default App;