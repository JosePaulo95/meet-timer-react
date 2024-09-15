import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './MyComponent'; // Importa seu componente React

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// Cria um container para o React component
const container = document.createElement('div');
container.id = 'my-react-container';
document.body.appendChild(container);

// Monta o componente React no container
ReactDOM.render(<MyComponent />, container);
