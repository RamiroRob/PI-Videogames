import React from 'react'
import s from './Tarjeta.module.css'
import { Link } from 'react-router-dom'

export default function Tarjeta(props) {

  const { nombre, imagen, genres, id } = props

  return (
    <div className={s.card}>
      <Link to={`/videogame/${id}`}>
        <h1 className={s.cardTitle}>{nombre}</h1>
        <img src={imagen} alt={nombre} />
        <h3 className={s.cardDescription}>{genres}</h3>
      </Link>
    </div>
  )
}
