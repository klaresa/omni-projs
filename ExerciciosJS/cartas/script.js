
let pElement = document.querySelectorAll('.cartas p');

let cartasLista = ["fina", "media", "grossa"];
shuffleArray(cartasLista);

function adicionar() {
    let contador = 0;
    for (let el of pElement){
        el.innerHTML = cartasLista[contador];
        el.style.opacity = '0';
        contador++;
    }

    for (let item of pElement){
        item.addEventListener('click', function () {

            // aqui eu pego o elemento PAI
            let parent = item.parentElement;
            girar(parent);

            setTimeout(() => showText(item), 1000);
        });
    }
}
adicionar();

function girar(item) {
    item.style.transition = '1.0s';
    item.style.transform = 'rotateY(360deg)';
}

function showText(item) {
    item.style.opacity = '1';
    item.style.background = '#272727';
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function resetar() {
    shuffleArray(cartasLista);
    let items = document.querySelectorAll('.cartas');

    for (let item of items){
        item.removeAttribute('style');
        item.style.transition = '0s';

    }
    adicionar();
}



// function sorteiaUm() {
//     let tamanho = cartasLista.length;
//     let sorteado = Math.floor(Math.random() * tamanho);
//     let largura = cartasLista[sorteado];
// }

