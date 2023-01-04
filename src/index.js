import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
// <<<<<<< HEAD
// import './index.css';
// import Taxi from './Taxi';

// =======
import Taxi from './room/Taxi';
import TaxiRoom from './room/TaxiRoom';
// >>>>>>> e7a9a5e5eaa45e5cfac2080b8e70243c172a33e0
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TaxiRoom/>
  </React.StrictMode>
);

