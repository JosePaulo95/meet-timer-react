import React, { useState, useEffect } from 'react';
import { calculateFutureTime } from '../../../utils/time';
import './Popup.css';

const Popup = () => {
  const [endTime, setEndTime] = useState('');
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    // Recupera o estado do localStorage ao iniciar o componente
    const storedEndTime = localStorage.getItem('endTime');
    const storedTimerActive = localStorage.getItem('timerActive') === 'true';

    if (storedEndTime) {
      setEndTime(storedEndTime);
    }
    setTimerActive(storedTimerActive);
  }, []);

  useEffect(() => {
    // Atualiza o localStorage sempre que o timerActive ou endTime mudar
    localStorage.setItem('endTime', endTime);
    localStorage.setItem('timerActive', timerActive);
  }, [endTime, timerActive]);

  // Função para definir o horário no estado
  const setTimeFromNow = (minutesToAdd) => {
    setEndTime(calculateFutureTime(minutesToAdd));
  };

  const sendMessageToContentScript = () => {
    setTimerActive(true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'testMessage', data: endTime });
    });
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    // Limpa o localStorage ao cancelar o temporizador
    localStorage.removeItem('endTime');
    localStorage.removeItem('timerActive');
  };

  return (
    <div className="App">
      <div className="container">
        {!timerActive ? (
          <>
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
                <button onClick={() => setTimeFromNow(15)}>{`${calculateFutureTime(15)}`}</button>
                <button onClick={() => setTimeFromNow(30)}>{`${calculateFutureTime(30)}`}</button>
                <button onClick={() => setTimeFromNow(45)}>{`${calculateFutureTime(45)}`}</button>
              </div>
            </div>
            <button id="set-timer" onClick={sendMessageToContentScript}>Set</button>
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
