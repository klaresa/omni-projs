import React from 'react'; // importa-se o react em to.do aqr que utiliza html
import ReactDOM from 'react-dom'; // o ReactDom da a habilidade do react se comunicar com a arvore de elementos DOM do HMTL
import App from './App'; //

ReactDOM.render(<App />, document.getElementById('root'));
// aqui o ReactDom insere o conteudo do App.js dentro do elemento de ID root

// o <App /> eh o JSX (JS + HTML)
