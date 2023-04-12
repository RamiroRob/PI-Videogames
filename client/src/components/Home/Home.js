import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Tarjetas from '../Tarjetas/Tarjetas'
import Filters from '../Filters/Filters'
import SearchBar from '../SearchBar/SearchBar'
import { getVideogames } from '../../redux/actions'

export default function Home() {

  const dispatch = useDispatch()
  const videogames = useSelector(state => state.videogames)

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = () => {
    axios.get('http://localhost:3001/videogames')
      .then(res => res.data)
      .then(res => {
        dispatch(getVideogames(res))
      })
  }


  //console.log(videogames) // TODO: eliminar videogames
  return (
    <div>
      <SearchBar />
      <Filters />
      <Tarjetas info={videogames} />

    </div>
  )
}
