import React from 'react';
import { createRoot } from 'react-dom/client';
import Timer from './Timer'; // Ajuste o caminho de importação se necessário
import { countForEndMeet } from './modules/endMeet';

// Função para inserir o botão de forma idêntica
function insertButtonLikeOriginal() {
    const container = document.querySelector('.R5ccN');

    if (container && !container.querySelector('.novo-botao')) {
        const buttonHTML = `
        <div class="novo-botao">
            <span data-is-tooltip-wrapper="true">
                <button style="background-color: #EDAE00" class="VYBDae-Bz112c-LgbsSe VYBDae-Bz112c-LgbsSe-OWXEXe-SfQLQb-suEOdc hk9qKe Iootmd vLQezd" 
                    aria-label="Novo botão" 
                    data-tooltip-enabled="true" 
                    role="button">
                    <span aria-hidden="true" class="VYBDae-Bz112c-kBDsod-Rtc0Jf">
                        <i aria-hidden="true" class="google-symbols ebW6mc">schedule</i>
                    </span>
                </button>
                <div class=".tooltip ne2Ple-oshW8e-V67aGc" role="tooltip" aria-hidden="true">Novo botão</div>
            </span>
        </div>`;

        const referenceElement = container.querySelector('.NHaLPe');
        if (referenceElement) {
            // Insere o novo botão logo após o botão existente
            referenceElement.insertAdjacentHTML('beforebegin', buttonHTML);
        }
    }
}

// Função para observar mudanças no DOM
function observeDOMChanges() {
    const targetNode = document.body;

    const observer = new MutationObserver(() => {
        insertButtonLikeOriginal();
    });

    observer.observe(targetNode, { childList: true, subtree: true });
}

// Iniciar o observador
observeDOMChanges();

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

