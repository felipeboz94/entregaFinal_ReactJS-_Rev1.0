import axios from 'axios'

const CallPokemon = (urlBase)  =>{

  axios.get(urlBase).then(result =>{
    const pokemonDetailss = result.data
    return pokemonDetailss
  }).catch(error=>{
      console.log(error)
  })
}

export default CallPokemon