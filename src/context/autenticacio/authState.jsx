import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { 
    REGISTRE_CORRECTE,
    REGISTRE_ERROR,
    OBTENIR_USUARI,
    LOGIN_CORRECTE,
    LOGIN_ERROR,
    TANCAR_SESSIO
 } from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        identificat: null,
        usuari: null,
        missatge: null,
        carregant: true
    };
    const  [ state, dispatch ] = useReducer(authReducer, initialState);

    // Funcions
    const resgistrarUsuari = async dades => {
        try {
            const resposta = await clientAxios.post('/api/usuaris', dades);
            console.log(resposta.data);
            dispatch({
                type: REGISTRE_CORRECTE,
                payload: resposta.data
            });
            // Obtenim Usuari identificat
            usuariIdentificat();

        } catch (error) {
           // console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            };
            dispatch({
                type: REGISTRE_ERROR,
                payload: alerta
            });
        }
    };
    // Obtenim dades de l'usuari registrat o identificat
    const usuariIdentificat = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            // Enviem el token pel Header : TODO
            tokenAuth(token);
        }
        try {
            const resposta = await clientAxios.get('/api/auth');
            dispatch({
                type: OBTENIR_USUARI,
                payload: resposta.data.usuari
            });

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    };
    // Login Usuari - Inici de sessió
    const iniciarSessio = async dades => {
         
        try {
            const resposta = await clientAxios.post('/api/auth', dades );
            dispatch({
                type: LOGIN_CORRECTE,
                payload: resposta.data
            });
            usuariIdentificat();
           
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            };
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    };
    // Tancar sessió d'usuari
    const tancarSessio = () => {
        dispatch({
            type: TANCAR_SESSIO
        });
    }

    return(
        <authContext.Provider
            value = {{
                token: state.token,
                identificat: state.identificat,
                usuari: state.usuari,
                missatge: state.missatge,
                carregant: state.carregant,
                resgistrarUsuari,
                usuariIdentificat,
                iniciarSessio,
                tancarSessio
            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;