import { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";
import {count, countItem,agregaCarrito,quitaCarrito} from "./operacionesCarrito"
//exportar la constante que indica el contexto de manera global
export const CartContext = createContext(null)

//el estado inical del objeto
const initialState = {
    total : 0,
    pokemon:{},
    carrito:[]
}

export const CartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(CartReducer,initialState)

    //funcion para agregar la tarjeta al carrito
    function addPokemon(pokemon){
        
        let total = count(state.total,true) 
        let poke = pokemon
        let carrito = agregaCarrito(state.total,pokemon,state.carrito)
        //carrito.push(pokemon)
        dispatch({
                type:'ADD_CARD',
                payload:{total, poke, carrito}
            })
    }

    //funcion para quitar la tarjeta pokemon al carrito
    function subPokemon(pokemon){
        let total = count(state.total,false)  
        let poke = pokemon
        let carrito = quitaCarrito(state.total,pokemon,state.carrito)

        dispatch({
            type:'SUB_CARD',
            payload:{total, poke, carrito}
        })
    }
    function clearCart(){
        dispatch({
            type:'CLEAR_CART',
            payload: initialState
        })
    }
    return(
        <CartContext.Provider
        value={{
            total:state.total,            
            pokemon:state.pokemon,
            carrito:state.carrito,
            addPokemon,
            subPokemon, 
            clearCart
        }}>
        {children}
        </CartContext.Provider>
    )
}

