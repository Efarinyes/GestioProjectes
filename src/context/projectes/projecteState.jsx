import React, { useReducer } from 'react';


import projecteContext from './projecteContext';
import projecteReducer from './projecteReducer';
import { 
    FORMULARI_PROJECTE, 
    OBTENIR_PROJECTES,
    AFEGIR_PROJECTE,
    PROJECTE_ERROR,
    VALIDAR_FORMULARI,
    PROJECTE_ACTUAL,
    ELIMINAR_PROJECTE,
    
    
} from '../../types';

import clientAxios from '../../config/axios';

const ProjecteState = props => {

    const initialState = {
        projectes: [],
        formulari: false,
        errorformulari: false,
        projecte: null,
        missatge: null
    };
    // Creem el Dispatch de les accions ( metode reducer... crec )
    const [ state, dispatch ] = useReducer(projecteReducer, initialState);

    // Aqui van totes les funcions del CRUD 
    const mostrarFormulari = () => {
        dispatch({
            type: FORMULARI_PROJECTE
        });
    };

    // Obtenir els projectes
    const obtenirProjectes = async () => {
        try {
            const resultat = await clientAxios.get('api/projectes');
            dispatch({
                type: OBTENIR_PROJECTES,
                payload: resultat.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Upps!!, Hi hagut un error',
                categoria: 'alerta-error'
                };
            dispatch({
                type: PROJECTE_ERROR,
                payload: alerta
            });
        }
    };
    // Afegim nou projecte
    const afegirProjecte = async projecte => {

        try {
            const resultat = await clientAxios.post('/api/projectes', projecte );
           // console.log(resultat);
            // Insertem el projecte al State
            dispatch({
                type: AFEGIR_PROJECTE,
                payload: resultat.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Upps!!, Hi hagut un error',
                categoria: 'alerta-error'
                };
            dispatch({
                type: PROJECTE_ERROR,
                payload: alerta
            });
        }
    }
    // Validar formulari ( nom projecte és necessari )
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARI
        });
    };

    // Seleccionem un projecte per passar-lo a actiu
    const projecteActual = projecteId => {
        dispatch({
            type: PROJECTE_ACTUAL,
            payload: projecteId
        });
    };
    // Eliminar Projecte Actiu
    const eliminarProjecte = async projecteId => {
        try {
             await clientAxios.delete(`/api/projectes/${projecteId}`);
             dispatch({
                 type: ELIMINAR_PROJECTE,
                 payload: projecteId
             });
        } catch (error) {
            const alerta = {
                msg: 'Upps!!, Hi hagut un error',
                categoria: 'alerta-error'
                };
            dispatch({
                type: PROJECTE_ERROR,
                payload: alerta
            });
        }
    };

    return (
        <projecteContext.Provider
            value={{
                projectes: state.projectes,
                formulari: state.formulari,
                errorformulari: state.errorformulari,
                projecte: state.projecte,
                missatge: state.missatge,
                mostrarFormulari,
                obtenirProjectes,
                afegirProjecte,
                mostrarError,
                projecteActual,
                eliminarProjecte
            }}
        >
            { props.children }
        </projecteContext.Provider>
    )
}
export default ProjecteState;
