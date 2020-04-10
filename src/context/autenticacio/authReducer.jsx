import { 
    REGISTRE_CORRECTE,
    REGISTRE_ERROR,
    OBTENIR_USUARI,
    LOGIN_CORRECTE,
    LOGIN_ERROR,
    TANCAR_SESSIO
 } from '../../types';

export default (state, action) => {

    switch( action.type) {

        case REGISTRE_CORRECTE:
        case LOGIN_CORRECTE:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                identificat: true,
                missatge: null,
                carregant: false
            };
        case OBTENIR_USUARI:
            return {
                ...state,
                identificat: true,
                usuari: action.payload,
                carregant: false
            };
        case TANCAR_SESSIO:       
        case LOGIN_ERROR:    
        case REGISTRE_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuari: null,
                identificat: null,
                missatge: action.payload,
                carregant: false
            };
        default:
            return state;
    }
};