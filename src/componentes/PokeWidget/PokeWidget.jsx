//creo la componente basado en funcion
//se usan proptyps que viene de manera nativa en React
import { useContext } from "react"
import pokebola from "../icons/pokebola.svg"
import {Link} from 'react-router-dom'
import './PokeWidget.css'
import { CartContext } from "../../contexts/CartContext"
const PokeWidget = ()=>{
    const {total} = useContext(CartContext)
    return (
        <div>           
            <Link to = '/carrito' className = 'pokeWidget'> <img src={pokebola} alt="" /><p>({total})</p></Link>
        </div>

    )
}

export default PokeWidget;