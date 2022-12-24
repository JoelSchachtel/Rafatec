import React from 'react';
import { mensaje } from '../../utils/funcionesUtiles';

const Error404 = () => {
    mensaje ("Ruta No Válida", "back");
    return (
        <div className="main__container flex"></div>
    );
}

export default Error404;
