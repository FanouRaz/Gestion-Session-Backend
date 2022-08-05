const http = require("http");

const { routes } = require("./routes/routes");

require("dotenv").config({path:"./config/.env"});

const server = http.createServer((req,res)=>{
    routes(req,res);
});

server.listen(process.env.PORT || 8000,(req,res)=>{
    console.log(`Serveur en écoute du port ${process.env.PORT || 8000}`);
});