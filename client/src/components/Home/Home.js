import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Tarjetas from '../Tarjetas/Tarjetas'
import Filters from '../Filters/Filters'

export default function Home() {

  const [game, setGame] = useState('')
  const [games, setGames] = useState([])

  const handleChange = (e) => {
    setGame(e.target.value)
  }

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = () => {
    axios.get('http://localhost:3001/videogames')
      .then(res => res.data)
      .then(res => {
        setGames(res)
      })
  }

  console.log(games)


  return (
    <div>
      {/* Search Bar */}
      <div>
        <input type="text" placeholder="Buscar videojuego" value={game} onChange={handleChange} />
        <button>Search</button>
      </div>

      {/* Filtros */}
    <Filters/>

      {/* Listado de cards con videogames */}
      <Tarjetas info={games} />
      <div>

      </div>

    </div>
  )
}
