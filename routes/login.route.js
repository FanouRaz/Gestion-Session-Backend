const { loginController } = require("../controller/login.controller");


module.exports.login = (req,res)=>{    
    if(req.url === "/api/login/" && req.method === "POST"){
       loginController(req,res);
    }
};