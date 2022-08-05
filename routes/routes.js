const { home } = require("./home.route");
const { login } = require("./login.route");
const { signup } = require("./signup.route");

module.exports.routes = (req,res)=>{
   login(req,res);
   home(req,res);
   signup(req,res);
};