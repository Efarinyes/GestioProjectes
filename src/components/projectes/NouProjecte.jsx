import React, { Fragment, useState, useContext } from 'react';
import projecteContext from '../../context/projectes/projecteContext';

const NouProjecte = () => {

    // state del formulari
    const projectesContext = useContext(projecteContext);
    const { formulari, errorformulari, mostrarFormulari, afegirProjecte, mostrarError } = projectesContext;




    // State per a Nou Projecte
    const [ projecte, guardarProjecte ] = useState({
        nom: ''
    });
    // Obtenim nom Projecte per desestructuració
    const { nom } = projecte;


    const onChangeProjecte = e => {
        guardarProjecte({
            ...projecte,
            [e.target.name] : e.target.value
        });
    };
    const onSubmitProjecte = e => {
        e.preventDefault();
        
        // Validar Projecte
        if (nom === '') {
            mostrarError()
            return;
        }
        // Afegir al State
        afegirProjecte(projecte);

        // Reiniciar Formulari
        guardarProjecte({
            nom: ''
        });
    };

    // Mostrem el formulari
    const onClickFormulari = () => {
        mostrarFormulari();
    };

    return ( 
        <Fragment>
            <button
                type='button'
                className='btb btb-block btn-primario'
                onClick= { onClickFormulari }
            >Nou Projecte</button>
            { formulari 
                ? (
                    <form
                        className='formulario-nuevo-proyecto'
                        onSubmit= {onSubmitProjecte}
                    >
                        <input 
                            type="text"
                            className='input-text'
                            placeholder='Nom del projecte'
                            name='nom'
                            value={nom}
                            onChange={onChangeProjecte}
                        />
                        <input 
                            type='submit'
                            className='btn btn-primario btn-block'
                            value='Afegeix projecte'
                        />

                    </form>
                ) :
                null
            }
            { errorformulari ? <p className='mensaje error'>El nom del prjecte és necessari</p> : null}
        </Fragment>
     );
}
 
export default NouProjecte;
