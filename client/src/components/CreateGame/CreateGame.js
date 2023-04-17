import React, { useEffect, useState } from 'react'
import s from './CreateGame.module.css'

export default function CreateGame() {

    const [data, setData] = useState({
        nombre: '',
        imagen: '',
        descripcion: '',
        fecha_lanzamiento: '',
        rating: '',
        plataformas: '',
        generos: [],
    })

    const [genres, setGenres] = useState([])

    useEffect(() => {
        async function getGenre() {
            const response = await fetch('http://localhost:3001/genres')
            const response2 = await response.json()
            const allGenres = response2.map(genre => genre.nombre)
            setGenres(allGenres)
        }
        getGenre()
    }, [])

    console.log("All", genres)
    console.log("selected", data.generos)


    const handleSelectChange = (e) => {
        const options = e.target.options
        const selectedGenres = []
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedGenres.push(options[i].value)
            }
        }
        setData((prevData) => ({ 
            ...prevData, 
            generos: [...selectedGenres]
        }))
    }

    return (
        <div>
            <form className={s.form}>
                <label>Nombre</label>
                <input type="text" name="nombre" />
                <label>Imagen</label>
                <input type="text" name="imagen" />
                <label>Descripcion</label>
                <input type="text" name="descripcion" />
                <label>Fecha de lanzamiento</label>
                <input type="text" name="fecha_lanzamiento" />
                <label>Rating</label>
                <input type="text" name="rating" />
                <label>Plataformas</label>
                <input type="text" name="plataformas" />

                <label>Generos</label>
                <select
                    multiple
                    name="generos"
                    onChange={handleSelectChange}>

                    {genres?.map((genre,index )=> 
                    <option value={genre} 
                    key={index}
                    selected={genres.includes(genre)}
                    >{genre}</option>)}
                </select>

                <button type="submit">Crear</button>
            </form>
        </div>
    )
}
