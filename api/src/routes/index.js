const { Router } = require('express');

const { getVideogames, getOneVideogame, getVideogamesByName } = require('../controllers/Videogame.controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", getVideogames)
router.get("/videogames/:idVideoGame", getOneVideogame)

router.get("/videogames/name", getVideogamesByName)

router.post("/videogames", (req, res) => {
    // toda la info va a pasar por body
    res.send("hola");
})

router.get("/genres", (req, res) => {
    res.send("hola");
})





module.exports = router;
