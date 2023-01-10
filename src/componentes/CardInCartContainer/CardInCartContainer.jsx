import PropTypes from 'prop-types';
import CardInCart from '../CardInCart'
import {addDoc,collection,getFirestore} from 'firebase/firestore'
import './CardInCartContainer.css'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import Loader from '../Loader'
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react'
const CardInCartContainer = ()=>{
    const [isLoading,setIsLoading] = useState(false)
    const {carrito,clearCart} = useContext(CartContext)
    let totalPrecio = 0
    let navigate = useNavigate()


    function tomaValoresFormulario(){
        const usuarioInput = document.getElementById('nombreInput')
        const mailInput = document.getElementById('mailInput')
        return [usuarioInput.value, mailInput.value]

    }
    function finalizaCompra(carrito, totalPrecio){
        const fechaHoraDeCompra = new Date().toJSON()
        const fechaDeCompra = fechaHoraDeCompra.slice(0,10)
        const horaDeCompra  = fechaHoraDeCompra.slice(11,19)
        const [usuario,mail] = tomaValoresFormulario()
        const collectionName = 'compras'

        const order = {
            comprador : {
                nombre : usuario,
                mail : mail
            },
            carrito : carrito,
            total : totalPrecio,
            fecha : fechaDeCompra,
            hora : horaDeCompra
        }
        
        if (usuario == null || usuario == ''){
            alert('Debe ingresar un usuario para realizar la compra')
        }
        else{
        const db = getFirestore()
        const orderCollection = collection(db,collectionName)
        setIsLoading(true)        
        addDoc(orderCollection,order).then(({id})=>
        {
        setIsLoading(false)    
        alert(`Compra realizada con éxito: Id de orden finalizada ${id}`)
        clearCart()    
        navigate('/')
        
        }
        )
    }

    }
    return (<>
        <div className = 'CardInCartContainer'>
        <Loader loading = {isLoading} texto = 'Finalizando compra...'></Loader>
        {           
        carrito &&                         
                carrito.map((objeto,index)=>{
                    totalPrecio += objeto.cantidad*objeto.pokemon.weight
                //console.log(pokemon)
                return(
                <CardInCart key = {index} objeto = {objeto}></CardInCart>
                )
                })}
        {carrito.length != 0 &&    

                <div>
                    <h2>Complete el formulario y finalice la compra:</h2>
                    <form className = 'formulario' action="">                       
                        <label for="nombre">Nombre y apellido:</label>
                        <input type="text" id="nombreInput" name="nombre"/>
                        <label for="mail">Mail:</label>
                        <input type="mail" id="mailInput" name="mail"/>
                    </form>
                    <button className = 'button-finaliza_compra' onClick={(e)=>finalizaCompra(carrito,totalPrecio)}>Finalizar compra</button>
                    <h3>El total es ${totalPrecio}</h3>
                </div>}
        {carrito.length == 0 && 
            <h2>No tiene elementos en el carrito. Vaya al <Link to = '/'>Inicio</Link></h2>
        }
             
        </div>
        </>
    )
}


export default CardInCartContainer;