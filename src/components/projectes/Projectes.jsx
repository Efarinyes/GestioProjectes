import React, { useContext, useEffect } from 'react';
import Sidebar from '../layaout/Sidebar';
import Barra from '../layaout/Barra';
import FormFeines from '../feines/FormFeines';
import LlistatFeines from '../feines/LlistatFeines';
import AuthContext from '../../context/autenticacio/authContext';

const Projectes = () => {

    // Obtenim dades d'identificació
    const authContext = useContext(AuthContext);
    const { usuariIdentificat } = authContext;

    useEffect( () => {
        usuariIdentificat();
        // eslint-disable-next-line
    }, []);


    return (  
        <div className='contenedor-app'>
            <Sidebar />
            <div className='seccion-principal'>
                <Barra />
                <main>
                    <FormFeines />
                    <div className='contenedor-tareas'>
                        <LlistatFeines />
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Projectes;
