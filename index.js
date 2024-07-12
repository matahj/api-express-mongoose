require("dotenv").config();

const express = require("express");
const app = express();

app.get("/hola", function(req, res){
    res.send("Hola desde Express.")
});

app.listen(process.env.PORT_SERVER, function () {
  console.log("Servidor de Express en el puerto " + process.env.PORT_SERVER);
});

