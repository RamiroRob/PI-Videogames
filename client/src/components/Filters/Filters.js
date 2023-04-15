import React from 'react'
import s from './Filters.module.css'
import { useDispatch } from 'react-redux'
import { orderByName, orderByRating, selectApiOrDb } from '../../redux/actions';

export default function Filters() {

    const dispatch = useDispatch()

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

            <h3>Filtros para la búsqueda - Base de datos completa</h3>
            <hr/>
            
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



