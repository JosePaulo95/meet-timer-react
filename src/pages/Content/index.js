import React from 'react';
import { createRoot } from 'react-dom/client';
import Timer from './Timer'; // Ajuste o caminho de importação se necessário
import { calcRemainingTime } from '../../../utils/time';

const injectComponent = (message) => {
    const existingElement = document.getElementById('my-react-component');

    if (!message) {
        if (existingElement) {
            existingElement.remove();
        }
        return;
    }

    if (!existingElement) {
        const element = document.createElement('div');
        element.id = 'my-react-component';
        document.body.appendChild(element);
    }

    const container = document.getElementById('my-react-component');
    const root = createRoot(container); // Cria a root para renderizar o componente
    root.render(<Timer endTimeStr={message} />);
};

function endMeeting() {
    function clickEndCallButton() {
        var firstButton = document.querySelector('[jsname="CQylAd"]');
        if (firstButton) {
            firstButton.click();
            // Espere o popup de confirmação aparecer
            setTimeout(clickConfirmEndForEveryoneButton, 500); // Ajuste o tempo conforme necessário
        } else {
            console.log('Primeiro botão não encontrado');
        }
    }

    // Função para clicar no botão com jsname="V67aGc"
    function clickConfirmEndForEveryoneButton() {
        var secondButton = document.querySelector('.VfPpkd-T0kwCb button[jscontroller="soHxf"] span[jsname="V67aGc"]');
        if (secondButton) {
            secondButton.click();
        } else {
            console.log('Segundo botão não encontrado');
        }
    }

    // Execute a função para clicar no primeiro botão
    clickEndCallButton();
}

let interval;

function countForEndMeet(endTimeStr) {
    // Se endTimeStr for nulo ou vazio, limpar o intervalo e sair
    if (!endTimeStr) {
        clearInterval(interval);
        console.log("End time is not set. Stopping the interval.");
        return;
    }

    console.log("Starting countdown for meet...");

    // Limpa qualquer intervalo anterior antes de começar um novo
    clearInterval(interval);

    // Inicia um novo intervalo
    interval = setInterval(function () {
        const remainingTimeStr = calcRemainingTime(endTimeStr);
        console.log("Meet will end in: " + remainingTimeStr);

        // Se o tempo restante for "00:00", encerre o meet e limpe o intervalo
        if (remainingTimeStr.includes("00:00")) {
            clearInterval(interval);
            endMeeting(); // Supondo que a função endMeeting() já exista
            return;
        }
    }, 1000);
}

// Escuta mensagens do popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'testMessage') {
        // Injetar o componente com a mensagem recebida
        injectComponent(request.data);

        if (window.location.href.includes("meet.google")) {
            countForEndMeet(request.data)
        }
        sendResponse({ status: 'Message received!' });
    }
});

chrome.storage.local.get('selectedEndTime', (result) => {
    const storedEndTime = result.selectedEndTime;

    if (storedEndTime) {
        injectComponent(storedEndTime);
        if (window.location.href.includes("meet.google")) {
            countForEndMeet(request.data)
        }
    }
});

