import React from 'react'
import Tarjeta from '../Tarjeta/Tarjeta'
import s from './Tarjetas.module.css'
import { useSelector } from 'react-redux'

export default function Tarjetas() {
    const videogames = useSelector(state => state.videogames)
    const selectedSource = useSelector(state => state.selectedSource)
    const videogamesFiltered = useSelector(state => state.videogamesFiltered)

    let displayedVideogames = videogames

    if (selectedSource === "API" || selectedSource === "DB") {
        displayedVideogames = videogamesFiltered
    }

    // console.log(videogamesFiltered)
    return (
        <div className={s.cardContainer}>
            {displayedVideogames && displayedVideogames.map(v =>
                <Tarjeta 
                    key={v.id}
                    id = {v.id}
                    nombre={v.nombre}
                    imagen={v.imagen}
                    genres={v.genres?.map(g => g.name).join(', ')}
                />)}
        </div>
    )
}
