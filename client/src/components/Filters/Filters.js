import React, { useState } from 'react'
import s from './Filters.module.css'
import { useDispatch } from 'react-redux'
import { orderByName, orderByRating, selectApiOrDb, setSearchResults, resetSearchResults } from '../../redux/actions';
import axios from 'axios';

export default function Filters() {

    const dispatch = useDispatch()

    // Add a new state variable for the search input
    const [game, setGame] = useState('');

    // Add a new function to handle search button click
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/videogames?name=${game}`);

            dispatch(setSearchResults(response.data));
            console.log("Search response:", response.data);
        } catch (error) {
            console.error('Error fetching videogames', error);
        }
    };

    // Add a new function to handle search input change
    const handleSearchChange = (e) => {
        setGame(e.target.value);
    };
    const handleDataSource = (e) => {
        dispatch(selectApiOrDb(e.target.value))
    };

    const handleOrderChange = (e) => {
        dispatch(orderByName(e.target.value))
    }

    const handleRatingChange = (e) => {
        dispatch(orderByRating(e.target.value))
    }

    const handleResetSearch = () => {
        dispatch(resetSearchResults());
    };

    return (

        <div>

            <h3>Todos los juegos</h3>
            <hr />

            {/* Add the search functionality here */}
            <div className={s.searchContainer}>
                <input
                    className={s.searchInput}
                    type="text"
                    placeholder="Buscar videojuego"
                    value={game}
                    onChange={handleSearchChange}
                />
                <button className={s.searchButton} onClick={handleSearch}>
                    Buscar
                </button>
                <button className={s.resetButton} onClick={handleResetSearch}>
                    Mostrar todos los juegos
                </button>
            </div>

            <div className={s.filtersContainer}>

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



