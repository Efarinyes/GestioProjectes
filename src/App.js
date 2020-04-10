import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NouCompte from './components/auth/NouCompte';
import Projectes from './components/projectes/Projectes';

import ProjecteState from './context/projectes/projecteState';
import FeinaState from './context/feines/feinaState';

import AlertaState from './context/alertes/alertaState';
import AuthState from './context/autenticacio/authState';
import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';

// Comprobem si existeix Token d'usuari
const token = localStorage.getItem('token');
if (token) {
    tokenAuth(token);
}

function App() {    

    

    return ( 
    <ProjecteState>
        <FeinaState>
            <AlertaState>
                <AuthState>
                    <Router >
                        <Switch >
                            <Route exact path = '/'component = { Login }/> 
                            <Route exact path = '/nou-compte'component = { NouCompte }/> 
                            <RutaPrivada exact path = '/projectes' component = { Projectes }/>  
                        </Switch>
                    </Router> 
                </AuthState>
            </AlertaState>
        </FeinaState>
    </ProjecteState>
    );
}

export default App;