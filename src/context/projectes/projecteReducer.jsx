import { 
    FORMULARI_PROJECTE, 
    OBTENIR_PROJECTES,
    AFEGIR_PROJECTE,
    PROJECTE_ERROR,
    VALIDAR_FORMULARI,
    PROJECTE_ACTUAL,
    ELIMINAR_PROJECTE
} from '../../types';


export default (state, action ) => {
    switch(action.type) {
        case FORMULARI_PROJECTE:
            return {
                ...state,
                formulari: true
            };
        case OBTENIR_PROJECTES:
           // console.log(action.payload);
            return {
                ...state,
                projectes: action.payload
            };
        case AFEGIR_PROJECTE:
            return {
                ...state,
                projectes: [...state.projectes, action.payload],
                formulari: false,
                errorformulari: false
            };
        case VALIDAR_FORMULARI:
            return {
                ...state,
                errorformulari: true
            };
        case PROJECTE_ACTUAL:
            return {
                ...state,
                projecte: state.projectes.filter(projecte => projecte._id === action.payload)
            };
        case ELIMINAR_PROJECTE:
            return {
                ...state,
                projectes: state.projectes.filter(projecte => projecte._id !== action.payload),
                projecte: null
            };    
        case PROJECTE_ERROR: 
            return {
                ...state,
                missatge: action.payload
            };
        default:
            return state;
    }
};