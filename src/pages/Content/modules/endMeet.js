import { calcRemainingTime } from "../../../../utils/time";

export function endMeeting() {
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

export function countForEndMeet(endTimeStr) {
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