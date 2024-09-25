import React, { useState, useEffect } from 'react';
import './Timer.css';
import { calcRemainingTime, calculateEndTime } from '../../../utils/time';

const Timer = ({ endTimeStr }) => {
    const [remainingTime, setRemainingTime] = useState('00:00');

    useEffect(() => {
        const updateTimer = () => {
            const remainingTime = calcRemainingTime(endTimeStr)
            setRemainingTime(remainingTime);
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
