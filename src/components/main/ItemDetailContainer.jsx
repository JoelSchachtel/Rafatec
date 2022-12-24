import React, { useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import { leerProducto } from '../../utils/firebase';
import CardProductoDetail from './CardProductoDetail';
import { mensaje } from '../../utils/funcionesUtiles';
import Spinner from './Spinner';

const ItemDetailContainer = () => {
    
    const {id} = useParams();
    const [producto, setProducto] = useState ([<Spinner key={"spinner"}/>]);

    useEffect(() => {
        
        leerProducto(id).then((prod) => {
            prod[1] ? setProducto(<CardProductoDetail producto={prod}/>) : mensaje ("El Producto no Existe", "back");
        });
                
    },[id]);

    return (
        <>  
            <div className="main__container flex">
                {producto}
            </div>
        </>
    );
}

export default ItemDetailContainer;
