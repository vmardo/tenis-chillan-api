//la ruta permite generar una url para que el usuario pueda consultar 
import express from "express";
import { getAllProductos,getProductoById} from "../controllers/productoController.js";

//metodo de express para manejar las rutas(objeto)

const router = express.Router();

//rutas
router.get("/",getAllProductos);
router.get("/:id",getProductoById);

export default router;