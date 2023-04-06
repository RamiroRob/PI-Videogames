const { Videogame } = require('../db.js')
const axios = require('axios');

const getVideogames = async (req, res) => {
    let results = []

    //Hago 5 llamadas a la API para obtener 100 juegos
    const videogamesPage1 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
    const videogamesPage2 = videogamesPage1?.data.next ? await axios.get(videogamesPage1.data.next) : null
    const videogamesPage3 = videogamesPage2?.data.next ? await axios.get(videogamesPage2.data.next) : null
    const videogamesPage4 = videogamesPage3?.data.next ? await axios.get(videogamesPage3.data.next) : null
    const videogamesPage5 = videogamesPage4?.data.next ? await axios.get(videogamesPage4.data.next) : null
    
    
    // Pedido a la base de datos
    const videogamesDB = await Videogame.findAll()
    
    // Concateno los resultados de la API con los de la base de datos
    results = [...videogamesPage1?.data.results, ...videogamesPage2?.data.results, ...videogamesPage3?.data.results, ...videogamesPage4?.data.results, ...videogamesPage5?.data.results, ...videogamesDB]
    
    console.log(results.length)
    // Envio los resultados
    res.status(200).json(results)
}

const getOneVideogame = async (req, res) => {
    const { idVideoGame } = req.params
    

}

module.exports = {
    getVideogames,
    getOneVideogame
}