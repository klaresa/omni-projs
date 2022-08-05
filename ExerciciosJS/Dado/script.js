
let body = document.querySelector('#quadrado');

let n1 = 0, n2 = 0, n3 = 0, n4 = 0, n5 = 0, n6 = 0;

function randomNumberPicker(){
    let randomNumero = Math.ceil(Math.random() * 6);

    const timer = () => body.innerHTML = randomNumero;
    const timeroff = () => {
        body.innerHTML = '';
        body.removeAttribute('id');
        body.setAttribute('id', 'quadrado');
    };
    setTimeout(timer, 1500);
    setTimeout(timeroff, 5000);

    switch (randomNumero) {
        case 1: n1++; break;
        case 2: n2++; break;
        case 3: n3++; break;
        case 4: n4++; break;
        case 5: n5++; break;
        case 6: n6++; break;
    }
    mostrar(n1, n2, n3, n4, n5, n6);
}

function mostrar(n1, n2, n3, n4, n5, n6) {

    let soma = (n1+n2+n3+n4+n5+n6);
    let arrayNumeros = [n1, n2, n3, n4, n5, n6];

    for (let n of arrayNumeros){
        console.log(soma+": " + n / soma * 100);
    }
    console.log("Todos os sorteios: " + n1, n2, n3, n4, n5, n6);
}

body.addEventListener('click', transformar);
function transformar() {
    body.setAttribute('id', 'virar');
    randomNumberPicker();
}