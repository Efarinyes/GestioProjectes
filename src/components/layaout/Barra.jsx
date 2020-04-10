import React, {useContext, useEffect } from 'react';

import AuthContext from '../../context/autenticacio/authContext';


const Barra = () => {

     // Obtenim dades d'identificació
     const authContext = useContext(AuthContext);
     const { usuari, usuariIdentificat, tancarSessio } = authContext;
 
     useEffect( () => {
         usuariIdentificat();
         // eslint-disable-next-line
     }, []);

    return ( 
        <header className='app-header'>
            { usuari ? <p className='nombre-usuario'>Hola, <span> { usuari.nom }</span></p> : null }
            
            <nav className='nav-principal'>
                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick = {() => tancarSessio()}
                > Tancar Sessió</button>
            </nav>
        </header>
     );
}
 
export default Barra;
