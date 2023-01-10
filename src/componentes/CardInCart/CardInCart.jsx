//creo la componente basado en funcion
//se usan proptyps que viene de manera nativa en React
import pokebola from '../icons/pokebola.svg' 
import './CardInCart.css'
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import {Link} from 'react-router-dom'
import capitalizeFirstLowercaseRest from '../../funciones/auxiliares'
const CardInCart = ({objeto}) =>{
    //const [value,setValue] = useState()
    const {addPokemon,subPokemon} = useContext(CartContext)
    const cantidad = objeto.cantidad
    const pokemonFull = objeto.pokemon
    function agregarCarrito(pokemonFull){
        addPokemon(pokemonFull)
    }

    function quitarCarrito(pokemonFull){
        subPokemon(pokemonFull)
    }
    //Se va a usar el peso del pokemon como un precio de tarjeta ficticio
    return (
        {pokemonFull} && <>
        <div className = 'CardInCart'>
            <Link className = 'descripcionCorta' to = {`/detalles-card-pokemon/${pokemonFull.id}`}>
                        <img className = 'imgCard' src={pokemonFull.sprites.other["official-artwork"].front_default} alt="" />
                        <p className = 'pokemonName'><strong>{pokemonFull.name.toUpperCase()}</strong></p>
            </Link>           
            <div className = 'cardButtons'>
                <button onClick={(e)=>agregarCarrito(pokemonFull)}><img className = 'imgPokebola'src={pokebola} alt="" /> ¡Capturar!</button>
                <h2>{cantidad} u x ${pokemonFull.weight}= ${cantidad*pokemonFull.weight}</h2> 
                <button onClick={(e)=>quitarCarrito(pokemonFull)}><img className = 'imgPokebola'src={pokebola} alt="" /> ¡Liberar!</button>               
            </div>

        </div>
        
        </>)  
}

CardInCart.proptype = {
    objeto: PropTypes.array.isRequired
}

export default CardInCart;