import React from 'react'
import axios from 'axios'

const callListPokemon = (url) => {

      axios.get(url).then(result =>{
          const pokemonList = result.data
      }).catch(error=>{
          console.log(error)
      })
  
  return pokemonList
}
export default callListPokemon;