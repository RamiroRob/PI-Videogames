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
    const selectedGenre = useSelector(state => state.selectedGenre)

    const [paginatedVideogames, setPaginatedVideogames] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)


    /* -------------------------------------------------------------- */
    /* Funciones auxiliares para manejar distintos casos por filtro   */
    /* -------------------------------------------------------------- */


    // Esta funcion filterBySource la uso para filtrar los resultados de la busqueda, ya que me traigo searchResults. Si estoy viendo todos los juegos, no hace falta aplicar la funcion porque ya tengo la logica en el reducer (asi de paso practique poner logica en el reducer y en el componente)
    const filterBySource = (games, source) => {

        if (source === "AMBOS") {
            return games;
 
        } else if (source === "API") {
                return games.filter((game) => !isNaN(game.id));

        } else if (source === "DB") {
                return games.filter((game) => isNaN(game.id));
        }
    };

    const filterByGenre = (games, genre) => {

        if (genre === "TODOS") {
            return games
            
        } else {
            return games.filter(game => game.genres?.some(g => g.name === genre))
        }
    }

    // console.log(filterByGenre(videogames, selectedGenre))


    /* -------------------------------------------------------------- */
    /* Decidir que se muestra segun filtros y busqueda                */
    /* -------------------------------------------------------------- */
    useEffect(() => {
    
        setIsLoading(true)
        let displayedVideogames = videogames

        if (searchResults.length > 0) {
            displayedVideogames = filterBySource(searchResults, selectedSource);
            displayedVideogames = filterByGenre(displayedVideogames, selectedGenre);

        } else if (selectedSource === "API" || selectedSource === "DB") {
                // displayedVideogames = videogamesFiltered 
                displayedVideogames = filterByGenre(videogamesFiltered, selectedGenre)

        } else {
            displayedVideogames = filterByGenre(videogames, selectedGenre)

        }

        /* -------------------------------------------------------------- */
        /* Paginacion                                                     */
        /* -------------------------------------------------------------- */
        const startIndex = (page - 1) * 15
        const endIndex = startIndex + 15
        const paginatedData = displayedVideogames?.slice(startIndex, endIndex)
        setPaginatedVideogames(paginatedData)

        // Para que el spinner desaparezca despues de 5 segundos. Con el ciclo de vida del componente esta pasando algo raro asi que puse esta solucion temporal con setTimeout
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)

    }, [page, videogames, videogamesFiltered, selectedSource, searchResults, selectedGenre])

    // console.log(filterByGenre(paginatedVideogames, selectedGenre))

    return (
        <div>
            <div className={s.cardContainer}>
                {isLoading && paginatedVideogames?.length === 0 ? (
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
