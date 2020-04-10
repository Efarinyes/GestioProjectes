import React, { Fragment, useContext } from 'react';
import Feina from './Feina';
import projecteContext from '../../context/projectes/projecteContext';
import FeinaContext from '../../context/feines/feinaContext';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const LlistaFeines = () => {

    // Obtenim les feines del projecte actiu
    const feinesContext = useContext(FeinaContext);
    const { feinesprojecte } = feinesContext;

    // Obtenim projectes del State Inicial
    const projectesContext = useContext(projecteContext);
    const { projecte, eliminarProjecte} = projectesContext;

    if (!projecte) return (<h2> Selecciona un projecte </h2>)

    // Apliquem desestructuracio d'Array per obtenir el projecte actiu (actual)
    const [ projecteActual ] = projecte; 

   // const feinesProjecte = [];

    // Funcio per eliminar projecte actiu
    const onClickEliminar = () => {
        eliminarProjecte(projecteActual._id);
    };

    return ( 
        <Fragment>
            <h2>Projecte: { projecteActual.nom } </h2>
            <ul className='listado-tareas'>
                { feinesprojecte.length === 0 
                    ? ( <li className='tarea'> <p>No hi ha feines </p> </li> )
                    : <TransitionGroup>
                        
                        { feinesprojecte.map( feina => (
                        <CSSTransition
                            key= {feina._id}
                            timeout={200}
                            classNames='proyecto'
                        >
                            <Feina
                            
                            feina={feina}
                        />
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type='button'
                className='btn btn-eliminar'
                onClick = {onClickEliminar}
            >Eliminar Projecte &times;</button>
        </Fragment>
     );
}
 
export default LlistaFeines;
