import React from 'react';
import { createRoot } from 'react-dom/client';
import Timer from './Timer'; // Ajuste o caminho de importação se necessário

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
        sendResponse({ status: 'Message received!' });
    }
});
