import React from 'react';
import ReactDOM from 'react-dom/client';
import Taxi from './room/Taxi';
import TaxiRoom from './room/TaxiRoom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TaxiRoom/>
  </React.StrictMode>
);

