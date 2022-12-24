import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CardProducto from './CardProducto';
import { leerBDD } from '../../utils/firebase';
import { mensaje } from '../../utils/funcionesUtiles';
import Filtro from './Filtro';
import Spinner from './Spinner';

const ItemCategoryContainer = () => {

    const {categoria} = useParams();
    const [productosPorCategoria, setProductosPorCategoria] = useState ([<Spinner key={"spinner"}/>]);
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const ordenar = useRef();     

    useEffect(() => {
        
        leerBDD().then((BDD) => {
            const BDDFiltrada = BDD.filter((prod) => prod[1].categoria === categoria);
            if (BDDFiltrada.length !== 0) {
                ordenarPorPrecio(BDDFiltrada) 
                setProductosFiltrados(BDDFiltrada);
                setProductos(BDDFiltrada);
            } else {    
                mensaje ("Lo sentimos, esta categoría no está disponible.", "back")
            }
        })
    }, [categoria]);
    
    
    const ordenarPorPrecio = (products) => {
        
        const op = ordenar.current.value;
        (op === "Precio Ascendente") ? products.sort((a,b) =>  a[1].precio - b[1].precio) : products.sort((a,b) =>   b[1].precio - a[1].precio);
        const ProductosJsx = products.map((prod) => <CardProducto producto={prod} key={prod[0]}/>);
        setProductosPorCategoria(ProductosJsx);
    }
   
    
    return (
        <>
            <div className='main__container__categorias'>
                <div className='cont__filtro__flex flex'>
                    <div className='cont__filtro flex column'>
                        <div className='filtro_precio'>
                            <p className='filtro_precio_titulo'>Ordenar por:</p>
                            <select className='form-select' onChange={() => ordenarPorPrecio(productosFiltrados)} ref={ordenar}>
                                <option>Precio Ascendente</option>
                                <option>Precio Descendente</option>
                            </select>
                        </div>
                        <div>
                            <Filtro productos={productos} ordenarPorPrecio={ordenarPorPrecio}/>
                        </div>
                    </div>
                </div>    

                <div className='cont_productos_categoria'>
                    {productosPorCategoria}
                </div>
            </div>
        </>    
    );
}

export default ItemCategoryContainer;
