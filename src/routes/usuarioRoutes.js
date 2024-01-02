//aca vamos importar express
import express from "express"
//importamos la funcion de auth controller
import {getUsuarioActual,actualizarUsuarioController } from "../controllers/usuarioController.js";
import {authenticateToken} from "../middlewares/authenticateToken.js";
//vamos ha crear un objeto router que se capaz de crear las rutas

const router = express.Router();
//esta enfocado al crud de usuarios
//creando rutas para registrarse e iniciar sesion. Get --->obtener (por ejemplo productos)
//segundo parametro es: la funcion del controlador que queremos que se ejecute una vez se visita una ruta.
router.get("/detalles",authenticateToken,getUsuarioActual)
router.put("/id",authenticateToken,actualizarUsuarioController)


export default router;

