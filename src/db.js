//configuracion para la conexion a la base de datos

import mongoose from "mongoose"
import { MONGODB_URI } from "./config/config.js"

//METODO DE DOTENV


//funcion para conectarnos a la base de datos
//este recibi una uri de coneccion
//await es una instruccion que nos permite esperar a que se ejecute una linea para ejecutar la siguiente.
export const conectDb = async ()=> {

    try {
       await mongoose.connect(process.env.MONGODB_URI) 
        console.log("Conexion exitosa")

    } catch (error) {
        console.error(error)
    }
}