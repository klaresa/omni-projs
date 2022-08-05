const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // cria o servidor. tb eh usado pelo express

const routes = require('./routes');
const { setUpWebSocket } = require('./websocket');

const app = express(); // o express eh uma funcao!
const server = http.Server(app); // para a nossa app entender as requisicoes http quanto as de protocolo websocket
// extraindo da app express o servidor http fora do express (ele ja tinha dentro)

setUpWebSocket(server);

mongoose.connect('mongodb+srv://klaresa:klaresa@cluster0-mxtnx.mongodb.net/semana10?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true
    });

// app.use(cors({ origin: 'http://localhost:3000'}));
app.use(cors()); // libera o acesso externo para toda app
app.use(express.json());
app.use(routes);

server.listen(3331);
