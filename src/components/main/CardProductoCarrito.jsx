import React, { useState, useContext, useEffect } from 'react';
import { CarritoContext } from '../../context/CarritoContext';

const CardProductoCarrito = ({producto}) => {

    const {masMenosUnoCarrito, eliminarDelCarrito, carrito, setearCarritoTotal} = useContext(CarritoContext);
  
    const [inc, setInc] = useState(0);

    useEffect(() => {               //Al eliminar un producto de carrito este se recarga con los productos restantes, inc vuelve a ser 0
       setInc(0);
    }, [carrito.length]);
   
    const masMenosCarrito = (id, op) => {                                                                                                 //Validación de cantidad de poductos elegidos.
        if ( (op === "+" && (producto[1].cantidad + inc) < producto[1].stock) || (op === "-" && (producto[1].cantidad + inc) > 1)) {      //Solo podemos elegir una cantidad entera mayor a cero y menor o igual al stock
            masMenosUnoCarrito (id, op);
            op === "+" ? setInc (inc + 1) : setInc (inc - 1);
            op === "+" ? setearCarritoTotal ((+producto[1].precio), false) : setearCarritoTotal ((-producto[1].precio), false);
        }    
    }

    const total = producto[1].precio * (producto[1].cantidad + inc);

    return (
        <div className="cardProducto_carrito" key={producto[0]}>
            <div className="contImg_carrito">
                <img className="imgProducto_carrito" src={`${producto[1].imgScr}`} alt="" />
                <p className="stock_carrito">Stock: {producto[1].stock} unidades</p>
            </div>
            <div className="contDetalle_producto_carrito flex">
                <div className='descProducto_detalle_carrito'>{producto[1].describir}</div>
            </div>
            <div className="flex column contCant_carrito">
                <div className='cantidadTxt flex'>Cantidad</div>
                <div className="cantidad">
                    <button className="botonMasMenos flex" onClick={() => masMenosCarrito(producto[0], "-")}>-</button> 
                    <div className="inputCantidad flex"> {producto[1].cantidad + inc} </div>   
                    <button className="botonMasMenos flex" onClick={() => masMenosCarrito(producto[0], "+")}>+</button>
                </div>
            </div>
            <div className='contVaciar flex column' onClick={() => eliminarDelCarrito(producto[0])}>      
                <p className='textoVaciar'>Eliminar</p>
                <img src="../images/vaciar3.png" className='iconoVaciar' alt="" />
            </div>
            <div className='precioProducto_carrito'>${total}</div>
        </div>
    );
}

export default CardProductoCarrito;
