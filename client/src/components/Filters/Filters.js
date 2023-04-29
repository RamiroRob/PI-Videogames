import React, { useState, useEffect } from 'react'
import s from './Filters.module.css'
import { useDispatch } from 'react-redux'
import { orderByName, orderByRating, selectApiOrDb, selectGenre, setSearchResults, resetSearchResults } from '../../redux/actions';
import axios from 'axios';


export default function Filters() {

    const dispatch = useDispatch()

    
    
    /* ----------------------------------- */
    /* Search Bar                          */
    /* ----------------------------------- */
    
    const [name, setName] = useState('');
    
    const handleSearchChange = (e) => {
        setName(e.target.value);
    };
    
    const handleSearch = async () => {
        
        try {
            const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            dispatch(setSearchResults(response.data));
            
        } catch (error) {
            console.error('Error buscando videojuegos', error);
        };
    }
    
    const handleResetSearch = () => {
        dispatch(resetSearchResults());
        setName('');
    };
    
    /* ----------------------------------- */
    /* Filtros                             */
    /* ----------------------------------- */
    
    const [genres, setGenres] = useState([])
    
    useEffect(() => {
        // Tengo que mandar el valor "AMBOS" y "TODOS" al store para que ya se cargue, porque sino tiene que esperar hasta que cambie algo para mandar el valor.
        dispatch(selectApiOrDb("AMBOS"));
        dispatch(selectGenre("TODOS"))
   
        async function getGenre() {
            const response = await fetch('http://localhost:3001/genres')
            const response2 = await response.json()
            const allGenres = response2.map(genre => genre.name)
            setGenres(allGenres)
            // console.log(await allGenres)
        }
        getGenre()

    }, [])
    
    
    //Antes tenia estados locales para todo, pero simplifique el codigo y manejo los estados directo en el reducer. Por eso no hay mas estados locales, solo los que necesito para que se cargue el valor "Ambos" en el select de API o DB.
    const handleDataSource = (e) => {
        dispatch(selectApiOrDb(e.target.value))
    };

    const handleGenre = (e) => {
        dispatch(selectGenre(e.target.value))
    };

    const handleOrderChange = (e) => {
        dispatch(orderByName(e.target.value))
    }

    const handleRatingChange = (e) => {
        dispatch(orderByRating(e.target.value))
    }


    return (

        <div>

            <h1>Buscar juegos</h1>
            <hr />
            {/* ------------------------------------------- */}
            {/* Search Bar                                  */}
            {/* ------------------------------------------- */}
            <div className={s.container}>
                <input
                    className={s.searchInput}
                    type="text"
                    placeholder="Buscar videojuego"
                    value={name}
                    onChange={handleSearchChange}
                />
                    <button onClick={handleSearch} className={s.searchButton}>
                        Buscar
                    </button>
                    <button onClick={handleResetSearch} className={s.searchButton}>
                        Reset
                    </button>
            </div>
                {/* ------------------------------------------- */}
                {/* Filtros                                     */}
                {/* ------------------------------------------- */}

            <div className={s.container}>

                {/* API or DB */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">Api or Db:</label>
                    <select id="dropdown1" onChange={handleDataSource} >
                        <option value="AMBOS">Ambos</option>
                        <option value="API">Api</option>
                        <option value="DB">Db</option>
                    </select>
                </div>

                {/* Género */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">Género</label>
                        <select name="generos" onChange={handleGenre}>
                            <option value="TODOS">Todos</option>
                            {genres?.map((genre, index) =>
                                <option value={genre} key={index} >{genre}</option>)}
                        </select>
                </div> 

                {/* ------------------------------------------- */}
                {/* Orden                                       */}
                {/* ------------------------------------------- */}


                {/* Orden alfabetico */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">Orden alfabético:</label>
                    <select id="dropdown2" onChange={handleOrderChange}>
                        <option value="Elegir opción">Elegir opción</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>

                {/* Orden por rating */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">Orden por rating:</label>
                    <select id="dropdown3" onChange={handleRatingChange}>
                        <option value="Elegir opción">Elegir opción</option>
                        <option value="Menor a mayor">Menor a mayor</option>
                        <option value="Mayor a menor">Mayor a menor</option>
                    </select>
                </div>
            </div>
        </div>
    )
}



