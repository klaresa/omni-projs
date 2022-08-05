const express = require('express');
const server = express();

// faz com que o express entenda JSON
server.use(express.json());

const users = ["Ana", "Clara", "Maria"];

// para acessar todos os usuarios
server.get('/users', (req, res) => {
    return res.json(users);
});

// Query Params ?teste=1
// server.get('/teste', (req, res) => {
//     const nome = req.query.nome;
//     return res.json({message: `Hello ${nome}!!`});
// });

// Route Params
// server.get('/users/:id', (req, res) => {
//    const {id} = req.params;
//    return res.json(`O id buscado foi: ${id}`)
// });

// para acessar o user a partir do index
server.get('/users/:index', (req, res) => {
   // const id = req.params.id;
    // desestruturando
    const { index } = req.params;
    return res.json(users[index]);
});

// para enviar dados ao servidor
server.post('/users', (req, res) => {
    const { name } = req.body;
    users.push(name);
    return res.json(users);
});

server.put('/users/:index', (req, res) => {
    const { name } = req.body;
    const { index } = req.params;

    users[index] = name;

    return res.json(users);
});

server.delete('/users/:index', (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);
    return res.json(users);
});

// para o server ouvir a porta 3000
server.listen(3000);
