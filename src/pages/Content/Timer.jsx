import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ endTimeStr }) => {
    const [remainingTime, setRemainingTime] = useState('00:00');

    // Função que calcula o tempo de fim baseado na string de hora de fim
    const calculateEndTime = (endTimeStr) => {
        const [hours, minutes] = endTimeStr.split(':').map(Number);
        const endTime = new Date();
        endTime.setHours(hours);
        endTime.setMinutes(minutes);
        endTime.setSeconds(0);
        return endTime.getTime();
    };

    useEffect(() => {
        const endTime = calculateEndTime(endTimeStr);

        // Função que atualiza o timer
        const updateTimer = () => {
            const currentTime = new Date().getTime();
            const remaining = endTime - currentTime;

            if (remaining <= 0) {
                setRemainingTime('00:00');
                return;
            }

            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

            const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

            setRemainingTime(`${displayMinutes}:${displaySeconds}`);
        };

        // Atualiza o timer a cada segundo
        const interval = setInterval(updateTimer, 1000);

        // Executa a primeira atualização imediatamente
        updateTimer();

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, [endTimeStr]);

    return (
        <div className='timer-container'>
            <span className='timer'>{remainingTime}</span>
        </div>
    );
};

export default Timer;
