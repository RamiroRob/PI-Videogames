import React from 'react'

export default function Tarjeta(props) {

    const {nombre, imagen, generos} = props
  return (
    <div>
        <h1>{nombre}</h1>
        <img src={imagen} alt={nombre} />
        <h3>{generos}</h3>
    </div>
  )
}
