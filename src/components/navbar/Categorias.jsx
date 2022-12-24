import React from 'react';
import { Link } from 'react-router-dom';

const Categorias = () => {
    return (
        <>  
            <li className="nav-item" key="Home">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item" key="Microprocesadores">
                <Link className="nav-link" to="/category/Microprocesadores">Microprocesadores</Link>
            </li>
            <li className="nav-item" key="Motherboards">
                <Link className="nav-link" to="/category/Motherboards">Motherboards</Link>
            </li>
            <li className="nav-item" key="Memorias RAM">
                <Link className="nav-link" to="/category/memorias_ram">Memorias RAM</Link>
            </li>
            <li className="nav-item" key="Placas de video">
                <Link className="nav-link" to="/category/placas_de_video">Placas de video</Link>
            </li>
            <li className="nav-item" key="Fuentes">
                <Link className="nav-link" to="/category/Fuentes">Fuentes</Link>
            </li>
        </>                
    );
}

export default Categorias;
