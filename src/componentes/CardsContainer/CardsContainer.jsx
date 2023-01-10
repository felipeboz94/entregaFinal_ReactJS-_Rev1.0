import PropTypes from 'prop-types';
import Card from '../Card'
import './CardsContainer.css'

import {useState, useEffect} from 'react'
const CardsContainer = ({pokemones,filtered})=>{
    //const [isLoading,setIsLoading]=useState(true)
    return (

        <div className = 'CardsContainer'>
                {
                //isLoading && <div className = 'alert alert-info'> <em> Cargando...</em></div>
                } 
                {
                pokemones && pokemones.map((pokemon,index)=>{
                pokemon = filtered ? pokemon.pokemon : pokemon
                //console.log(pokemon)
                return (<Card key = {index} pokemon = {pokemon}></Card>
                )})
                }
                              
                
                   
        </div>
    )
}

CardsContainer.proptype = {
    pokemones: PropTypes.array.isRequired
}

export default CardsContainer;