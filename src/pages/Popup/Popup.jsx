import React, { useState } from 'react';
import './Popup.css';

const Popup = () => {
  const [endTime, setEndTime] = useState('');

  const adjustTimeBy = (minutesToAdd) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutesToAdd);

    const formattedTime = now.toTimeString().slice(0, 5);
    setEndTime(formattedTime);
  };

  const sendMessageToContentScript = () => {
    chrome.runtime.sendMessage({ action: 'setTimer', time: endTime }, (response) => {
      console.log('Response from content script:', response);
    });
  };

  return (
    <div className="App">
      <div className="container">
        <p className="description">Set a time to end the Google Meet call</p>

        <div className="input-group">
          <input
            type="time"
            id="end-time-input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="HH:MM"
          />
          <div className="preset-buttons">
            <button onClick={() => adjustTimeBy(15)}>+15 minutos</button>
            <button onClick={() => adjustTimeBy(30)}>+30 minutos</button>
            <button onClick={() => adjustTimeBy(45)}>+45 minutos</button>
          </div>
        </div>
        <button id="set-timer" onClick={sendMessageToContentScript}>Start</button>
      </div>
      <hr />
      <div className="footer-container">
        <span>Meet Timer</span>
        <p>Version 1.0</p>
      </div>
    </div>
  );
};

export default Popup;
