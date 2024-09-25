import React, { useState, useEffect } from 'react';
import { calcRemainingTime, calculateFutureTime } from '../../../utils/time';
import './Popup.css';

const Popup = () => {
  const [inputEndTime, setInputEndTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [remainingTime, setRemainingTime] = useState('--:--');

  useEffect(() => {
    chrome.storage.local.get('selectedEndTime', (result) => {
      const storedInputEndTime = result.selectedEndTime || ''; // Se não houver, define como ''
      setInputEndTime(storedInputEndTime); // Atualiza o estado, por exemplo
      setSelectedEndTime(storedInputEndTime);

      if (storedInputEndTime) {
        setInterval(() => {
          setRemainingTime(calcRemainingTime(storedInputEndTime))
        }, 1000);
      }
    });
  }, []);

  // Função para definir o horário no estado
  const setTimeFromNow = (minutesToAdd) => {
    setInputEndTime(calculateFutureTime(minutesToAdd));
  };

  const handleUserSetTime = () => {
    setSelectedEndTime(inputEndTime);
    chrome.storage.local.set({ selectedEndTime: inputEndTime })

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { action: 'testMessage', data: inputEndTime });
      })
    });

    setInterval(() => {
      setRemainingTime(calcRemainingTime(inputEndTime))
    }, 1000);
  };

  const handleResetTimer = () => {
    setSelectedEndTime('');
    setInputEndTime('');
    chrome.storage.local.remove('selectedEndTime')

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { action: 'testMessage', data: '' });
      })
    });
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
          <>
            <p className="description">Any Meet you host will automatically end in:</p>
            <h1>{remainingTime}</h1>
            <button className='red-button' onClick={handleResetTimer}>Cancel</button>
          </>
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
