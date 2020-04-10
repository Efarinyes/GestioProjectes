import React, { useContext, useState, useEffect } from 'react';
import projecteContext from '../../context/projectes/projecteContext';

import FeinaContext from '../../context/feines/feinaContext';


const FormFeines = () => {

    const feinesContext = useContext(FeinaContext);
    const { feinaseleccionada, errorfeina, afegirFeina, validarFeina, obtenirFeines, actualitzarFeina, netejarFeina } = feinesContext;

     // Obtenim si hi han projectes actius
     const projectesContext = useContext(projecteContext);
     const { projecte } = projectesContext;

     // Effect per detectar si tenim una feina seleccionada per editar-la
     useEffect(() => {

        if (feinaseleccionada !== null) {
            guardarFeina(feinaseleccionada);
        } else {
            guardarFeina({
                nom: ''
            });
        }
     }, [feinaseleccionada]);

     // State principal del Formulaari Feines
     const [ feina, guardarFeina ] = useState({
         nom: ''
     });
     
     // Extaraiem variables per desestructuracio Array
     const { nom } = feina;

     // Llegim valors del formulari
     const handleChange = e => {
        guardarFeina({
            ...feina,
            [e.target.name] : e.target.value
        });
     };
 
     if (!projecte) return null;

     // Apliquem desestructuracio d'Array per obtenir el projecte actiu (actual)
    const [ projecteActual ] = projecte; 


    const onSubmit = e => {
        e.preventDefault();

        // Validar
        if(nom.trim() === '') {
            validarFeina();
            return;
        }
        // Revisem si estem editant una feina o afegint-ne una de nova
        if ( feinaseleccionada === null ) {
             // Afegir nova feina al State de feines
            feina.projecte = projecteActual._id;
            
            afegirFeina(feina);
        } else {

            // Actualitza feina seleccionada
            actualitzarFeina(feina);

            // Elimina feina seleccionada del State
            netejarFeina();
        }
        // Obtenim les feines del projecte actiu (id, projecteId)
        obtenirFeines(projecteActual.id);

        // Reiniciar Formulari per evitar duplicació de feines amb el mateix nom
        guardarFeina({
            nom: ''
        });
    };


    return ( 
        <div className='formulario'>
            <form
                onSubmit= {onSubmit}
            >
                <div className='conetenedor-input'>
                    <input 
                        type="text"
                        className='input-text'
                        placeholder='Nom feina a fer...'
                        name='nom'
                        value = {nom}
                        onChange= {handleChange}
                    />
                </div>
                <div className='conetenedor-input'>
                    <input 
                        type="submit"
                        className='btn btn-primario btn-submit btn-block'
                        value= { feinaseleccionada ? 'Editar Feina' : 'Afegir feina'}
                    />
                </div>
            </form>
           { errorfeina ? <p className='error mensaje'>El nom de la feina es necessari</p> : null}
        </div>
     );
}
 
export default FormFeines;