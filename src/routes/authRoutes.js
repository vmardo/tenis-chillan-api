//aca vamos importar express
import express from "express"
//importamos la funcion de auth controller
import { register,login } from "../controllers/authController.js";
//vamos ha crear un objeto router que se capaz de crear las rutas

const router = express.Router();

//creando rutas para registrarse e iniciar sesion. Get --->obtener (por ejemplo productos)
//segundo parametro es: la funcion del controlador que queremos que se ejecute una vez se visita una ruta.
router.post("/register", register)
router.post("/login", login)

export default router;