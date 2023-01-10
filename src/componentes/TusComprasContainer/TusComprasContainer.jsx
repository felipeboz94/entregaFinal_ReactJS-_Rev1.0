import Proptypes from 'prop-types';
import {collection,doc,getDocs,getFirestore, serverTimestamp, query, orderBy,limit} from 'firebase/firestore'
import CardInCart from '../CardInCart'
import {useState,useEffect} from 'react'
import './TusComprasContainer.css'
import Loader from '../Loader'
import {Link} from 'react-router-dom'
const TusComprasContainer = ({children})=>{
    const [compras, setCompras] = useState()
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
        const db = getFirestore()   //crea instancia de la db
        //si quiero traerme todos los carritos, uso collection, getDocs y no filtro por documento
        //si quiero traerme un documento en particular uso doc, getDoc y además del carrito, agrego el id del documento
        //para filtrar en la query se tiene que usar por ejemplo:
            //query(collection(db,'compras'),where('fecha','>',valorFecha))
        //const comprasRealizadas = collection(db,"compras")    cambio la query full por una que la ordene por fecha
       // const comprasRealizadas = query(collection(db,"compras"),orderBy("fecha","hora"),limit(6)) no me anda el orderBy
       const comprasRealizadas = query(collection(db,"compras"),limit(6))
        setIsLoading(true)
        getDocs(comprasRealizadas).then(snapshot =>{ //snapshot es una variable como puede ser result tambien    

            //acá se tiene que traer el objeto carrito y la fecha de compra
                setCompras(snapshot.docs.map((doc)=>({...doc.data()}))
                )
                setIsLoading(false)
            
        }).catch(error=>{
            setIsLoading(false)
            console.log(error)
        })
    },[])

    return(
        <div className = 'TusComprasContainer'>

    <Loader loading = {isLoading} texto = 'Cargando...'></Loader>
    {compras && 
        compras.map((compra,index)=>{
            
            //habria que dejarlo como un componente de react a esto que viene
            return(
        <div className = 'compraContainer' key = {index}>
            <div className = 'descripcionCompra'>
                <div className = 'fechaCompra'>
                    Fecha de compra: {compra.fecha}-{compra.hora}
                </div>
                <div className = 'comprador'>
                    Comprador:{compra.comprador['nombre']}
                </div>
            </div>
            <div className = 'carritosDeCompra'>
                
                {
                compra.carrito &&                         
                    compra.carrito.map((objeto,index)=>{
                        //totalPrecio += objeto.cantidad*objeto.pokemon.weight
                    //console.log(pokemon)
                    let cantidad = objeto.cantidad
                    let pokemonFull = objeto.pokemon
                    return(
                        <div className = 'descripcionCorta' key = {index}>
                            <img className = 'imgCard' src={pokemonFull.sprites.other["official-artwork"].front_default} alt="" />
                            <div>
                            <p className = 'pokemonName'><strong>{pokemonFull.name.toUpperCase()}</strong></p>
                            <p>{cantidad} u x ${pokemonFull.weight}= ${cantidad*pokemonFull.weight}</p>
                            </div>
                        </div>
                    )
                    })}
            </div>
            <div className = 'totalCompra'>
                El total fue de ${compra.total}
            </div>
        </div>
        )
    })}
    </div>
)
  
    
}

TusComprasContainer.proptype = {
    children: Proptypes.element.isRequired
}

export default TusComprasContainer;