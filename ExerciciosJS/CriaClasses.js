
class Pessoa{
    constructor(nome, sobrenome){
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.amazing = false;
    }
}

class Clarice extends Pessoa{
    constructor(nome, sobrenome){
        super(nome, sobrenome);
        this.amazing = true;
    }
}

let pessoa = new Pessoa("Clara", "Liz");
console.log(pessoa);

let clarice = new Clarice("Clarice", "Saraiva");
console.log(clarice);

function Cafe(nome, intensidade) {
    this.nome = nome;
    this.intensidade = intensidade;

    Cafe.prototype.retornar = function () {
        return `${nome} eh o melhor cafe!`
    }
}

let gosto = new Cafe("pilao", "forte");
console.log(gosto.retornar());

let livro = {
    nome: "Um nome",
    autor: "um titulo",
    edicao: [2000, 2004, 2010],
    genero: "acao"
};

let livro2 = {...livro, genero: "suspense"};
console.log(livro2);