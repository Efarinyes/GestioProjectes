import { 
    FEINES_PROJECTE ,
    AFEGIR_FEINA,
    VALIDAR_FEINA,
    ELIMINAR_FEINA,
   
    FEINA_ACTUAL,
    ACTUALITZAR_FEINA,
    NETEJAR_FEINA
} 
from '../../types';



export default (state, action) => {
    switch(action.type) {
        case FEINES_PROJECTE:
            return {
                ...state,
                feinesprojecte: action.payload
            };
        case AFEGIR_FEINA:
            return {
                ...state,
                feinesprojecte: [ ...state.feinesprojecte,  action.payload ],
                errorfeina: false
            };
        case VALIDAR_FEINA:
            return {
                ...state,
                errorfeina: true
            }; 
        case ELIMINAR_FEINA:
            return {
                ...state,
                feinesprojecte: state.feinesprojecte.filter( feina => feina._id !== action.payload)
            };
        case ACTUALITZAR_FEINA:    
        
            return {
                ...state,
                feinesprojecte: state.feinesprojecte.map( feina => feina._id === action.payload._id ? action.payload :feina),
                
            };
        case FEINA_ACTUAL:
            return {
                ...state,
                feinaseleccionada: action.payload
            };  
        case NETEJAR_FEINA:
            return {
                ...state,
                feinaseleccionada: null
            };
            
        default:
            return state;
    }
}