//creo la componente basado en funcion
//se usan proptyps que viene de manera nativa en React


import Proptypes from 'prop-types';

import {useState, useEffect} from 'react'
import axios from 'axios'

const ItemListContainer = ({lista})=>{
    return (
        <div className = 'caja'>{lista.map((elemento,index)=>{
            return  <p key = {index}>{elemento}</p>
           })
        }
        </div>
    )
}
//el layout tiene que pasarle la propiedad al children 

ItemListContainer.proptype = {
    lista: Proptypes.array.isRequired
}

export default ItemListContainer;