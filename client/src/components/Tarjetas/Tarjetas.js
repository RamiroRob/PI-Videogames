import React, { useEffect, useState } from 'react'
import Tarjeta from '../Tarjeta/Tarjeta'
import s from './Tarjetas.module.css'
import { useSelector } from 'react-redux'
import Pagination from '../Pagination/Pagination'
import Spinner from '../Spinner/Spinner'

export default function Tarjetas() {
    const videogames = useSelector(state => state.videogames)
    const selectedSource = useSelector(state => state.selectedSource)
    const videogamesFiltered = useSelector(state => state.videogamesFiltered)
    const searchResults = useSelector(state => state.searchResults)
    
    const [paginatedVideogames, setPaginatedVideogames] = useState([])
    const [page, setPage] = useState(1)


    useEffect(() => {

        let displayedVideogames = videogames

        const filterBySource = (games, source) => {
            if (source === "AMBOS") {
                return games;
            } else if (source === "API") {
                return games.filter((game) => !isNaN(game.id));
            } else if (source === "DB") {
                return games.filter((game) => isNaN(game.id));
            }
        };


        if (searchResults.length > 0) {
            displayedVideogames = filterBySource(searchResults, selectedSource);
        } else if (selectedSource === "API" || selectedSource === "DB") {
            displayedVideogames = videogamesFiltered
        }


        console.log("Displayed videogames:", displayedVideogames);
        displayedVideogames = displayedVideogames || [];

        const startIndex = (page - 1) * 15
        const endIndex = startIndex + 15
        const paginatedData = displayedVideogames.slice(startIndex, endIndex)
        setPaginatedVideogames(paginatedData)

    }, [page, videogames, videogamesFiltered, selectedSource, searchResults])


    return (
        <div>
            <div className={s.cardContainer}>
                {paginatedVideogames.length === 0 ? (
                    <div className={s.spinnerContainer}>
                        <Spinner />
                    </div>
                ) : (
                    paginatedVideogames && paginatedVideogames.map(v =>
                        <Tarjeta
                            key={v.id}
                            id={v.id}
                            nombre={v.nombre}
                            imagen={v.imagen}
                            genres={v.genres?.map(g => g.name).join(', ')}
                        />
                    ))
                }
            </div>
            <Pagination page={page} handlePageChange={setPage} />
        </div>
    )
}
