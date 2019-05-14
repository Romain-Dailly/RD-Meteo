import React, { Component } from 'react';
import './App.css';
import Geolocation from './components/Geolocation';

class App extends Component {

  render() {
    return (
      <div className="bg">
        <div>
          <Geolocation />
        </div>
      </div>
    );
  }
}

export default App;
