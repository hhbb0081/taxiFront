import React, { useState, useEffect } from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import TaxiRoom from './room/TaxiRoom';
import TaxiRoomDetail from './room/TaxiRoomDetail'

function App() {
  return(
    <Routes>
      <Route path='/' element={<TaxiRoom/>}></Route>
      <Route path='/TaxiRoomDetail' element={<TaxiRoomDetail/>}></Route>
    </Routes>
  )
}

export default App;
