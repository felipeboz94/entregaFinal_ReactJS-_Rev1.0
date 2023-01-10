
//defino arrow function para el componente basado en función
// llamado Initial
// <div>
//por cada componente distinto hay una carpeta distinta
//esto es un componente contenedor
import Layout from './componentes/Layout'
import NavBar from './componentes/NavbarContainer'
import RootContainer from './componentes/RootContainer'
import FilteredMainContainer from './componentes/FilteredMainContainer'
import CategoriesContainer from './componentes/CategoriesContainer'
import MainContainer from './componentes/MainContainer'
import ContactUsContainer from './componentes/ContactUsContainer'
import TusComprasContainer from './componentes/TusComprasContainer'
import CardDetailsContainer from './componentes/CardDetailsContainer'
import CardInCartContainer from './componentes/CardInCartContainer'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'

import { CartContextProvider } from './contexts/CartContext';
import styles from './componentes/styles/main.scss'
//<Route exact path = '/carrito' element = {<CartContainer/>}/>
const App = () =>{
    return(
        <CartContextProvider>  
        <Layout> 
        <Router>
        <NavBar/>
        <Routes>
            <Route exact path = '/' element={<MainContainer/>}/>
            <Route exact path = '/tuscompras' element={<TusComprasContainer/>}/>
            <Route exact path = '/contactanos' element={<ContactUsContainer/>}/>
            <Route exact path = '/categorias' element={[<CategoriesContainer/>,<MainContainer/>]}/>
            <Route exact path = '/categoria/:idType' element={[<CategoriesContainer/>,<FilteredMainContainer/>]}/>
            <Route exact path = '/detalles-card-pokemon/:idPokemon' element={<CardDetailsContainer/>}/>
            <Route exact path = '/carrito' element={<CardInCartContainer/>}/>
            </Routes>

        <RootContainer>
        </RootContainer>
        </Router>  
        </Layout>
        </CartContextProvider>  
    )
}

//se lo exporta por defecto.
//las constantes no se pueden exportar por default in line
// pero si las funciones
export default App;