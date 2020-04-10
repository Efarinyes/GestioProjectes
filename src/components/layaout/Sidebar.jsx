import React from 'react';
import NouProjecte from '../projectes/NouProjecte';
import LlistatProjectes from '../projectes/LlistatProjectes';

const Sidebar = () => {
    return ( 
        <aside>
            <h1>Gestor<span>Projectes</span></h1>
            <NouProjecte />
            <div className='proyectos'>
                <h2>Els teus projectes</h2>
                <LlistatProjectes />
                
            </div>
            
        </aside>
         
     );
}
 
export default Sidebar;
