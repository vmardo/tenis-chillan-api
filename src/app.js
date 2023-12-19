//importando express
import express from "express";
import router from "./routes/productoRoute.js";
//aca vamos importar router creado en productoRoute.js
//aca vamos importar dotenv
import dotenv from "dotenv"
import { conectDb } from "./db.js";
//METODO DE DOTENV
dotenv.config();

//indicando a nuestra aplicacion que utilizaremos express(instancia de express)
const app = express();
//nuestro puerto va tomar el valor que devuelva dotenv
const PORT = process.env.PORT || 3000 ;

//crear ruta
//req:este objeto contiene informacion sobre la solicitud del cliente
//res:se utiliza para enviar la respuesta al cliente
//ejemplo ruta con parametro: /producto?id=8172527276
//para acceder al paremtro de una consulta debo capturar el objeto de req y su propiedad de query(cadena)

//app.get("/productos",(req,res)=>{
//    console.log("se hizo una consulta a la ruta/productos")
//    res.send("devolviendo lista de productos2 ...")
//    });


//conexion base de datos
conectDb();


//usar nuestro router,aca productos queda como prefijo para las demas rutas...
app.use("/productos",router)


//levantando servidor del express
//const puerto = 3000;

//metodo listen que sirve para escuchar nuestra aplicacion en el puerto señalado. //----> (puerto,funcion)
app.listen(PORT,()=>{
    console.log("El servidor de Express esta escuchando en el puerto:" + PORT)
    
})  


