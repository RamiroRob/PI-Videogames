import React from 'react'
import Tarjeta from '../Tarjeta/Tarjeta'

export default function Tarjetas(props) {
    const { info } = props

    return (
        <div>
            {info.map(v =>
                <Tarjeta key={v.nombre}
                    nombre={v.nombre}
                    imagen={v.imagen}
                    generos={v.generos}
                />)}
        </div>
    )
}
