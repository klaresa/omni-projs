const express = require('express');
const server = express();
server.use(express.json());

//apresentar a documentacao do sistema
/// analise de req
// diagrama de classes de uso e classes
// diagrama de relacionamento - modelo entidade-relacionamento

// let users = {
//   "users": {
//     "1": {"name": "Ana"},
//     "2": {"name": "bia"}
//   }
// };

// {
//   "users": [
//     {id: 1, name: "Ana"}, {id: 2, name: "Bia"}
//   ]
// }

let users = [
    {id: 1, name: "Ana"},
    {id: 2, name: "Bia"},
    {id: 3, name: "Cia"}
    ];

let idCounter = 3;

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

server.get('/users', (req, res) => {
  return res.json(users);
});

function createId() {
  return ++idCounter;
}

function idExists(req, res, next) {
  let { id } = req.params;

  id = parseInt(id);

  let find = users.find((item) => {
    return item.id === id;
  });

  // console.log("find ", find);
  // console.log("filter ", filter);

  if (find === undefined) {
    req.userId = find;
    // req.index = users.indexOf(filter[0]);
    // console.log("index", req.index);
  } else {
    return res.json({ msg: "invalid id!" })
  }

  return next();
}


server.post('/users', (req, res) => {
  let { name } = req.body;
  users.push({id: createId(), name: name});
  return res.json(users);
});

server.get('/users/:id', idExists, (req, res) => {
  return res.json(req.userId);
});

server.delete('/users/:id', idExists, (req, res) => {
  users.splice(req.index, 1);
  return res.json(users);
});


server.listen(3333);
