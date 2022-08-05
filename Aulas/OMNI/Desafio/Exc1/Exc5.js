
var usuarios = [
    {
        nome: "Diego",
        habilidades: ["Javascript", "ReactJS", "Redux"]
    },
    {
        nome: "Gabriel",
        habilidades: ["VueJS", "Ruby on Rails", "Elixir"]
    }
];

function habilidades(u) {

    for (let i of u){
        let lista = [];

        for (let j of i.habilidades){
            lista.push(j);
        }

        var tudo = lista.join(', ');

        console.log(`${i.nome} gosta de ${tudo}`);
    }
}

habilidades(usuarios);
