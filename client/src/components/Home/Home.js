import React from 'react'
import Tarjetas from '../Tarjetas/Tarjetas'
import Filters from '../Filters/Filters'
import SearchBar from '../SearchBar/SearchBar'



export default function Home() {

  return (
    <div>
      <SearchBar />
      <Filters />
      <Tarjetas />

    </div>
  )
}
