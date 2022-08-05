function carregar() {
    var msg = document.getElementById('mensagem');
    var img = document.getElementById('imagem');

    var data = new Date();
    var hora = data.getHours();
    //var hora = 17;

    msg.innerHTML = `Sao ${hora} agora`;

    if (hora >= 0 && hora < 12) {
        img.innerText = 'bom dia';
        document.body.style.background = '#ffe681'
    } else if (hora >= 12 && hora <= 18) {
        img.innerText = 'boa tarde';
        document.body.style.background = '#ffb37d'
    } else {
        img.innerText = 'boa noite'
        document.body.style.background = '#485570'
    }
}