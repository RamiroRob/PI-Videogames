import { ORDER_BY_NAME, ORDER_BY_RATING, GET_VIDEOGAMES, SELECT_API_OR_DB, SET_SEARCH_RESULTS, SEARCH_BY_NAME, RESET_SEARCH_RESULTS } from './actions'

const initialState = {
    videogames: [],
    videogamesFiltered: [],
    selectedSource: '',
    searchResults: [],
}

// Funciones auxiliares para hacer mas legible el reducer
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


export const reducer = (state = initialState, actions) => {
    switch (actions.type) {

        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: actions.payload
            }

        case ORDER_BY_NAME:
            let sortedVideogames = sortByName(state.videogames, actions.payload);
            let sortedSearchResults = state.searchResults.length > 0 ? sortByName(state.searchResults, actions.payload) : [];

            return {
                ...state,
                videogames: sortedVideogames,
                searchResults: sortedSearchResults,
            };


        case ORDER_BY_RATING:
            let sortedByRating = sortByRating(state.videogames, actions.payload);
            let sortedSearchByRating = state.searchResults.length > 0 ? sortByRating(state.searchResults, actions.payload) : [];

            return {
                ...state,
                videogames: sortedByRating,
                searchResults: sortedSearchByRating,
            };

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


        case SEARCH_BY_NAME:
            return {
                ...state,
                videogamesFiltered: actions.payload,
            };

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


