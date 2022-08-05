
function checaIdade(idade) {
    // Retornar uma promise
    return new Promise(function (resolve, reject) {
        if (idade > 18){
            resolve("OK")
        } else {
            reject("Erro")
        }
    })
}

checaIdade(20)
    .then(function() {
        console.log("Maior que 18");
    })
    .catch(function() {
        console.log("Menor que 18");
    });