//la ruta permite generar una url para que el usuario pueda consultar 
import express from "express";
import { getAllProductos } from "../controllers/productoController.js";

//metodo de express para manejar las rutas(objeto)

const router = express.Router();

//rutas
router.get("/",getAllProductos);

export default router;