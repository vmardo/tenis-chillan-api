//servicio lo comunicamos con controlador.
//los controladores son los encargados en procesar las solicitudes http(buscar un producto,crear un producto,etc)
import { getAllProductos,getProductosById } from "../services/productoService.js";

//los controladores manejan (req,res); req---> solicitudes http y res--->respuesta del usuario.
//generamos dos funciones asociado a lo importado.

const getAllProductosController = (req,res) =>{
    const productos = getAllProductos();
    res.json(productos);
}

export {getAllProductosController as getAllProductos}
