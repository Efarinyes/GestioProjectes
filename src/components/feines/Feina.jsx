import React, { useContext } from 'react';

import FeinaContext from '../../context/feines/feinaContext';
import projecteContext from '../../context/projectes/projecteContext';

const Feina = ({feina}) => {

    
     // state del projectes
     const projectesContext = useContext(projecteContext);
     const { projecte } = projectesContext;

     const feinesContext = useContext(FeinaContext);
     const { eliminarFeina, obtenirFeines, actualitzarFeina, guardarFeinaActual } = feinesContext;

    // Extraiem el projecte actiu
    const [projecteActiu] = projecte;
    // Funció que s'executa quan prenem boto d'eliminar feina
    const feinaEliminar = id => {
        eliminarFeina(id, projecteActiu._id);
        obtenirFeines(projecteActiu._id);
    };

    // Cambiar estat de les feines
    const cambiarEstat = feina => {
        if (feina.estat) {
            feina.estat = false;
        } else {
            feina.estat = true;
        }
        actualitzarFeina(feina);
    };
    // Selecciona una feina del projecte per poder-la editar
    const selecionarFeina = feina => {
        guardarFeinaActual(feina);
    }

    return ( 
        <li className='tarea sombra'>
            <p> {feina.nom} </p>

            <div className='estado'>
                { feina.estat 
                ? 
                    (
                        <button
                            type='button'
                            className='completo'
                            onClick={ ()=> cambiarEstat(feina)}
                        > Acabada </button>
                    )
                :
                    (
                        <button
                            type='button'
                            className='incompleto'
                            onClick={ ()=> cambiarEstat(feina)}
                        > Incomplerta </button>
                    )
                }
            </div>
            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick= { () => selecionarFeina(feina)}
                > Editar</button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick = { () => feinaEliminar(feina._id)}
                > Eliminar</button>
            </div>
        </li>
     );
}
 
export default Feina;
