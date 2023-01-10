import { useDebugValue } from "react"

export function CartReducer(state,action){
//state representa el estado anterior, y action la accion para cambiar de estado

    switch(action.type){
        case 'ADD_CARD':
            return{
            ...state,
            total: action.payload.total,
            pokemon: action.payload.pokemon,
            carrito: action.payload.carrito
    }
        
        case 'SUB_CARD':
            return{
                ...state,
                total: action.payload.total,
                pokemon: action.payload.pokemon,
                carrito: action.payload.carrito
        }
        case 'CLEAR_CART':
            return{
                ...state,
                total: action.payload.total,
                pokemon: action.payload.pokemon,
                carrito: action.payload.carrito
        }
        default:
            break
    }


}
