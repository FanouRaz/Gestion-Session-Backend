const { signUpController } = require("../controller/signup.controller");

module.exports.signup = (req,res)=>{
    if(req.url === '/api/signup/' && req.method === "POST"){
       signUpController(req,res);    
    }
};