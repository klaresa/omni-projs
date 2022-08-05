
class Usuario{
    constructor(email, senha){
        this.email = email;
        this.senha = senha;
        this.admin = false;
    }

    isAdmin(){
        return this.admin === true;
    }

    setSenha(senha){
        this.senha = senha;
    }
}

class Admin extends Usuario{
    constructor(email, senha = email){ // senha padrao aqui apenas para admin
        super(email, senha );
        this.admin = true;
    }
}


let user1 = new Usuario("teste@email.com", "waaa", );
let admin1 = new Admin("admin@admin");

console.log(user1);
console.log(admin1);

console.log(user1.isAdmin());
console.log(admin1.isAdmin());

user1.setSenha("sennhaaaa");
console.log(user1);

admin1.setSenha("wawawa");
console.log(admin1);
