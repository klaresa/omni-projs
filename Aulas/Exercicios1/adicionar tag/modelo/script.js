function clicka() {

    let ocultar = document.querySelector('div#clicar');

    // pega o elemento
    let res = document.getElementById('res');

    // cria um novo tag div
    let texto = document.createElement('p');

    // configura atributos para esse novo elemento
    // um id chamado texto
    texto.setAttribute('id', 'texto');

    // adiciona um texto dentro desse p
    texto.innerText = "wawawawawawawaaaaawa";

    // adiciona ao documento
    res.appendChild(texto);

    ocultar.innerHTML = "";

}