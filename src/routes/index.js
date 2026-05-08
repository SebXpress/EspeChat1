const express = require ('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedln'); //importamos el middleware para verificar si el usuario está logueado
const path = require('path'); //hasta aqui ya tenemos listo el sistema de rutas

const views = path.join(__dirname, "../views");

router.get("/", isLoggedIn,(req,res) => {
    res.sendFile(views + "/index.html")
});

router.get("/register", (req,res) => {
    res.sendFile(views + "/register.html")
});

module.exports = router;
