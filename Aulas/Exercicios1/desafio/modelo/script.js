var listinha = [];
var lista = document.getElementById('lista');
var res = document.getElementById('res');

function add(num) {
    if (num.value.length == 0){
        window.alert('Adicione apenas numeros!');
    } else if (num.value < 1 || num.value > 100 ) {
        window.alert('numeros entre 1 a 100');
    } else {

        if (listinha.includes(num.value)){
            window.alert('O numero ja foi adicionado');
            num.value = '';
            num.focus();

        } else {
            listinha.push(num.value);
            return mostrar(num)
        }
    }
}

function mostrar(num) {
    var idnum = document.querySelector('input#num');
    let item = document.createElement('option');
    item.text = `Valor ${num.value} adicionado.`;
    lista.appendChild(item);
    idnum.value ='';
    res.innerText = '';
}

function finalizar() {
    if (listinha.length == 0){
        window.alert('Primeiro adicione valores.')
    } else {
        listinha.sort(function (a, b){return b-a});
        let maior = listinha[0];
        listinha.sort(function (a, b){return a-b});
        let menor = listinha[0];
        let soma = listinha.reduce(somar);
        let media = soma / listinha.length;
        res.innerHTML += `<br>O total de numeros: ${listinha.length}
                            <br>O menor: ${menor}
                            <br>O maior: ${maior}
                            <br> Soma: ${soma}
                            <br>Media: ${media}
                            <br>Todos os numeros: [${listinha}]`
    }

    function somar(total, num) {
        return Number(total) + Number(num)
    }
}