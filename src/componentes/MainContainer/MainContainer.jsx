import Proptypes from 'prop-types';
import CardsContainer from '../CardsContainer'
import Loader from '../Loader'
import './MainContainer.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

const MainContainer = ({children})=>{
    //const pokemones = ['Pikachu','Raichu','Charizard']
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0'
    //const url = 'https://pokeapi.co/api/v2/type/1'
    const [pokemonList,setPokemonList] = useState()
    const [isLoading,setIsLoading] = useState(false)

    const callListPokemon = (url) =>{
        setIsLoading(true)
        axios.get(url).then(result =>{
            setPokemonList(result.data)
            setIsLoading(false)
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        callListPokemon(url)
    },[])   

    return (
        <>
        <Loader loading = {isLoading} texto = 'Cargando...'></Loader>
        <div className='MainContainer'>
        
        <button className = 'button-cambia_pokemones' onClick={(e)=>callListPokemon(pokemonList.previous)}> &lt; </button>
        
        {pokemonList && <CardsContainer pokemones = {pokemonList.results}  filtered = {0} ></CardsContainer>}
        
        <button className = 'button-cambia_pokemones' onClick={(e)=>{callListPokemon(pokemonList.next)}}>&gt;</button> 
        </div>         
        </>
        
    )
}

MainContainer.proptype = {
    children: Proptypes.element.isRequired
}

export default MainContainer;