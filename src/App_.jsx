
//defino arrow function para el componente basado en función
// llamado Initial
// <div>
//por cada componente distinto hay una carpeta distinta
//esto es un componente contenedor
import Layout from './componentes/Layout'
import NavBar from './componentes/Navbar'
import ItemListContainer from './componentes/ItemList'

import {useState, useEffect} from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import axios from 'axios'
import styles from './componentes/styles/main.scss'

const App = () =>{
   const [pokemon, setPokemon] = useState()
    const [pokemonList,setPokemonList] = useState()
    const Productos = ['Tarjeta1','Tarjeta2']
    const Menus = ['Inicio','Productos','Contactanos']
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20'
    const urlPok = 'https://pokeapi.co/api/v2/pokemon/22/'
    const callPokemon = (url)  =>{
        axios.get(url).then(result =>{
            setPokemon(result.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    const callListPokemon = (url) =>{
        axios.get(url).then(result =>{
            setPokemonList(result.data)
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        callPokemon(urlPok)
    },[])
    

    return(

        <Layout> 
        <NavBar menus = {Menus}/>
            <h1>Lista Pokemon</h1>
            <ItemListContainer lista = {Productos}/>                 
        </Layout>
    )
}

//se lo exporta por defecto.
//las constantes no se pueden exportar por default in line
// pero si las funciones
export default App;