export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';
export const SELECT_API_OR_DB = 'SELECT_API_OR_DB';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';


export const getVideogames = (payload) => {
    return {
        type: GET_VIDEOGAMES,
        payload
    }
}

export const selectApiOrDb = (payload) => {
    return {
        type: SELECT_API_OR_DB,
        payload
    }
}

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


