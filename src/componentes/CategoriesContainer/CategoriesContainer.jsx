import PropTypes from 'prop-types';
import axios from 'axios'
import {useState, useEffect} from 'react'
import capitalizeFirstLowercaseRest from '../../funciones/auxiliares'
import './CategoriesContainer.css'
const CategoriesContainer = ({children})=>{
    const urlTypes = 'https://pokeapi.co/api/v2/type'
    const [pokemonTypes, setPokemonTypes] = useState()
    const callPokemonTypes = (url)  =>{
        axios.get(url).then(result =>{
            setPokemonTypes(result.data)
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        callPokemonTypes(urlTypes)
    },[])

    return (
        <div className = 'CategoriesContainer'>
            {pokemonTypes &&                   
                    pokemonTypes.results.map((pokemonType,index)=>{
                        return  <a key = {index+1} href = {`/categoria/${index+1}`}>{capitalizeFirstLowercaseRest(pokemonType.name)}</a>
                    })}
                
        </div>
    )
}

CategoriesContainer.proptype = {
    categories: PropTypes.array.isRequired
}

export default CategoriesContainer;