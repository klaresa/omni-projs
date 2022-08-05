
const arr = [1, 2, 3, 4, 5, 6];

let [x, ...y] = arr;
console.log(x);
console.log(y);


// function soma...
function soma(...params) {
    return params.reduce((item, next) => item + next);
}

console.log(soma(1, 2, 3, 4, 5, 6)); // 21
console.log(soma(1, 2)); // 3


// spread
const usuario = {
    nome: 'Diego',
    idade: 23,
    endereco: {
        cidade: 'Rio do Sul',
        uf: 'SC',
        pais: 'Brasil',
    }
};

let usuario2 = {...usuario, nome: "gabriel"};
console.log(usuario2);

let usuario3 = {...usuario, cidade: "Lontras"};
console.log(usuario3);



// template literals
const usuario01 = 'Diego';
const idade01 = 23;
console.log(`O usuário ${usuario01} possui ${idade01} anos`);


// Object Short Syntax
const nomeS = 'Diego';
const idadeS = 23;
const usuarioS = {
    nomeS,
    idadeS,
    cidade: 'Rio do Sul',
};
console.log(usuarioS);
