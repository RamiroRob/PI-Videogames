import { SELECT_API_OR_DB, ORDER_BY_NAME, ORDER_BY_RATING, GET_VIDEOGAMES } from './actions'

const initialState = {
    videogames: [],
}

export const reducer = (state = initialState, actions) => {
    switch (actions.type) {

        case GET_VIDEOGAMES:
            return {
                videogames: actions.payload
            }
        case SELECT_API_OR_DB:
            return {
                ...state,
            }

        case ORDER_BY_NAME:
            if (actions.payload === 'A-Z') {
                return {
                    videogames: [...state.videogames].sort((a, b) =>
                        a.nombre.localeCompare(b.nombre)
                    ),
                };
            } else if (actions.payload === 'Z-A') {
                return {
                    videogames: [...state.videogames].sort((a, b) =>
                        b.nombre.localeCompare(a.nombre)
                    ),
                };
            }
            return state;


        case ORDER_BY_RATING:
            if (actions.payload === 'Menor a mayor') {
                return {
                    videogames: [...state.videogames].sort(
                        (a, b) => a.rating - b.rating
                    ),
                };
            } else if (actions.payload === 'Mayor a menor') {
                return {
                    videogames: [...state.videogames].sort(
                        (a, b) => b.rating - a.rating
                    ),
                };
            }
            return state;

        default:
            return { ...state }
    }

}


    // case ADD_CHAR:
    //     return {
    //         ...state,
    //         myFavorites: [...state.myFavorites, actions.payload]
    //     }