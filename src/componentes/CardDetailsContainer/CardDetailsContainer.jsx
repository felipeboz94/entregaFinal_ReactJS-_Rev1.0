import Proptypes from 'prop-types';
import {useParams} from 'react-router-dom'
import './CardDetailsContainer.css'
import ItemDetail from '../ItemDetail';

const CardDetailsContainer = ({children})=>{
    const {idPokemon} = useParams()

    return (
        <ItemDetail idPokemon = {idPokemon}></ItemDetail>
            )
}

CardDetailsContainer.proptype = {
    children: Proptypes.element.isRequired
}

export default CardDetailsContainer;