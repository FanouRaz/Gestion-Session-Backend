const mysql = require("mysql");
const { header } = require("../headers");
require("dotenv").config({path:"./config/.env"});
const connexion = mysql.createConnection({
    host: "localhost",
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
  });

  
module.exports.homeController = (req,res)=>{
    let users = [];
    connexion.query("SELECT nom,prenom,email FROM `utilisateurs`",(err,results)=>{
        results.map(user => {
            users.push(user);
        });
        res.writeHead(200,header);
        res.end(JSON.stringify({users}));
    }); 
};