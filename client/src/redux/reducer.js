import { ORDER_BY_NAME, ORDER_BY_RATING, GET_VIDEOGAMES, SELECT_SOURCE, SELECT_API_OR_DB } from './actions'

const initialState = {
    videogames: [],
    videogamesFiltered: [],
    selectedSource: '',
}

export const reducer = (state = initialState, actions) => {
    switch (actions.type) {

        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: actions.payload
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

        default:
            return state 
    }

}


  