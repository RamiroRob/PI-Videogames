const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res) => {
    let results = []

    //Hago 5 llamadas a la API para obtener 100 juegos
    const videogamesPage1 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
    const videogamesPage2 = videogamesPage1?.data.next ? await axios.get(videogamesPage1.data.next) : null
    const videogamesPage3 = videogamesPage2?.data.next ? await axios.get(videogamesPage2.data.next) : null
    const videogamesPage4 = videogamesPage3?.data.next ? await axios.get(videogamesPage3.data.next) : null
    const videogamesPage5 = videogamesPage4?.data.next ? await axios.get(videogamesPage4.data.next) : null
    results = [...videogamesPage1?.data.results, ...videogamesPage2?.data.results, ...videogamesPage3?.data.results, ...videogamesPage4?.data.results, ...videogamesPage5?.data.results]

    res.send(results)
    
    
    const videogamesDB = []
})

router.get("/videogames/:idVideoGame", (req, res) => {
    res.send("hola");
})

router.get("/videogames/", (req, res) => {
    let name = req.query.name
    console.log(name)
    res.send("hola");
})

router.post("/videogames", (req, res) => {
    // toda la info va a pasar por body
    res.send("hola");
})

router.get("/genres", (req, res) => {
    res.send("hola");
})





module.exports = router;
