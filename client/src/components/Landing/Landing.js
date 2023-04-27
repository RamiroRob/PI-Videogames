import React from 'react'
import { Link } from 'react-router-dom';
import s from './Landing.module.css'

export default function Landing() {
    return (
        <div className={s.landingContainer}>

            <div className = {s.text}>
                <h1 className = {s.titulo}>Henry Videogames PI</h1>
                <h2 className = {s.subtitulo}>Ramiro Roballos</h2>
            </div>
            <Link to="/home">
                <button className = {s.boton}> Ingresar</button>
            </Link>
        </div>
    )
}
