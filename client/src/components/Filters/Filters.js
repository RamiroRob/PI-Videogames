import React, { useState } from 'react'
import s from './Filters.module.css'
import { useDispatch } from 'react-redux'
import { orderByName, orderByRating } from '../../redux/actions';

export default function Filters() {

    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState('API');
    const [ordenAlfabetico, setOrdenAlfabetico] = useState('Elegir opción');
    const [rating, Setrating] = useState('Elegir opción');

    const handleSelectedChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleOrderChange = (e) => {
        setOrdenAlfabetico(e.target.value);
        dispatch(orderByName(e.target.value))
    }

    const handleRatingChange = (e) => {
        Setrating(e.target.value);
        dispatch(orderByRating(e.target.value))
    }
console.log(rating, ordenAlfabetico, selectedOption)
    return (

        <div>

            <h3>Filtros para la búsqueda</h3>
            <hr/>
            
            <div className={s.filtersContainer}>

                {/* API or DB */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">API o DB:</label>
                    <select id="dropdown" value={selectedOption} onChange={handleSelectedChange}>
                        <option value="API">API</option>
                        <option value="DB">DB</option>
                    </select>
                </div>


                {/* Orden alfabetico */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">Orden alfabético:</label>
                    <select id="dropdown" value={ordenAlfabetico} onChange={handleOrderChange}>
                        <option value="Elegir opción">Elegir opción</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>

                {/* Orden por rating */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">Orden por rating:</label>
                    <select id="dropdown" value={rating} onChange={handleRatingChange}>
                        <option value="Elegir opción">Elegir opción</option>
                        <option value="Menor a mayor">Menor a mayor</option>
                        <option value="Mayor a menor">Mayor a menor</option>
                    </select>
                </div>
            </div>
        </div>
    )
}



