//creo la componente basado en funcion
//se usan proptyps que viene de manera nativa en React
import pokebola from '../icons/pokebola.svg' 
import './Card.css'
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import capitalizeFirstLowercaseRest from '../../funciones/auxiliares'
const Card = ({pokemon}) =>{
    const [pokemonFull, setPokemonFull] = useState()
    //const [value,setValue] = useState()
    const {addPokemon,subPokemon} = useContext(CartContext)

    function agregarCarrito(pokemonFull){
        addPokemon(pokemonFull)
    }
    function quitarCarrito(pokemonFull){
        subPokemon(pokemonFull)
    }


    //console.log(pokemonFull)
    const callPokemon = (pokemon)  =>{
        axios.get(pokemon.url).then(result =>{
            setPokemonFull(result.data)
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        callPokemon(pokemon)
    },[pokemon])

   // pokemonFull && console.log(pokemonFull)
    return (
        <div className = 'CardPokemon'>
            {pokemonFull && 
            <>
            <img className = 'imgCard' src={pokemonFull.sprites.other["official-artwork"].front_default} alt="" />
            <div className = 'descripcionCorta'>
                <p className = 'pokemonName'><strong>{pokemonFull.name.toUpperCase()}</strong></p>

            </div>
            <div className = 'descripcionLarga'>
                <div className = 'abilitiesContainer'>
                    <div className = 'abilityLabel'>
                        Habilidades:
                    </div>
                    {pokemonFull.abilities.map((ability,index)=>{
                        return (
                            <div key = {index} className = 'abilityContainer'>
                                {capitalizeFirstLowercaseRest(ability.ability.name)}
                            </div>
                                )
                    })
                    }
                </div>
                <div className = 'statsContainer'>
                    <div className = 'statsLabel'>
                        Estadísticas:
                    </div>
                    {pokemonFull.stats.map((stat,index)=>{
                        return (
                            <div key = {index}  className = 'statContainer'>
                                <div className = 'statLabel'>{stat.stat['name'].toUpperCase()}: </div>
                                <div className = 'stat'>{stat.base_stat}</div>
                            </div>
                                )
                        })
                    }
                </div>
            </div>
            <div className = 'cardButtons'>
                    
                    <button onClick={(e)=>agregarCarrito(pokemonFull)}><img className = 'imgPokebola'src={pokebola} alt="" /> ¡Capturar!</button>
                    <button onClick={(e)=>quitarCarrito(pokemonFull)}><img className = 'imgPokebola'src={pokebola} alt="" /> ¡Liberar!</button>
                        <a href={`/detalles-card-pokemon/${pokemonFull.id}`}>+ Detalles</a>
            </div>
            </>}
            
        </div>
    )
}

Card.proptype = {
    pokemon: PropTypes.array.isRequired
}

export default Card;