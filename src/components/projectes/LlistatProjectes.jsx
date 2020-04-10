import React, { useContext, useEffect } from 'react';
import Projecte from './Projecte';
import projecteContext from '../../context/projectes/projecteContext';
import AlertaContext from '../../context/alertes/alertaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const LlistatProjectes = () => {

    // Obtenim projectes del State Inicial
    const projectesContext = useContext(projecteContext);
    const { missatge, projectes, obtenirProjectes } = projectesContext;
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    useEffect( () => {

        // Si hi ha un error...
        if (missatge ) {
            mostrarAlerta(missatge.msg, missatge.categoria);
        }

        obtenirProjectes();
        // eslint-disable-next-line
    },[missatge]);

    // Revisem que hi hagi projectes
    if (projectes.length === 0 ) return  ( <p>No hi cap projecte, comença per crear-ne un </p> );

    return ( 
        <ul className='listado-proyectos'>

        { alerta ? ( <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>  ) : null  }
            <TransitionGroup>
            { projectes.map( projecte => (
                <CSSTransition
                key= {projecte._id}
                timeout={200}
                classNames='tarea'
                >
                    <Projecte 
                    key= {projecte._id}
                    projecte={projecte}

                />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default LlistatProjectes;
