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
    const searchResults = useSelector(state => state.searchResults);

    const [paginatedVideogames, setPaginatedVideogames] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)


    // Complejizar esta funcion con el segundo filtro gender
    const filterBySource = (games, source) => {
        if (source === "AMBOS") {
            // if gender.length===0
            return games;
            // else
            // games.filter(videogame => videogame.gender === gender)
        } else if (source === "API") {
            return games.filter((game) => !isNaN(game.id));
        } else if (source === "DB") {
            return games.filter((game) => isNaN(game.id));
        }
    };
    
    useEffect(() => {
        // Si se busco algo, se reemplaza displayedVideogames por SearchResults, y ademas se le aplica el filtro de source
        setIsLoading(true)
        let displayedVideogames = videogames

        if (searchResults.length > 0) {
            displayedVideogames = filterBySource(searchResults, selectedSource);
        } else if (selectedSource === "API" || selectedSource === "DB") {
            displayedVideogames = videogamesFiltered
        } else {
            displayedVideogames = videogames
        }

        const startIndex = (page - 1) * 15
        const endIndex = startIndex + 15
        const paginatedData = displayedVideogames?.slice(startIndex, endIndex)
        setPaginatedVideogames(paginatedData)

        // Para que el spinner desaparezca despues de 5 segundos. Con el ciclo de vida del componente esta pasando algo raro
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)
            
    }, [page, videogames, videogamesFiltered, selectedSource, searchResults])
    
    return (
        <div>
            <div className={s.cardContainer}>
                { isLoading && paginatedVideogames?.length === 0 ? (
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
