// Este archivo puede usarse para que el proyecto funcione con el json local en caso de que firebase por x motivo deje de funcionar. Solo hay que cambiar el
// Nombre a "firebase.js"

const leerBDD = async () => {
    const resp = await fetch("../json/productos.json")
    const data = await resp.json();
    const productos = data.map((prod) => [prod.id, prod])
    return productos;
}

const leerProducto = async (id) => {
    const resp = await fetch("../json/productos.json");
    const data = await resp.json();
    const producto = data.find((prod) => prod.id === id);
    const productoN = [producto.id, producto];
    return productoN;
}

const crearOrdeDeCompra = async () => {
    return ("123456789");
}
 
export {leerBDD, leerProducto, crearOrdeDeCompra};