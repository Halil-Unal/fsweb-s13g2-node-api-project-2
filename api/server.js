// server için gerekli olanları burada ayarlayın

// posts router'ını buraya require edin ve bağlayın
const express = require("express");
const server = express();

const datarouter = require("./posts/posts-router");
server.use(express.json());

server.use('/api/datas', datarouter);

server.get('/', (req, res) => {
    res.send('Server is up and running!...')
});

module.exports = server;

