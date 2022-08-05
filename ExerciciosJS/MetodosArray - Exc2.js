
const usuarios = [
    { nome: 'Diego', idade: 23, empresa: 'Rocketseat' },
    { nome: 'Gabriel', idade: 15, empresa: 'Rocketseat' },
    { nome: 'Lucas', idade: 30, empresa: 'Facebook' },
];

let idades = usuarios.map(function (value) {
    return value.idade;
});
console.log("idades: ", idades);

let filter = usuarios.filter(function (item) {
    return item.idade > 18;

});
console.log("filtro: ", filter);

let find = usuarios.find(function (item) {
   return item.empresa === 'google'
});
console.log("find: ", find);




// multiplica primeiro e depois filtra
let filtrando = usuarios.map(function (item) {
    return item.idade * 2;
})
    .filter(function (value) {
    return value <= 50;
});


console.log(filtrando);
console.log(usuarios);