
import React, { useReducer } from 'react';
import FeinaContext from './feinaContext';
import FeinaReducer from './feinaReducer';

import {
    FEINES_PROJECTE,
    AFEGIR_FEINA,
    VALIDAR_FEINA,
    ELIMINAR_FEINA,
    FEINA_ACTUAL,
    ACTUALITZAR_FEINA,
    NETEJAR_FEINA
} from '../../types';

import clientAxios from '../../config/axios';

const FeinaState = props => {
    const initialState = {
        feinesprojecte: [],
        errorfeina: false,
        feinaseleccionada: null
    };

    // Dispatch i State
    const [ state, dispatch ] = useReducer(FeinaReducer, initialState);

    // Funcions
    // Obtenir feines d'un projecte
    const obtenirFeines = async projecte => {
       // console.log(projecte);
        try {
            const resultat = await clientAxios.get('/api/feines', {params: {projecte}});
            console.log(resultat);
            dispatch({
                type: FEINES_PROJECTE,
                payload: resultat.data.feines
            });
        } catch (error) {
            console.log(error);
        }
    };
    // Afegim feina al projecte actiu
    const afegirFeina = async feina => {
        console.log(feina);
        try {
            const resultat = await clientAxios.post('/api/feines', feina );
            console.log(resultat);

            dispatch({
                type: AFEGIR_FEINA,
                payload: feina
            });
        } catch (error) {
            console.log(error);
        }
        
    };

    // Valida i mostra error del formulari Feines
    const validarFeina = () => {
        dispatch({
            type: VALIDAR_FEINA
        });
    };

    // Eliminar feines per ID
    const eliminarFeina = async ( id, projecte ) => {
       try {
            await clientAxios.delete(`/api/feines/${id}`, {params: {projecte}});

        dispatch({
            type: ELIMINAR_FEINA,
            payload: id
        });
       } catch (error) {
           console.log(error);
       }
    };

    // // Modificar l'estat d'una feina
    // const cambiarEstatFeina = feina => {
    //     dispatch({
    //         type: ESTAT_FEINA,
    //         payload: feina
    //     });
    // };
     // Actualitzar una feina si s'està editant
     const actualitzarFeina = async feina => {
       // console.log(feina);
        try {
            const resultat = await clientAxios.put(`/api/feines/${feina._id}`, feina );
            console.log(resultat);
            dispatch({
                type: ACTUALITZAR_FEINA,
                payload: resultat.data.feina
            });
        } catch (error) {
            console.log(error);
        }
       
    };

    // Selecciona una feina per poder-la editar
    const guardarFeinaActual = feina => {
        dispatch({
            type: FEINA_ACTUAL,
            payload: feina
        });
    };
   
    // Eliminem la feina seleccionada
    const netejarFeina = () => {
        dispatch({
            type: NETEJAR_FEINA
        });
    };

    return (
        <FeinaContext.Provider
            value={{
                feinesprojecte: state.feinesprojecte,
                errorfeina: state.errorfeina,
                feinaseleccionada: state.feinaseleccionada,
                obtenirFeines,
                afegirFeina,
                validarFeina,
                eliminarFeina,
                
                guardarFeinaActual,
                actualitzarFeina,
                netejarFeina
            }}
        >
            { props.children }
        </FeinaContext.Provider>
    )
}

export default FeinaState;



