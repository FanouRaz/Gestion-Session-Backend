const { homeController } = require("../controller/home.controller");

module.exports.home = (req,res)=>{
    if(req.url === "/api/"){
       homeController(req,res);
    }
};

