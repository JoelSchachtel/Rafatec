import React, {createContext, useState} from 'react';

const CarritoContext = createContext();
const CarritoProvider = ({children}) => {

    const [carrito, setCarrito] = useState([]);
    const [carritoCant, setCarritoCant] = useState(0);
    const [carritoTotal, setCarritoTotal] = useState(0);
    
    const agregarAlCarrito = (id, cantidad) => {
        const carritoAux = carrito;
        const indice = carritoAux.findIndex((prod) => prod.id === id)       //Verificamos si el producto agregado ya está en el carrito
                                                                            // si ya está en el carrito findIndex devuelve el indice donde se encuentra, si nó esta en el carrito devuelve -1
        if (indice !== -1) {                    
            carritoAux.splice(indice, 1)
        }

        carritoAux.push({"id":id, "cantidad":cantidad})
        setCarrito(carritoAux);
        setearCarritoCantidad ();
    }

    const masMenosUnoCarrito = (id, op) => {            //Sumamos o restamos una unidad según el valor de op
        const carritoAux = carrito;
        const indice = carritoAux.findIndex((prod) => prod.id === id);

        (op === "+") ? carritoAux[indice].cantidad++ : carritoAux[indice].cantidad--;
        setCarrito(carritoAux);
        setearCarritoCantidad ();
    }

    const setearCarritoCantidad = () => {
        if (carrito.length > 0) {                                                                   //Si carrito.length = 0 es porque el carrito esta vacío 
            const cantidadEnCarrito = carrito.reduce((ac, el) => ac + el.cantidad, 0);              //Calculamos la cantidad de items en el carrito
            setCarritoCant (cantidadEnCarrito);                                                     //Seteamos la cantidad en el icono del carrito
        } else {
            setCarritoCant (0);
        }                                                    
    }

    const eliminarDelCarrito = (id) => {
        const carritoAux = carrito;
        const indice = carritoAux.findIndex((prod) => prod.id === id);
        carritoAux.splice(indice, 1);
        setCarrito(carritoAux);
        setearCarritoCantidad ();
    }

    const setearCarritoTotal = (valor, set) => {
        set? setCarritoTotal(valor) : setCarritoTotal(carritoTotal + valor);
    }

    const vaciarCarrito = () => {
        carrito.length = 0;             //Se probó con setCarrito([]) y no funcionó (?)
        setCarrito(carrito);
        setearCarritoCantidad ();
    }

    return (
        <CarritoContext.Provider value={{carrito, eliminarDelCarrito, agregarAlCarrito, masMenosUnoCarrito, carritoCant, setearCarritoTotal, carritoTotal, vaciarCarrito}}>
            {children}
        </CarritoContext.Provider>
    );
}

export {CarritoProvider, CarritoContext};
