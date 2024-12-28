const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {


    const urlInfo = require('url').parse()

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Olá, este é o meu primeiro server com HTML</h1>");
});

server.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});
