import React from 'react'
import { Link } from 'react-router-dom';
import s from './Landing.module.css'

export default function Landing() {
    return (
        <div className={s.landingContainer}>

            <div className = {s.text}>
                <h1>Henry Videogames PI</h1>
                <h2>Ramiro Roballos</h2>
            </div>
            <Link to="/home">
                <button> Ingresar</button>
            </Link>
        </div>
    )
}
