import { initializeApp } from "firebase/app";
import {collection, doc, addDoc, getFirestore, getDoc, getDocs} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAP_9LBGe5pRtYoOyRMLApZ3NlXxlMVRhg",
    authDomain: "rafatec-b59a0.firebaseapp.com",
    projectId: "rafatec-b59a0",
    storageBucket: "rafatec-b59a0.appspot.com",
    messagingSenderId: "1041231705062",
    appId: "1:1041231705062:web:e8315350fd610c970a1c27"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const bd = getFirestore();

const subirBDD = async () => {
    const resp = await fetch("../json/productos.json");
    const productos = await resp.json();
    productos.forEach (
        async (producto) => {
            await addDoc(collection(bd,"productos"), {
                "categoria": producto.categoria,
                "marca": producto.marca,
                "modelo": producto.modelo,
                "precio": producto.precio,
                "imgScr": producto.imgScr,
                "stock": producto.stock,

                "socket": producto.socket,
                "frecuencia": producto.frecuencia,
                "tipodememoria": producto.tipodememoria,
                "cantidaddememoria": producto.cantidaddememoria,
                "tdp": producto.tdp,
                "serie": producto.serie,
                "certificacion": producto.certificacion,
                "potencia": producto.potencia,
                "rgb": producto.rgb,
                
                "opcionesBusqueda": producto.opcionesBusqueda,
                "describir": producto.describir
            })
        }
    )
}

const leerProducto = async (id) => {                                         //Buscamos y leemos un producto por id en la BDD
    const prod = await getDoc(doc(bd,"productos",id));
    const producto = [prod.id, prod.data()];                                //producto es un array de 2 posiciones, la primera tiene el id del producto (generado automaticamente por firebase)
    return producto;                                                        //la segunda  posición tiene los datos del producto obtenidos con el método data()
}

const leerBDD = async () => {
    const BDD = await getDocs(collection(bd,"productos"));                                            //Leemos la BDD - nos devuelve un objeto cuya propiedad "docs" contiene un array con los productos
    const BDDEnArray = BDD.docs.map((producto) => [producto.id, producto.data()]);  
    return BDDEnArray;
}

const crearOrdeDeCompra = async (obj) => {
    const ordenDeCompra = await addDoc(collection(bd, "ordenesDeCompra"),{
        "nombreApellido": obj.nombreApellido,
        "dni": obj.dni,
        "direccion": obj.direccion,
        "email": obj.email,
        "telefono": obj.telefono,
        "total": obj.total
    })

    return ordenDeCompra;
}


//subirBDD();


export {subirBDD, leerProducto, leerBDD, crearOrdeDeCompra};