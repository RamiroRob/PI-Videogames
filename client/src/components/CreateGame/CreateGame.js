import React, { useEffect, useState } from 'react'
import s from './CreateGame.module.css'

export default function CreateGame() {

    const [data, setData] = useState({
        nombre: '',
        imagen: '',
        descripcion: '',
        fecha_lanzamiento: '',
        rating: '',
        plataformas: [],
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


    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }


    // Tuve que crear uno nuevo para que funcione con array, usando split
    const handleChangePlataformas = (e) => {
        const input = e.target.value
        const resultado = input.split(',')
        setData((prevData) => ({
            ...prevData,
            plataformas: resultado
        }))
    }


    // Para cambiar el estado de los generos y mandarlo en el form
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



    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/videogames', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }


    return (
        <div>
            <form className={s.form} onSubmit={handleSubmit} >
                <label>Nombre</label>
                <input type="text" name="nombre" value={data.nombre} onChange={handleChange} />
                <label>Imagen</label>
                <input type="text" name="imagen" value={data.imagen} onChange={handleChange} />
                <label>Descripcion</label>
                <input type="text" name="descripcion" value={data.descripcion} onChange={handleChange} />
                <label>Fecha de lanzamiento</label>
                <input type="text" name="fecha_lanzamiento" value={data.fecha_lanzamiento} onChange={handleChange} />
                <label>Rating</label>
                <input type="text" name="rating" value={data.rating} onChange={handleChange} />
                <label>Plataformas</label>
                <input type="text" name="plataformas" value={data.plataformas} onChange={handleChangePlataformas} />

                <label>Generos</label>
                <select
                    multiple
                    name="generos"
                    onChange={handleSelectChange}
                    >

                    {genres?.map((genre,index )=> 
                    <option value={genre} 
                    key={index}
                    >{genre}</option>)}
                </select>

                <button type="submit">Crear</button>
            </form>
        </div>
    )
}
