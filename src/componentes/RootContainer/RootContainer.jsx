import Proptypes from 'prop-types';
const RootContainer = ({children})=>{
    return (
        <div className = 'RootContainer'>
            {children}
        </div>

    )
}

RootContainer.proptype = {
    children: Proptypes.element.isRequired
}

export default RootContainer;