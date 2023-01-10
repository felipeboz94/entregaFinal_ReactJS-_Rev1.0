import Proptypes from 'prop-types';

const ContactUsContainer = ({children})=>{
    return (
        <div className = 'ContactUsContainer'>ContactUsContainer</div>
    )
}

ContactUsContainer.proptype = {
    children: Proptypes.element.isRequired
}

export default ContactUsContainer;