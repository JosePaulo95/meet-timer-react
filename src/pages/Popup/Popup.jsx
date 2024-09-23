import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <div class="container">
        <p class="description">Set a time to end the Google Meet call</p>

        <div class="input-group">
          <input type="time" id="end-time-input" placeholder="HH:MM" />
          <div class="preset-buttons">
            <button id="set-30-mins">19:30</button>
            <button id="set-45-mins">19:45</button>
            <button id="set-1-hour">20:00</button>
          </div>
        </div>
        <button id="set-timer">Start</button>
      </div>
      <hr />
      <div class="footer-container">
        <span>Meet Timer</span>
        <p>Version 1.0</p>
      </div>
    </div>
  );
};

export default Popup;
