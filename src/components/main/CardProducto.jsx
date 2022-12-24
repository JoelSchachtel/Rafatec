import React from 'react';
import { Link } from 'react-router-dom';

const CardProducto = ({producto}) => {

    return (
        <div className="cardProducto flex">
            <img className="imgProducto" src={producto[1].imgScr} alt=""/>
            <div className='descProducto'>{producto[1].describir}</div>
            <Link to={`/item/${producto[0]}`}> <button className='botonProducto'>Ver Detalles</button> </Link>
            <div className='precioProducto'>${producto[1].precio}</div>
        </div>
    );
}

export default CardProducto;
