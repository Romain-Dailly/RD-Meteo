import React from 'react';
import './App.css';
import Geolocation from './components/Geolocation';

const App = () => {
  return (
    <div className="bg">
      <div>
        <Geolocation />
      </div>
    </div>
  );
};

export default App;
