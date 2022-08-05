const express = require('express');
const server = express();
server.use(express.json());

// query params ?teste=1
// route params = /users/1
// request body = { "name": "Allan" }

let projects = [];
let requisicoes = 0;

server.use((req, res, next) => {
    requisicoes++;
    console.log(`${req.method} - Total de requisicoes: ${requisicoes}`);
    return next();
});

// funciona NAO ALTERAR
function checkId(req, res, next) {
    const user = req.params.id;

    const indice = projects.find((item) => {
        return item.id === user;
    });

    const pos = projects.indexOf(indice);

    if (indice !== undefined) {
        req.user = user;
        req.posUserId = pos;
        console.log(`pos: ${pos} user: ${user}`);

    } else {
        req.posUserId = undefined;
        req.user = undefined;

        res.json( { message: "Erro: id nao encontrado!" } );
    }
    return next();
}

// funciona NAO ALTERAR
server.get('/projects', (req, res) => {
    return res.json(projects);
});

// funciona NAO ALTERAR
server.get('/projects/:id', checkId, (req, res) => {
    return res.json(projects[req.posUserId]);
});

// funciona NAO ALTERAR
server.put('/projects/:id', checkId, (req, res) => {
    const { title } = req.body;

    const pos = req.posUserId;
    if (pos !== undefined){
        projects[req.posUserId].title = title;
        return res.json(projects);
    }

});

// funciona NAO ALTERAR sem middleware
server.post('/projects', (req, res) => {
    const { id, title, tasks } = req.body;

    const indice = projects.find((item) => {
        return item.id === id;
    });

    if (!indice) {
        projects.push({ id, title, tasks });
        return res.json(projects);
    } else {
        return res.json({ message: "Nao foi possivel criar este usuario" })
    }
});

// funciona NAO ALTERAR
server.delete('/projects/:id', checkId, (req, res) => {
    const pos = req.posUserId;
    const user = req.user;

    console.log(`del: pos: ${pos} user: ${user}`);

    if (pos !== undefined){
        projects.splice(pos, 1);
        return res.json(projects);
    }

});

// funciona NAO ALTERAR
server.post(`/projects/:id/tasks`, checkId, (req, res) => {
    const { title } = req.body;
    const pos = req.posUserId;

    if (pos !== undefined) {
        projects[pos].tasks.push(title);
        return res.json(projects);
    }
});

server.listen(3000);