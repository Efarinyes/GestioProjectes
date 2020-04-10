import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/alertes/alertaContext';
import AuthContext from '../../context/autenticacio/authContext';

const NouCompte = ( props ) => {

    // Extrere valors del context alerta
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { missatge, identificat, resgistrarUsuari } = authContext;

    // Usuari registrat, identificat o registre duplicat
    useEffect( () => {
        if ( identificat) {
            props.history.push('/projectes');
        }
        if ( missatge ) {
            mostrarAlerta(missatge.msg, missatge.categoria);
        }
        // eslint-disable-next-line
    }, [missatge, identificat, props.history]);


    // State de login ( inici sessió )
    const [ usuari, guardarUsuari ] = useState({
        nom: '',
        email: '',
        password: '',
        confirmar: ''
    });
    // Obtenim dades per desestructuració
    const { nom, email, password, confirmar } = usuari;

    const onChange = e => {
        guardarUsuari({
            ...usuari,
            [e.target.name] : e.target.value
        });
    };
    // Inici de sessió ( quan usuari prem enviar )
    const onSubmit = e => {
        e.preventDefault();
        // Validem que tots els camps estiguin plens
        if (nom.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Tots els inputs son necessaris', 'alerta-error');
            return;
        }
        // Password mímo de 6 caracters
        if (password.length < 6) {
            mostrarAlerta('La contrassenya ha de ser mínim de 6 caràcters', 'alerta-error');
            return;
        }
        // Comprobar que el dos passwords siguin iguals
        if (password !== confirmar) {
            mostrarAlerta('Les contrassenyes no coincideixen', 'alerta-error');
            return;
        }
        // Ho passem al action ( funcio definida al Reducer )
        resgistrarUsuari({
            nom,
            email,
            password
        });
    };

    return (  
        <div className='form-usuario'>
            { alerta ? ( <div className= {`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null }

            <div className='contenedor-form sombra-dark'>
                <h1>Crea un nou compte</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className='campo-form'>
                        <label htmlFor="nom">Nom</label>
                        <input 
                            type="text"
                            id='nom'
                            name='nom'
                            placeholder='El teu Nom'
                            value={nom}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id='email'
                            name='email'
                            placeholder='El teu correu'
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor="password">Paswword</label>
                        <input 
                            type="password"
                            id='password'
                            name='password'
                            placeholder='La teva contrassenya'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password"
                            id='confirmar'
                            name='confirmar'
                            placeholder='Confirmar la Contrassenya'
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <input 
                            type="submit"
                            className='btn btn-primario btn-block'
                            value='Registrar nou compte'
                        />
                            
                    </div>
                </form>
                <Link to= {'/'} className='enlace-cuenta'>Tornar a inici sessió</Link>
            </div>
        </div>
    );
}
 
export default NouCompte