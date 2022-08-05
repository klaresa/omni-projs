function contar() {
    var inicio = document.getElementById('inicio');
    var fim = document.querySelector('input#fim');
    var passo = document.getElementById('passo');
    var res = document.getElementById('res');


    if (inicio.value.length === 0 || fim.value.length === 0 || passo.value.length === 0){
        window.alert("preciso de todos os dados")
    } else {
        res.innerHtml = 'contando: ';

        var i = Number(inicio.value);
        var f = Number(fim.value);
        var p = Number(passo.value);

        // se inicio for maior que fim
        if (i < f){

            // o contador tem o valor de inicio
            // se o valor de contador for menor ou igual a fim
            // contador eh o valor dele mesmo mais passo
            for (let c = i; c <= f; c += p){
                res.innerHTML += ` ${c} ->`
            }
        } else {

            // se o contador for maior ou igual a fim
            // contador eh o valor dele mesmo menos passo
            for (let c = i; c >= f; c -= p){
                res.innerHTML += ` ${c} ->`
            }
        }
        res.innerHTML += ` ok`

    }

}