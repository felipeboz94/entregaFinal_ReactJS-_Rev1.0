import Proptypes from 'prop-types';
import pokebola from "../icons/pokebola.svg"
import './Loader.css'
const Loader = ({loading, texto})=>{
    
    return(
    loading &&
        
        <div className = 'cargando-container'>
            <img className = 'pokebola-cargando' src={pokebola} alt="" />
            <p className = 'texto-cargando'>{texto}</p>
        </div>
        )
}

Loader.proptype = {
    children: Proptypes.element.isRequired
}

export default Loader;