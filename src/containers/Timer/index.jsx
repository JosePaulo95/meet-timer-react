import React, { useState, useEffect } from 'react';
import './style.css';
import { calcRemainingTime } from '../../../utils/time';

const Timer2 = ({ endTimeStr }) => {
    const [remainingTime, setRemainingTime] = useState('--:--');

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
        <span className='timer'>{remainingTime}</span>
    );
};

export default Timer2;
