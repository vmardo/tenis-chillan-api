//importamos mongoose
import mongoose from "mongoose";
//posteriormente creamos nuestro esquema
const usuarioSchema = new mongoose.Schema ({
    nombre : {type: String, required: true},
    email : {type: String, required: true,unique:true},
    password : {type: String, required: true},
})

//generamos la constante para posteriormente exportarla a la capa de servicio
//modelo(requiere nombre,schema)

const Usuario = mongoose.model("Usuario",usuarioSchema);      

export default Usuario;
    

