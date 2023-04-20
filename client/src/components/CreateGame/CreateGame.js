import React, { useEffect, useState } from 'react'
import s from './CreateGame.module.css'
import { required, minLength, isRating } from '../../utils/formValidation'
import { all } from 'axios'

export default function CreateGame() {

    const [errors, setErrors] = useState({})

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
            console.log(await allGenres)
        }
        getGenre()
        
    }, [])


    const handleChange = (e) => {

        const { name, value } = e.target
        let error;

        switch (name) {
            case 'nombre':
                error = !required(value) ? 'Name is required' : null;
                break;
            case 'descripcion':
                error = !minLength(5)(value) ? 'La descripción debe tener al menos 5 caracteres' : null;
                break;
            case 'rating':
                error = !isRating(value) ? 'El rating debe ser un número entre 0 y 5' : null;
                break;
            default:
                error = null;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));

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

            <h3>Crear un videojuego</h3>
            <hr />

            <div  className={s.formContainer}>

            <form className={s.form} onSubmit={handleSubmit} >

                <div className={s.formGroup}>
                <label>Nombre</label>
                <input type="text" name="nombre" value={data.nombre} onChange={handleChange} />
                {errors.nombre && <p className={s.error}>{errors.nombre}</p>}
                </div>

                <div className={s.formGroup}>
                <label>Imagen</label>
                <input type="text" name="imagen" value={data.imagen} onChange={handleChange} />
                </div>

                <div className={s.formGroup}>
                <label>Descripcion</label>
                <input type="text" name="descripcion" value={data.descripcion} onChange={handleChange} />
                {errors.descripcion && <p className={s.error}>{errors.descripcion}</p>}
                </div>

                <div className={s.formGroup}>
                <label>Fecha de lanzamiento</label>
                <input type="text" name="fecha_lanzamiento" value={data.fecha_lanzamiento} onChange={handleChange} />
                </div>


                <div className={s.formGroup}>
                <label>Rating</label>
                <input type="text" name="rating" value={data.rating} onChange={handleChange} />
                {errors.rating && <p className={s.error}>{errors.rating}</p>}
                </div>


                <div className={s.formGroup}>
                <label>Plataformas</label>
                <input type="text" name="plataformas" value={data.plataformas} onChange={handleChangePlataformas} />
                </div>

                <div className={s.formGroup}>
                <label>Generos</label>
                <select
                    multiple
                    name="generos"
                    onChange={handleSelectChange}
                >

                    {genres?.map((genre, index) =>
                        <option value={genre}
                            key={index}
                        >{genre}</option>)}
                </select>
                </div>

                <button type="submit">Crear</button>
            </form>
            </div>
        </div>
    )
}
