const bcrypt = require("bcrypt");
const mysql = require("mysql");
require("dotenv").config({path:"./config/.env"});

const jwt = require("jsonwebtoken");
const { header } = require("../headers");

const connexion = mysql.createConnection({
    host: "localhost",
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
});


module.exports.loginController = (req,res)=>{
    const data = [];
    req.on('data', (chunk)=>{
        data.push(chunk); 
    }).on('end', ()=>{
        
        const bufferData = Buffer.concat(data);
        const { email, password } = JSON.parse(bufferData.toString('utf-8'));
        res.writeHead(200,header);
        connexion.query("SELECT email,password, prenom FROM utilisateurs WHERE email = ?",[email],(err,result)=>{
            result = JSON.parse(JSON.stringify(result));
            if(result.length == 0){
                res.end(JSON.stringify({succcess:false,message:"Aucun compte ne correspond à l'email entré"}));
            }
            else{
                bcrypt.compare(password,result[0].password,(err,same)=>{
                    //if(err) throw err;
                    if(!same) res.end(JSON.stringify({succcess:false,message:"Le mot de passe saisi est incorrect"}));
                    else{
                        
                        let token = jwt.sign(
                            result[0],
                            process.env.JWTSECRETKEY,
                            { expiresIn : 3000 } );
                        res.end(JSON.stringify({"success":true,"message":`Bienvenue ${result[0].prenom}. Vous êtes authentifier`}));
                    }
                });
            }
        });

    });
}

