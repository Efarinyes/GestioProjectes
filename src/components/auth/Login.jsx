import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertes/alertaContext';
import AuthContext from '../../context/autenticacio/authContext';

const Login = (props) => {

    // Extrere valors del context alerta
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { missatge, identificat, iniciarSessio } = authContext;

      // Usuari o password incorrectes
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
        email: '',
        password: ''
    });
    // Obtenim dades per desestructuració
    const { email, password } = usuari;

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
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Tots els camps son necessaris', 'alerta-error')
        }
        // Ho passem al action ( funcio definida al Reducer )
        iniciarSessio({email, password});
    };

    return (  
        <div className='form-usuario'>
            { alerta ? ( <div className= {`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null }
            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sessió</h1>
                <form
                    onSubmit={onSubmit}
                
                >
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
                        <label htmlFor="password">Contrassenya</label>
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
                        <input 
                            type="submit"
                            className='btn btn-primario btn-block'
                            value='Iniciar Sessió'
                        />
                            
                    </div>
                </form>
                <Link to= {'/nou-compte'} className='enlace-cuenta'>Crea un compte</Link>
            </div>
        </div>
    );
}
 
export default Login