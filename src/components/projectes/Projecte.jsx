import React, { useContext } from 'react';
import projecteContext from '../../context/projectes/projecteContext';
import FeinaContext from '../../context/feines/feinaContext';

const Projecte = ({projecte}) => {

    // state del projectes
    const projectesContext = useContext(projecteContext);
    const { projecteActual } = projectesContext;

    const feinesContext = useContext(FeinaContext);
    const { obtenirFeines } = feinesContext;

    // Afegim el projecte a actiu amb les seves feines
    const seleccionarProjecte = id => {
        projecteActual(id); // Fixa un projecte com actiu
        obtenirFeines(id) // Filtrem per Id de projecte
    };

    return ( 
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => seleccionarProjecte(projecte._id) }
            >{projecte.nom}</button>
        </li>
     );
}
 
export default Projecte;
