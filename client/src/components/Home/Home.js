import React, { useState } from 'react'
import Tarjetas from '../Tarjetas/Tarjetas'
import Filters from '../Filters/Filters'
import Menu from '../Menu/Menu'
import CreateGame from '../CreateGame/CreateGame'


export default function Home() {

  const [selectedOption, setSelectedOption] = useState("all")

  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }

  return (
    <div>

      <Menu onOptionClick={handleOptionClick} />
      {selectedOption === 'all' && (
      <div>
      <Filters />
      <Tarjetas />
      </div> 
      )}
      {selectedOption === 'create' && <CreateGame />}


    </div>
  )
}
