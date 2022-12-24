import React from 'react';
import { useRef, useContext} from 'react';
import Swal from 'sweetalert2';
import { CarritoContext } from '../../context/CarritoContext';
import { crearOrdeDeCompra } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Form = ({toggleForm}) => {
    
    const {carritoTotal, vaciarCarrito} = useContext (CarritoContext);
    const formulario = useRef();
    const navigate = useNavigate();
    window.scrollTo({top:(document.body.offsetHeight/2)-(window.innerHeight/2)});           //Movemos el scroll hasta centrar el form en pantalla

    const subirOrden = (e) => {
        e.preventDefault();
                
        const formDatos = new FormData (formulario.current);
        const datos = Object.fromEntries(formDatos);
        datos.total = carritoTotal;
        
        if (datos.nombreApellido.trim() !=="" && datos.dni.trim() !=="" && datos.direccion.trim() !=="" && datos.email.trim() !=="" && datos.telefono.trim()!=="" &&
            datos.email2.trim() !=="" && datos.email === datos.email2) {  
            crearOrdeDeCompra(datos).then((data) => {
                vaciarCarrito();
                navigate("/");
                document.body.style.overflow = "visible";
                const ordenId = data.id
                Swal.fire({
                    title: 'Gracias por Elegirnos!',
                    text: `Tu orden de compra es la Nº: ${ordenId}`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                    scrollbarPadding: false
                })
            });
        }else if (datos.email !== datos.email2) {
            Swal.fire({
                title: 'Ingrese 2 Veces su Email',
                text: `Vuelva a intentar`,
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        }else {
            Swal.fire({
                title: 'Faltan ingresar datos',
                text: `Vuelva a intentar`,
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        }    
    }     
 
    return (
        <>
            <div className='cont_formulario flex' id="cont_formulario" onClick={((e) => toggleForm(e))} style={{height:document.body.offsetHeight+"px", top:0}}>
                <img className='closeForm' src="../images/close.png" alt="" id="close" onClick={toggleForm}/>        
                <form id="formulario" className="flex form" ref={formulario} onSubmit={(e) => subirOrden(e)} >
                    <h1 className="formulario_titulo">Complete con sus datos para continuar:</h1>
                    <input id="formNombre" className="input" type="text" name="nombreApellido" placeholder="Nombre y Apellido"/>
                    <input id="formNombre" className="input" type="text" name="dni" placeholder="DNI" />
                    <input id="formNombre" className="input" type="text" name="direccion" placeholder="Dirección" />
                    <input id="formMail" className="input" type="email" name="email" placeholder="E-Mail" />
                    <input id="formMail" className="input" type="email" name="email2" placeholder="Reingresa Tu E-Mail" />
                    <input id="formMail" className="input" type="tel" name="telefono" placeholder="Teléfono" />
                    <button className="formulario_boton flex" type="submit" name="enviar">CONFIRMAR COMPRA</button>
                </form>
            </div>
        </>
    );
}

export default Form;
