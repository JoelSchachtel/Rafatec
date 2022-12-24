import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensaje } from '../../utils/funcionesUtiles';

const arrayFiltro = [];

const Filtro = ({productos, ordenarPorPrecio}) => {

    const {categoria} = useParams();
    const {filterKeys} = useParams();
    const navigate = useNavigate();
    const [listaFiltro, setListaFiltro] = useState(<></>)
    let productosFiltrados = [];
     
    useEffect(() => {
        arrayFiltro.length = 0;
    }, [categoria]);


    const buscarSubOpciones = (opcion) => {                             //Buscamos todas las subopciones. Por ej. en Micros. En Marca seria "Amd y Intel"
        const subOpciones = [];             
        subOpciones.push(productosFiltrados[0][1][opcion]);
              
        for (let prod of productosFiltrados) {
            if (!(subOpciones.some((subOp) => subOp === prod[1][opcion]))) {
                subOpciones.push(prod[1][opcion])
            }
        }
        return subOpciones;
    }


    const setearArray = (e) => {                    //Pusheamos a opcion elegida en un array
        if (e.target.checked) {
            const obj = { "op" : e.target.parentNode.id.toLowerCase().replace(/\s+/g, "") , "sop" : e.target.nextSibling.innerHTML};
            arrayFiltro.push(obj);
        } else {
            const index = arrayFiltro.findIndex((elemento) => elemento.op === e.target.parentNode.id.toLowerCase().replace(/\s+/g, ""));
            arrayFiltro.splice(index, 1); 
        }
    }


    const cargarArray = () => {                     //Leemos las opciones del array de opciones y las pasamos a una url

        const urlarray = [];
        for (const el of arrayFiltro) {
            urlarray.push(el.op.concat("=",el.sop));
        }
        let url = "";
        for (const el of urlarray) {
            url = url + "&" + el;
        }
        url = url.slice(1);
        navigate (`/category/${categoria}/${url}`);
    }


    useEffect(() => {

           
        /***********************************lEEMOS LA URL Y LA PASAMOS LAS KEYS A UNA ARRAY *******************************************************/

        
        if (filterKeys && arrayFiltro.length === 0) {           //Este caso se da si ponemos manualmente la url
            const keys1 = filterKeys.split("&");
            for (const key of keys1) {
                const keys2 = key.split("=");
                arrayFiltro.push({ "op":keys2[0], "sop":keys2[1] });
            }
        }  
                
        /******************************************** Aplicamos el filtro en los productos***********************************************************/
        
        if (productos.length !== 0) {

            productosFiltrados = productos;
        
            for (let opcion of arrayFiltro) {                                                           //Filtramos por cada elemento en "arrayFiltro"
                productosFiltrados = productosFiltrados.filter((prod) => prod[1][opcion.op] === opcion.sop);
            }
            
            ordenarPorPrecio(productosFiltrados, "Precio Ascendente");
        } 

        if (filterKeys && productos.length !== 0 && productosFiltrados.length ===0) {           //Si ponemos una url con las keys de filtro directamente y no hay resultados
            mensaje("No se Encontraron Productos con el Filtro Aplicado", "back");                       // se genera una ventana de error
        }
        
        if (productosFiltrados.length !== 0) { 

            /**********************************************Actualizamos el filtro con sus opciones****************************************************/

            const opcionesFiltro = productosFiltrados[0][1].opcionesBusqueda;
            const opcionesYSubOpciones = [];

            for (let opcion of opcionesFiltro) {
                opcionesYSubOpciones.push(opcion);
                opcionesYSubOpciones.push(buscarSubOpciones(opcion.toLowerCase().replace(/\s+/g, "")))   //Pasamos a minuscula y eliminamos espacios en blanco
            }

            const opcionesYSubOpcionesJSX = [];
            let opc = "";

            for (let op of opcionesYSubOpciones) {
                if (typeof (op) === "string") {             //Si op e un string es porque es una opción. Por ejemplo:  "Marca"
                    opcionesYSubOpcionesJSX.push(<h5 className='filtro_opciones' key={op}>{op}</h5>);
                    opc = op;

                } else {                                    //Si op no es un "string" (no es una opción) es una lista de subopciones
                    for (let o of op) {                     //Si op es tipo object es porque se trata de un array de subopciones. Por ejemplo: ["Intel", "Amd"]
                        opcionesYSubOpcionesJSX.push(
                            <div className='cont_filtro_subopciones flex' key={o} id={opc}>
                                {                       
                                    ( op.length === 1 && !arrayFiltro.some((opt) => opt.op === opc.toLowerCase().replace(/\s+/g, "")) ) ?  //Si hay una sola subopción y no está en el filtro
                                                                                                                                           // (No está seleccionada). No ponemos su checkbox 
                                    <></> :

                                    <input 
                                        className='form-check-input check'
                                        type="checkbox" 
                                        checked = {
                                            arrayFiltro.some((opt) => opt.op === opc.toLowerCase().replace(/\s+/g, "")) 
                                        }
                                        onChange={(e) => { 
                                            setearArray(e);
                                            cargarArray();
                                        }}
                                    /> 
                                }
                                <p className='filtro_subopciones'>{o}</p>
                            </div>
                        );
                    }
                }
            } 
            setListaFiltro(opcionesYSubOpcionesJSX);
        } 
    }, [filterKeys, productos]);
    

    return (
        <>
            {listaFiltro}     
        </>
    );
}


export default Filtro;
