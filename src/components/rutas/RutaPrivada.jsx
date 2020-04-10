import React, { useContext, useEffect } from 'react';
import { Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/autenticacio/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { identificat, usuariIdentificat, carregant } = authContext;

    useEffect(() => {
        usuariIdentificat();

        // eslint-disable-next-line
    }, []);

    return ( 
        <Route { ...props } render = { props => !identificat && !carregant ? (
            <Redirect to='/' />
        ) : (
            <Component { ...props } />
        )} />

     );
}
 
export default RutaPrivada;
