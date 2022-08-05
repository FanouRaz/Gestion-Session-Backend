const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { header } = require("../headers");
require("dotenv").config({ path: "./config/.env" });

const connexion = mysql.createConnection({
  host: "localhost",
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DB,
});
connexion.connect((err) => {
  if (err) throw err;
  console.log("Connecté à la base de donnée");
});

module.exports.signUpController = (req, res) => {
  res.writeHead(200, header);
  const data = [];
  req
    .on("data", (chunk) => {
      data.push(chunk);
    })
    .on("end", async () => {
      const bufferData = Buffer.concat(data);
      const { nom, prenom, email, password } = JSON.parse(
        bufferData.toString("utf-8")
      );

      //Cryptage du mot de passe entré avant de l'envoyer dans la base de donnée
      try {
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);

        let sql =
          "INSERT INTO utilisateurs (nom,prenom,email,password) VALUES (?,?,?,?)";
        connexion.query(
          sql,
          [nom, prenom,email, hashPassword],
          (err, result) => {
            if (err) throw err;
            res.end(
              JSON.stringify({ success: true, message: "Utilisateur créer" })
            );
          }
        );
      } catch (err) {
        console.log(err);
      }
    });
};
