//la capa de servicio es la que interactua con la base datos (con los datos)
//se implementa la logica procesar una transaccion
//se actualizaria la base de datos
//El serivicio trabaja con el Modelo
import Producto from "../models/productoModel.js";

const productos = [
    new Producto(1,"Raqueta",179990),
    new Producto(2,"Pelota",9990),
    new Producto(3,"Polera",19990),

]

//metodo que nos devuelva todos los productos

const getAllProductos = ()=> {
    return productos;
}

const getProductosById = () => {
    return productos.find(producto => producto.id === producto.id)
}

export {getAllProductos,getProductosById}