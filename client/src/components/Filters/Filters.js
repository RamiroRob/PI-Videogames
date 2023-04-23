import React, { useState, useEffect } from 'react'
import s from './Filters.module.css'
import { useDispatch } from 'react-redux'
import { orderByName, orderByRating, selectApiOrDb, setSearchResults, resetSearchResults } from '../../redux/actions';
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

    // Tengo que mandar el valor "AMBOS" al store para que ya se cargue, porque sino tiene que esperar hasta que cambie algo para mandar el valor
    useEffect(() => {
        dispatch(selectApiOrDb('AMBOS'));
    }, []);


    const handleDataSource = (e) => {
        dispatch(selectApiOrDb(e.target.value))
    };

    const handleOrderChange = (e) => {
        dispatch(orderByName(e.target.value))
    }

    const handleRatingChange = (e) => {
        dispatch(orderByRating(e.target.value))
    }


    return (

        <div>

            <h3>Todos los juegos</h3>
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
                    <label htmlFor="dropdown">API o DB:</label>
                    <select id="dropdown" onChange={handleDataSource}>
                        <option value="AMBOS">AMBOS</option>
                        <option value="API">API</option>
                        <option value="DB">DB</option>
                    </select>
                </div>


                {/* Orden alfabetico */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">Orden alfabético:</label>
                    <select id="dropdown" onChange={handleOrderChange}>
                        <option value="Elegir opción">Elegir opción</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>

                {/* Orden por rating */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">Orden por rating:</label>
                    <select id="dropdown" onChange={handleRatingChange}>
                        <option value="Elegir opción">Elegir opción</option>
                        <option value="Menor a mayor">Menor a mayor</option>
                        <option value="Mayor a menor">Mayor a menor</option>
                    </select>
                </div>
            </div>
        </div>
    )
}



