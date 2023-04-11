import React, { useState } from 'react'

export default function Filters() {
    const [selectedOption, setSelectedOption] = useState('API');
    const [order, setOrder] = useState('A-Z');

    const handleSelectedChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    }

    return (
        <div>
            {/* API or DB */}
            <div>
                <label htmlFor="dropdown">API o DB:</label>
                <select id="dropdown" value={selectedOption} onChange={handleSelectedChange}>
                    <option value="option1">API</option>
                    <option value="option2">DB</option>
                </select>
            </div>


            {/* Order */}
            <div>
                <label htmlFor="dropdown">Order:</label>
                <select id="dropdown" value={order} onChange={handleOrderChange}>
                    <option value="option1">A-Z</option>
                    <option value="option2">Z-A</option>
                </select>
            </div>
        </div>
        )   
    }
    


