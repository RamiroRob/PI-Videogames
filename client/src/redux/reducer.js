import { ORDER_BY_NAME, ORDER_BY_RATING, GET_VIDEOGAMES, SELECT_API_OR_DB, SELECT_GENRE, SET_SEARCH_RESULTS, RESET_SEARCH_RESULTS } from './actions'

const initialState = {
    videogames: [],
    videogamesFiltered: [],
    selectedSource: '',
    selectedGenre: '',
    searchResults: [],
}

/* -------------------------------------------------------------- */
/* Funciones auxiliares                                           */
/* -------------------------------------------------------------- */

const sortByName = (games, order) => {
    return [...games].sort((a, b) => {
        return order === 'A-Z' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
    });
};

const sortByRating = (games, order) => {
    return [...games].sort((a, b) => {
        return order === 'Menor a mayor' ? a.rating - b.rating : b.rating - a.rating;
    });
};

/* -------------------------------------------------------------- */
/* Reducer                                                        */
/* -------------------------------------------------------------- */

export const reducer = (state = initialState, actions) => {
    switch (actions.type) {

        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: actions.payload
            }

        /* -------------------------------------------------------------- */
        /* Orden                                                          */
        /* -------------------------------------------------------------- */

        case ORDER_BY_NAME:
            let sortedVideogames
            let sortedSearchResults

            if (state.selectedSource === "API" || state.selectedSource === "DB") {
                sortedVideogames = sortByName(state.videogamesFiltered, actions.payload);
                sortedSearchResults = state.searchResults.length > 0 ? sortByName(state.searchResults, actions.payload) : [];

                return {
                    ...state,
                    videogamesFiltered: sortedVideogames,
                    searchResults: sortedSearchResults,
                }

            } else {
                sortedVideogames = sortByName(state.videogames, actions.payload);
                sortedSearchResults = state.searchResults.length > 0 ? sortByName(state.searchResults, actions.payload) : [];

                return {
                    ...state,
                    videogames: sortedVideogames,
                    searchResults: sortedSearchResults,
                };
            }

        case ORDER_BY_RATING:
            let sortedByRating
            let sortedSearchByRating

            if (state.selectedSource === "API" || state.selectedSource === "DB") {
                sortedByRating = sortByRating(state.videogamesFiltered, actions.payload);
                sortedSearchByRating = state.searchResults.length > 0 ? sortByRating(state.searchResults, actions.payload) : [];

                return {
                    ...state,
                    videogamesFiltered: sortedByRating,
                    searchResults: sortedSearchByRating,
                }

            } else {
                sortedByRating = sortByRating(state.videogames, actions.payload);
                sortedSearchByRating = state.searchResults.length > 0 ? sortByRating(state.searchResults, actions.payload) : [];

                return {
                    ...state,
                    videogames: sortedByRating,
                    searchResults: sortedSearchByRating,
                };
            }

        /* -------------------------------------------------------------- */
        /* Filtros                                                        */
        /* -------------------------------------------------------------- */

        case SELECT_API_OR_DB:
            if (actions.payload === "AMBOS") {
                return {
                    ...state,
                    selectedSource: actions.payload,
                }
            } else if (actions.payload === "API") {
                return {
                    ...state,
                    selectedSource: actions.payload,
                    videogamesFiltered: [...state.videogames].filter((game) => !isNaN(game.id))
                }
            } else if (actions.payload === "DB") {
                return {
                    ...state,
                    selectedSource: actions.payload,
                    videogamesFiltered: [...state.videogames].filter((game) => isNaN(game.id))
                }
            }
            return state;

        case SELECT_GENRE:
            return {
                ...state,
                selectedGenre: actions.payload,
            }

        /* -------------------------------------------------------------- */
        /* Search                                                         */
        /* -------------------------------------------------------------- */

        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: actions.payload,
            };

        case RESET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: [],
            };

        default:
            return state
    }
}


