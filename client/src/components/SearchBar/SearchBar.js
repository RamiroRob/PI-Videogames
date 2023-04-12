import React, {useState} from 'react'

export default function SearchBar() {

    const [game, setGame] = useState('')

    const handleChange = (e) => {
        setGame(e.target.value)
      }

    return (
        <div>
            <input type="text" placeholder="Buscar videojuego" value={game} onChange={handleChange} />
            <button>Search</button>
        </div>
    )
}
