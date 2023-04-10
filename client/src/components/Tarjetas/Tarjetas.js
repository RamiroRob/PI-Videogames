import React from 'react'
import Tarjeta from '../Tarjeta/Tarjeta'
import s from './Tarjetas.module.css'

export default function Tarjetas(props) {
    const { info } = props

    return (
        <div className={s.cardContainer}>
            {info.map(v =>
                <Tarjeta 
                    key={v.nombre}
                    nombre={v.nombre}
                    imagen={v.imagen}
                    genres={v.genres.map(g => g.name).join(', ')}
                />)}
        </div>
    )
}
