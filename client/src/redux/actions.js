export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';
export const SELECT_API_OR_DB = 'SELECT_API_OR_DB';
export const SELECT_GENRE = 'SELECT_GENRE';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const RESET_SEARCH_RESULTS = 'RESET_SEARCH_RESULTS';


export const getVideogames = (payload) => {
    return {
        type: GET_VIDEOGAMES,
        payload
    }
}

/* -------------------------------------------------------------- */
/* Filtros                                                        */
/* -------------------------------------------------------------- */

export const selectApiOrDb = (payload) => {
    return {
        type: SELECT_API_OR_DB,
        payload
    }
}

export const selectGenre = (payload) => {
    return {
        type: SELECT_GENRE,
        payload
    }
}

/* -------------------------------------------------------------- */
/* Orden                                                          */
/* -------------------------------------------------------------- */

export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

/* -------------------------------------------------------------- */
/* Search Bar                                                     */
/* -------------------------------------------------------------- */

export function setSearchResults(results) {
    return {
        type: SET_SEARCH_RESULTS,
        payload: results,
    };
}

export function resetSearchResults() {
  return {
    type: RESET_SEARCH_RESULTS,
  };
}


