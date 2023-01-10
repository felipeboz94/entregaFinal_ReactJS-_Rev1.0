import Proptypes from 'prop-types';
import CategoriesContainer from '../CategoriesContainer'
import CardsContainer from '../CardsContainer'

import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

const FilteredMainContainer = ({children})=>{
    const {idType,Type} = useParams()
    //const url = 'https://pokeapi.co/api/v2/type/1'
    const urlBase = `https://pokeapi.co/api/v2/type/${idType}`
    const [pokemonFilteredList,setPokemonFilteredList] = useState()
    const callFilteredListPokemon = (url) =>{
        axios.get(url).then(result =>{
            setPokemonFilteredList(result.data.pokemon) 
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        callFilteredListPokemon(urlBase)
    },[])   
   

    return (
        <><div className='FilteredMainContainer'>
        </div>
        <h2>Filtro: {Type}</h2>  
        {pokemonFilteredList && 
        <CardsContainer pokemones = {pokemonFilteredList} filtered = {1} ></CardsContainer>}
        
        <div className = 'footer'>
            <button onClick={(e)=>callFilteredListPokemon(pokemonFilteredList.previous)}>Menos</button>
            <button onClick={(e)=>{callFilteredListPokemon(pokemonFilteredList.next)}}>Más</button>
        </div>
        </>
        
    )
}

FilteredMainContainer.proptype = {
    children: Proptypes.element.isRequired
}

export default FilteredMainContainer;