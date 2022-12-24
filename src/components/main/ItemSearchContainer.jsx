import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import CardProducto from './CardProducto';  
import { leerBDD } from '../../utils/firebase';
import { mensaje } from '../../utils/funcionesUtiles';
import Spinner from './Spinner';

const ItemSearchContainer = () => {

    const {searchKeys} = useParams();
        
    const [productosPorBusqueda, setProductosPorBusqueda] = useState ([<Spinner key={"spinner"}/>]);

    useEffect(() => {
        
        leerBDD().then((BDD) => {

            const BDDFiltrada = BDD.filter((prod) => prod[1].describir.toLowerCase().includes(searchKeys.toLowerCase()));
            const BDDFiltradaJsx = BDDFiltrada.map((prod) => <CardProducto producto={prod} key={prod[0]}/>);
            BDDFiltradaJsx.length !== 0 ? setProductosPorBusqueda(BDDFiltradaJsx) : mensaje ("No Se Encontraron Productos", "back");

        })
        
    }, [searchKeys]);
 
    return (
        <>
            <div className="main__container flex">
                {productosPorBusqueda}
            </div>
        </>
    );
}

export default ItemSearchContainer;
