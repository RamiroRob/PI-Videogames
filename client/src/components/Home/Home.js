import React, { useState } from 'react'


export default function Home() {

  const [game, setGame] = useState('')

  const handleChange = (e) => {
    setGame(e.target.value)
  }
  
  return (
    <div>
      {/* Search Bar */}
      <div>
        <input type="text" placeholder="Buscar videojuego" value={game} onChange={handleChange}/>
        <button>Search</button>
      </div>

      {/* Listado de cards con videogames */}

      <div>
        
      </div>

    </div>
  )
}
