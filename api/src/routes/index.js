const { Router } = require('express');

const { getVideogames, getOneVideogame, getVideogamesByName, createVideogame, getGenres } = require('../controllers/Videogame.controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", (req,res) => {
   if(req.query.name) getVideogamesByName(req,res)
    else getVideogames(req,res)
}) 
    
router.get("/videogames/:idVideoGame", getOneVideogame)

// router.get("/videogames/name", getVideogamesByName)

router.post("/videogames", createVideogame)

router.get("/genres",getGenres)





module.exports = router;
