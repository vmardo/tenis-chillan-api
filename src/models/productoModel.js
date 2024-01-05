//modelo --->servicio--->controlador--->route
//importando modulo mongoose para empezar ha realizar esquema.
import mongoose from "mongoose";
//para crear nuestro esquema
const productoSchema  = new mongoose.Schema({
    nombre: {type:String, required:true},
    descrpcion: {type:String, required:true},
    url_imagen: {type:String },
    tipo: {type:String},
    categoria: {type:String},
    porcentajeDescuento:{type:Number},
    precio_actual:{type:Number},

})

//vamos crear el modelo ya creado el esquema ..en esta funcion debemos pasar el primer parametro en singular y posteriormente el esquema.
const Producto = mongoose.model("Producto",productoSchema);


export default Producto;