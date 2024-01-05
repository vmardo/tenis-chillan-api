//la capa de servicio es la que interactua con la base datos (con los datos)
//se implementa la logica procesar una transaccion
//se actualizaria la base de datos
//El serivicio trabaja con el Modelo
import Producto from "../models/productoModel.js";


//metodo que nos devuelva todos los productos

const getAllProductos = async()=> {
    return await Producto.find();
}

const getProductoById = async productoId => {
    return await Producto.findById(productoId)
}

const getProductosByCategoria = async categoria => {
    return await Producto.find({categoria: categoria})

}

export {getAllProductos,getProductoById,getProductosByCategoria}