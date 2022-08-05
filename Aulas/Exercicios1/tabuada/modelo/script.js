function tabuada() {

    let num = document.querySelector('input#num');
    let lista = document.getElementById('lista');

    if (num.value.length == 0){
        window.alert('problema');
    } else {
        let n = Number(num.value);
        let c = 1;
        lista.innerHTML = '';

        while (c <= 10){
            let item = document.createElement('option');
            item.text = `${n} x ${c} = ${n*c}`;
            item.value = `lista${c}`;
            lista.appendChild(item);
            c++
        }

    }
}
