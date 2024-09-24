import React, { useState, useEffect } from 'react';
import { calculateFutureTime } from '../../../utils/time';
import './Popup.css';

const Popup = () => {
  const [inputEndTime, setInputEndTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  useEffect(() => {
    const storedInputEndTime = localStorage.getItem('selectedEndTime');

    if (storedInputEndTime) {
      setInputEndTime(storedInputEndTime);
      setSelectedEndTime(storedInputEndTime);
    }
  }, []);

  // Função para definir o horário no estado
  const setTimeFromNow = (minutesToAdd) => {
    setInputEndTime(calculateFutureTime(minutesToAdd));
  };

  const handleUserSetTime = () => {
    setSelectedEndTime(inputEndTime);
    localStorage.setItem('selectedEndTime', inputEndTime);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'testMessage', data: inputEndTime });
    });
  };

  const handleResetTimer = () => {
    setSelectedEndTime('');
    localStorage.removeItem('selectedEndTime');
  };

  return (
    <div className="App">
      <div className="container">
        {!selectedEndTime ? (
          <>
            <p className="description">Set a time to end your Google Meet call</p>
            <div className="input-group">
              <input
                type="time"
                id="end-time-input"
                value={inputEndTime}
                onChange={(e) => setInputEndTime(e.target.value)}
                placeholder="HH:MM"
              />
              <div className="preset-buttons">
                <button onClick={() => setTimeFromNow(15)}>{`${calculateFutureTime(15)}`}</button>
                <button onClick={() => setTimeFromNow(30)}>{`${calculateFutureTime(30)}`}</button>
                <button onClick={() => setTimeFromNow(45)}>{`${calculateFutureTime(45)}`}</button>
              </div>
            </div>
            <button id="set-timer" onClick={handleUserSetTime}>Set</button>
          </>
        ) : (
          <button className='red-button' onClick={handleResetTimer}>Cancel</button>
        )}
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
