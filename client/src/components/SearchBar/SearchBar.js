import React, { useState } from 'react'
import axios from 'axios'
import Tarjeta from '../Tarjeta/Tarjeta'
import s from './SearchBar.module.css'

export default function SearchBar() {

    const [game, setGame] = useState('')
    const [results, setResults] = useState([])

    const handleChange = (e) => {
        setGame(e.target.value)
    }

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/videogames?name=${game}`)
            setResults(response.data)
        } catch (error) {
            console.error("Error fetching videogames", error)
        }
    }

    return (
        <div>
            <h3>Búsqueda de juegos por nombre</h3>
            <hr />

            {/* Seach Bar */}
            <div className={s.searchContainer}>
                <input
                    className={s.searchInput}
                    type="text"
                    placeholder="Buscar videojuego"
                    value={game}
                    onChange={handleChange} />
                <button
                    className={s.searchButton}
                    onClick={handleSearch}>Search</button>
            </div>

            {/* Results */}
            <div className={s.cardContainer}>
                {results.map((v, index) => (
                    <Tarjeta
                        key={index}
                        nombre={v.nombre}
                        imagen={v.imagen}
                        genres={v.genres?.map(g => g.name).join(', ')}
                    />
                ))}
            </div>
        </div>
    )
}
