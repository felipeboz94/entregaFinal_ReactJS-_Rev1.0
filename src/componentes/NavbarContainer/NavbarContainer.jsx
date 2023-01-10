import PropTypes from 'prop-types';
import PokeWidget from '../PokeWidget'
import './NavbarContainer.css'
import logo from '../icons/pokemon-23.svg'
import {Link} from 'react-router-dom'
const NavbarContainer = ()=>{
    return (
        <div className = 'navBar'>
            <nav>
                <Link to = '/'><img className = 'Logo' src={logo} alt=""/></Link>
                <Link to = '/tuscompras'>Tus compras</Link>
                <Link to = '/categorias'>Categorías</Link>
                <Link to = '/contactanos'>Contactanos</Link>
            </nav>      
            <PokeWidget/>
        </div>
    )
}

NavbarContainer.proptype = {
    menus: PropTypes.array.isRequired
}

export default NavbarContainer;