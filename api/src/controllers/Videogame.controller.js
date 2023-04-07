const { Videogame } = require('../db.js')
const axios = require('axios');
const { Op } = require("sequelize");

const getVideogames = async (req, res) => {
    let resultsAPI = []

    //Hago 5 llamadas a la API para obtener 100 juegos
    const videogamesPage1 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
    const videogamesPage2 = videogamesPage1?.data.next ? await axios.get(videogamesPage1.data.next) : null
    const videogamesPage3 = videogamesPage2?.data.next ? await axios.get(videogamesPage2.data.next) : null
    const videogamesPage4 = videogamesPage3?.data.next ? await axios.get(videogamesPage3.data.next) : null
    const videogamesPage5 = videogamesPage4?.data.next ? await axios.get(videogamesPage4.data.next) : null

    resultsAPI = [...videogamesPage1?.data.results, ...videogamesPage2?.data.results, ...videogamesPage3?.data.results, ...videogamesPage4?.data.results, ...videogamesPage5?.data.results]

    //Formateo los resultados de la API
    resultsAPI = resultsAPI.map(v => {
        return {
            id: v.id,
            nombre: v.name,
            imagen: v.background_image,
            fecha_lanzamiento: v.released,
            rating: v.rating,
            plataforma: v.platforms,
            genres: v.genres // TODO: despues vemos si lo eliminamos
        }
    })

    // Pedido a la base de datos
    const videogamesDB = await Videogame.findAll()

    // Concateno los resultados de la API con los de la base de datos
    results = [...resultsAPI, ...videogamesDB]

    console.log(results.length)
    // Envio los resultados
    res.status(200).json(results)
}


const getOneVideogame = async (req, res) => {
    const { idVideoGame } = req.params

    try {

        // Pedido a la base de datos
        const videogameDB = await Videogame.findByPk(idVideoGame)
        if (videogameDB) return res.status(200).json(videogameDB)
        // TODO: ver el tema de genres

    } catch (err) {
        console.log("No se encontro en la DB, buscando en la API...")
        // res.status(404).json({ message: "No se encontro el videojuego", err })
    }

    try {
        // Pedido a la API
        const videogameAPI = await axios.get(`https://api.rawg.io/api/games/${idVideoGame}?key=${process.env.API_KEY}`)
        const initialResult = videogameAPI?.data

        // Formateo el resultado de la API
        const result = {
            id: initialResult.id,
            nombre: initialResult.name,
            descripcion: initialResult.description,
            platformas: initialResult.platforms,
            imagen: initialResult.background_image,
            fecha_lanzamiento: initialResult.released,
            rating: initialResult.rating,
            genres: initialResult.genres, //TODO: ver si despues lo eliminamos
        }

        if (videogameAPI) return res.status(200).json(result)

    } catch (error) {

        res.status(404).json({ message: "No se encontro el videojuego", error })
    }
}

const getVideogamesByName = async (req, res) => {
    const { name } = req.query

    let first15Videogames = []

    try {
        // Pedido a la base de datos
        const videogamesDB = await Videogame.findAll({
            where: {
                nombre: {
                    [Op.iLike]: `%${name}%` //busca coincidencias en cualquier parte del nombre, ignorando mayusculas y minusculas
                }
            }
        })
        if (videogamesDB) first15Videogames = videogamesDB.slice(0, 15)
    }
    catch (err) {
        console.log("No se encontro en la DB, buscando en la API...")
    }

    while (first15Videogames.length < 15) {

        try {

            // Pedido a la API
            const videogamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${process.env.API_KEY}`)
            const initialResults = videogamesAPI?.data.results

            // Formateo el resultado de la API
            /*         first15Videogames = initialResults.map(v => {
                        return {
                            id: v.id,
                            nombre: v.name,
                            imagen: v.background_image,
                            fecha_lanzamiento: v.released,
                            rating: v.rating,
                            plataforma: v.platforms,
                            genres: v.genres // TODO: despues vemos si lo eliminamos
                        }
                    }) */

            if (videogamesAPI) return res.status(200).json(first15Videogames)

        }
        catch (err) {
            res.status(404).json({ message: "No se encontro el videojuego", err })
        }
    }
}

module.exports = {
    getVideogames,
    getOneVideogame,
    getVideogamesByName
}