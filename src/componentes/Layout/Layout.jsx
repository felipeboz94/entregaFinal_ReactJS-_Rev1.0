//creo la componente basado en funcion
//se usan proptyps que viene de manera nativa en React


import Proptypes from 'prop-types';
import './Layout.css'
const Layout = ({children})=>{
    return (
        <div >{children}</div>
    )
}
//el layout tiene que pasarle la propiedad al children 

Layout.proptype = {
    children: Proptypes.element.isRequired
}

export default Layout;