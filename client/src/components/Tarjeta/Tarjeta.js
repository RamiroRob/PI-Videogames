import React from 'react'
import s from './Tarjeta.module.css'

export default function Tarjeta(props) {

    const {nombre, imagen, genres} = props
    console.log(genres)
  return (
    <div className={s.card}>
        <h1 className={s.cardTitle}>{nombre}</h1>
        <img src={imagen} alt={nombre} />
        <h3 className={s.cardDescription}>{genres}</h3>
    </div>
  )
}
