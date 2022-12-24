import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../../context/CarritoContext';

const CartWidget = () => {
    
    const {carritoCant} = useContext (CarritoContext);
    


    if (carritoCant > 0) {
        return (
            <div className="contCarrito">
                <Link to={"/cart"}>   
                    {carritoCant > 0 ? <div className='iconoCarrito_cantidad flex'> {carritoCant} </div> : <></>}     
                    <img className="iconoCarrito" src="../images/icono_carrito2.png" alt="" /> 
                </Link>
            </div>
        );
    } else {
        return (
            <div className="contCarrito">
                <img className="iconoCarrito iconoCarrito_vacio" src="../images/icono_carrito2.png" alt=""/> 
            </div>
        )
    }


    
}

export default CartWidget;
