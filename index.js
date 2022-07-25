const http = require("http");
require("dotenv").config();
console.log(process.env.PORT);

const server = http.createServer();

server.listen(process.env.PORT || 8000,(req,res)=>{
    console.log(`Serveur en écoute du port ${process.env.PORT || 8000}`);
});