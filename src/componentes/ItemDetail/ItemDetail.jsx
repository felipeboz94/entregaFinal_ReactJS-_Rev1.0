import Proptypes from 'prop-types';
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
import './ItemDetail.css'
import CallPokemon from '../../funciones/interfaces'
import Loader from '../Loader'
import capitalizeFirstLowercaseRest from '../../funciones/auxiliares'
const ItemDetail = ({children,idPokemon})=>{
    
    const [isLoading,setIsLoading] = useState(false)
    const [pokemonDetails, setPokemonDetails] = useState()
    const [pokemonDetailsSpecie, setPokemonDetailsSpecie] = useState()
    const [evolutionChain, setEvolutionChain] = useState()
    const urlBase = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`

    const callPokemonSpecie = (urlBase) =>{
        axios.get(urlBase).then(result =>{
            result && //result.data.chain.evolves_to.map((evolucion,index)=>{
                setPokemonDetailsSpecie(result.data)
                
            })
        .catch(error=>{
            console.log(error)
        })
    }

    const callPokemon = (urlBase)  =>{
        setIsLoading(true)
        axios.get(urlBase).then(result =>{
            setPokemonDetails(result.data)
        }).catch(error=>{
            console.log(error)
        })
      }
    const callEvolutionChain = (urlBase) =>{
        axios.get(urlBase).then(result =>{
                const pokemonBase = capitalizeFirstLowercaseRest(result.data.chain.species.name)
                const pokemonBaseID = result.data.chain.species.url.split('/').slice(-2,-1)[0]
                let cadena = [{'id' : pokemonBaseID, 'nombre' : pokemonBase}]
                if(result.data.chain.evolves_to[0]) {
                    const pokemonEvol1 = capitalizeFirstLowercaseRest(result.data.chain.evolves_to[0].species.name) 
                    const pokemonEvol1ID = result.data.chain.evolves_to[0].species.url.split('/').slice(-2,-1)[0]
                    cadena.push({'id' : pokemonEvol1ID, 'nombre' : pokemonEvol1})
                    if(result.data.chain.evolves_to[0].evolves_to[0]){
                        const pokemonEvol2 = capitalizeFirstLowercaseRest(result.data.chain.evolves_to[0].evolves_to[0].species.name)  
                        const pokemonEvol2ID = result.data.chain.evolves_to[0].evolves_to[0].species.url.split('/').slice(-2,-1)[0]
                        cadena.push({'id' : pokemonEvol2ID, 'nombre' : pokemonEvol2})
                    }
                }
                setEvolutionChain(cadena)
                
                setIsLoading(false)
            })
        .catch(error=>{
            console.log(error)
        })        
    }

    useEffect(()=>{
        callPokemon(urlBase)
    },[idPokemon])

    useEffect(()=>{
        pokemonDetails &&callPokemonSpecie(pokemonDetails.species.url)
    },[pokemonDetails])

    useEffect(()=>{
        pokemonDetailsSpecie &&callEvolutionChain(pokemonDetailsSpecie.evolution_chain.url)
    },[pokemonDetailsSpecie])

    let types = ''

return (evolutionChain && (
        <>
            {pokemonDetails &&
            pokemonDetails.types.map((type,index)=>{
             types += capitalizeFirstLowercaseRest(type.type['name']) + ' '
            })}
            
            <Loader loading = {isLoading} texto = 'Cargando...'></Loader>
            <div className='CardDetailsContainer'>
                <div>
                    <img className = 'imgDetails' src={pokemonDetails.sprites.other["official-artwork"].front_default} alt="" />
                     <div>
                        <p>Cadena evolutiva: </p>
                        { evolutionChain.map((evolPokemon,index) => {
                            
                            return(
                            <button key = {index}> <a href={`/detalles-card-pokemon/${evolPokemon.id}`}>{evolPokemon.nombre}</a></button>
                            )})}
                    </div>            
                </div>
               
                
                <div className = 'descripcion'>
                        
                    <div className = 'descripcionCorta'>
                    <p className = 'pokemonName'><strong>({idPokemon}) {pokemonDetails.name.toUpperCase()}</strong></p>
                        <p className = 'pokemonName'>Tipos : {types}</p>
                        <p className = 'pokemonName'>Experiencia base: {pokemonDetails.base_experience}</p>
                        <p className = 'pokemonName'>Tasa de captura: {pokemonDetailsSpecie.capture_rate}</p>

                    </div>
                    <div className = 'descripcionLarga'>
                            <p className = 'pokemonName'><strong>Generación:</strong> {pokemonDetailsSpecie.generation.name}</p>
                            <p className = 'pokemonName'><strong>Tasa de crecimiento:</strong> {pokemonDetailsSpecie.growth_rate.name}</p>
                            <p className = 'pokemonName'><strong>Habitat: </strong>{pokemonDetailsSpecie.habitat.name}</p>
                            <p className = 'pokemonName'><strong>Es bebé:</strong> {pokemonDetailsSpecie.is_baby ? 'Si ':'No'}</p>
                            <p className = 'pokemonName'><strong>Es legendario:</strong> {pokemonDetailsSpecie.is_legendary ? 'Si ':'No'}</p>
                            <p className = 'pokemonName'><strong>Es mítico:</strong> {pokemonDetailsSpecie.is_mythical ? 'Si ':'No'}</p>
                            <p className = 'pokemonName'><strong>Forma:</strong> {pokemonDetailsSpecie.shape.name}</p>
                            <div className = 'abilitiesContainer'>
                            <div className = 'abilityLabel'>
                                Habilidades:
                            </div>
                            {pokemonDetails.abilities.map((ability,index)=>{
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
                            {pokemonDetails.stats.map((stat,index)=>{
                                return (
                                    <div key = {index}  className = 'statContainer'>
                                        <div className = 'statLabel'>{stat.stat['name'].toUpperCase()}: </div>
                                        <div className = 'stat'>{stat.base_stat}</div>
                                    </div>
                                        )
                                })
                            }
                        </div>                    
                        
                        <div className = 'eggGroupsContainer'>
                            <div className = 'eggGroupsLabel'>
                                Egg Groups:
                            </div>
                            {pokemonDetailsSpecie.egg_groups.map((egg_group,index)=>{
                                return (
                                    <div key = {index} className = 'eggGroupsContainer'>
                                        {capitalizeFirstLowercaseRest(egg_group.name)}
                                    </div>
                                        )
                            })
                            }
                        </div>
                        <div className = 'movesContainer'>
                            <div className = 'movesLabel'>
                                Movimientos:
                            </div>
                            {pokemonDetails.moves.map((move,index)=>{
                                return (
                                    <div key = {index}  className = 'moveContainer'>
                                        <div className = 'statLabel'>{move.move['name'].toUpperCase()}: </div>
                                        
                                    </div>
                                        )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
))
}

ItemDetail.proptype = {
    children: Proptypes.element.isRequired
}

export default ItemDetail;