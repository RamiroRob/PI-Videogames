import {SELECT_API_OR_DB, ORDER_BY_NAME, ORDER_BY_RATING, GET_VIDEOGAMES} from './actions'

const initialState = {
    videogames: [],
}

export const reducer = (state = initialState, actions ) => {
    switch(actions.type) {

        case GET_VIDEOGAMES:
            return {
                videogames: actions.payload
            }
        case SELECT_API_OR_DB:
            return {
                ...state,
            }

        case ORDER_BY_NAME:
            return {
                ...state,
            }

        case ORDER_BY_RATING:
            return {
                ...state,
            }

        default:
            return {...state}
        }
    }


    // case ADD_CHAR:
    //     return {
    //         ...state,
    //         myFavorites: [...state.myFavorites, actions.payload]
    //     }