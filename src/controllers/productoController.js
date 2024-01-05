//servicio lo comunicamos con controlador.
//los controladores son los encargados en procesar las solicitudes http(buscar un producto,crear un producto,etc)
import { getAllProductos,getProductoById,getProductosByCategoria } from "../services/productoService.js";

//los controladores manejan (req,res); req---> solicitudes http y res--->respuesta del usuario.
//generamos dos funciones asociado a lo importado.Vamos generar un try y catch para manejar posibles errores.

const getAllProductosController = async (req,res) =>{
    try {
        const productos = await getAllProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
   
}

const getProductoByIdController = async (req,res) => {
    const productoId = req.params.id;
    try {
        
        const producto = await getProductoById(productoId);

        producto ? res.json(producto) : res.status(404).json({error:"producto no encontrado"})
       
    } catch (error) {
        res.status(500).json({error:error.message})  
    }

}

const getProductosByCategoriaController = async (req,res) => {
    const categoria = req.params.categoria;

    try {
        
        const productos = await getProductosByCategoria(categoria);
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export {
    getAllProductosController as getAllProductos,
    getProductoByIdController as getProductoById,
    getProductosByCategoriaController  as getProductosByCategoria
}
