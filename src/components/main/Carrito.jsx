import React, { useState, useEffect, useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import CardProductoCarrito from './CardProductoCarrito';
import { leerBDD } from '../../utils/firebase';
import Form from './Form';
import { mensaje } from '../../utils/funcionesUtiles';
import Spinner from './Spinner';

const Carrito = () => {
    
    const {carrito, carritoTotal, setearCarritoTotal, vaciarCarrito} = useContext (CarritoContext);
    const [productosEnCarrito, setProductosEnCarrito] = useState ([<Spinner key={"spinner"}/>]);
    const [mostrarForm, setMostrarForm] = useState(false);
     
    useEffect(() => {

        const productosCarrito = [];
        
        leerBDD().then((BDDEnArray) => {

            for (let producto of carrito) {

                const productoEnCarrito = BDDEnArray.find((prod) => prod[0] === producto.id);
                productoEnCarrito[1].cantidad = producto.cantidad;          //Agregamos en el producto una campo "cantidad" con la cantidad leida en el carrito
                productosCarrito.push(productoEnCarrito);
            }

            const sumaTotalCarrito = productosCarrito.reduce((ac, prod) => ac + (prod[1].cantidad * prod[1].precio), 0);
            const productosEnCarritoJsx = productosCarrito.map((prod) => <CardProductoCarrito producto = {prod} suma={sumaTotalCarrito} key={prod[0]}/>);
            setProductosEnCarrito (productosEnCarritoJsx);
            setearCarritoTotal(sumaTotalCarrito, true);
        })

        if(carrito.length === 0) {
            mensaje("El Carrito Está Vacío")
        }

    }, [carrito.length]);                   //Si cambia carrito.length es porque eliminamos un producto del carrito   

    
    const toggleForm = (e) => {
        if (e.target.id === "cont_formulario" || e.target.id === "close") {
            setMostrarForm(false);
        }
    }
 
    
    if (carrito.length > 0) {

        return (
            <>
                {mostrarForm && <Form toggleForm={toggleForm}/>}
                <div className="main__container__carrito flex">
                    {productosEnCarrito}
                    <div className='flex wrap cont_botones_grandes'>
                        <div className='flex contTotalCarrito'>
                            <p className='textoTotal_carrito'>Total: &nbsp;</p>
                            <div className='precioTotal_carrito'>${carritoTotal}</div>
                        </div>
                        <div className='flex contTotalCarrito pointer cont_continuar' onClick={() => setMostrarForm(true)} >
                            <p className='botonConfirmar continuar_texto'>Continuar Compra</p>
                        </div>
                    </div>
                    <div className='cont_volver'>
                        <div className='flex botonVaciar' onClick={(() => window.history.back())}>
                            <p className='textoVaciarCarrito'>Volver</p>
                        </div>
                        <div className="botonVaciar flex" onClick={vaciarCarrito}>
                            <img src="../images/vaciar3.png" alt="" className='iconoVaciarChico'/>
                            <p className='textoVaciarCarrito'>Vaciar Carrito</p>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="main__container flex">
                <div className='contTotalCarrito flex'>
                    <h2 className='textoTotal_carrito'>Tu Carrito está Vacío</h2>
                </div>
            </div>
        );
    }
}

export default Carrito;
