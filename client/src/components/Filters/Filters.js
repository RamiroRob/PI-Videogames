import React, { useState } from 'react'
import s from './Filters.module.css'

export default function Filters() {
    const [selectedOption, setSelectedOption] = useState('API');
    const [ordenAlfabetico, setOrdenAlfabetico] = useState('A-Z');
    const [rating, Setrating] = useState('Menor a mayor');

    const handleSelectedChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleOrderChange = (e) => {
        setOrdenAlfabetico(e.target.value);
    }

    const handleRatingChange = (e) => {
        Setrating(e.target.value);
    }

    return (

        <div>

            <h3>Filtros para la búsqueda</h3>
            <hr/>
            
            <div className={s.filtersContainer}>

                {/* API or DB */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">API o DB:</label>
                    <select id="dropdown" value={selectedOption} onChange={handleSelectedChange}>
                        <option value="option1">API</option>
                        <option value="option2">DB</option>
                    </select>
                </div>


                {/* Orden alfabetico */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">Orden alfabético:</label>
                    <select id="dropdown" value={ordenAlfabetico} onChange={handleOrderChange}>
                        <option value="option1">A-Z</option>
                        <option value="option2">Z-A</option>
                    </select>
                </div>

                {/* Orden por rating */}
                <div className={s.filterItem}>
                    <label htmlFor="dropdown">Orden por rating:</label>
                    <select id="dropdown" value={rating} onChange={handleRatingChange}>
                        <option value="option1">Menor a mayor</option>
                        <option value="option2">Mayor a menor</option>
                    </select>
                </div>
            </div>
        </div>
    )
}



