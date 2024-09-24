import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = () => {
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    setEndTime(calculateFutureTime(0));
  }, []);

  function calculateFutureTime(minutesToAdd, start = new Date()) {
    const now = new Date(start.getTime());

    const currentMinutes = now.getMinutes();
    const roundedMinutes = minutesToAdd ? Math.round((currentMinutes + minutesToAdd) / 15) * 15 : currentMinutes;

    if (roundedMinutes === 60) {
      now.setHours(now.getHours() + 1);
      now.setMinutes(0);
    } else {
      now.setMinutes(roundedMinutes);
    }

    return now.toTimeString().slice(0, 5);
  }


  // Função para definir o horário no estado
  const setTimeFromNow = (minutesToAdd) => {
    setEndTime(calculateFutureTime(minutesToAdd));
  };

  const sendMessageToContentScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'testMessage', data: endTime });
    });
  };

  return (
    <div className="App">
      <div className="container">
        <p className="description">Set a time to end your Google Meet call</p>
        <div className="input-group">
          <input
            type="time"
            id="end-time-input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="HH:MM"
          />
          <div className="preset-buttons">
            {/* Botões que calculam a hora exata e mostram no rótulo */}
            <button onClick={() => setTimeFromNow(15)}>{`${calculateFutureTime(15)}`}</button>
            <button onClick={() => setTimeFromNow(30)}>{`${calculateFutureTime(30)}`}</button>
            <button onClick={() => setTimeFromNow(45)}>{`${calculateFutureTime(45)}`}</button>
          </div>
        </div>
        <button id="set-timer" onClick={sendMessageToContentScript}>Set</button>
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
