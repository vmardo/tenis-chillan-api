//vamos importar nuestro modelo creado
import Usuario from "../models/usuarioModel.js"
import bcrypt from "bcrypt";

//vamos crear un metodo de prueba (nos ayuda crear usuario).Cada funcion que se comunica con la base de datos es async
//en los parametros solicitamos lo que pedimos al usuario
//linea 9 :generamos una constante para guardar los parametros antes que lleguen a la base de datos.
export const crearUsuario = async (nombre,email,password) => {

    const hashedEncriptada = await bcrypt.hash(password,10);

//este objeto es de tipo modelo
//linea 17: usuario.save() es el encargado de guardar en la base de datos
//linea 20:para retornar el usuario
    const usuario = new Usuario({
        nombre,
        email,
        password : hashedEncriptada
    })

    await usuario.save();

    return usuario;

}
//aca vamos crear una funcion que nos devuelva un usuario por id
export const getUsuarioById = async userId => {
    try {
        const usuario =  await Usuario.findById(userId);  
        return usuario;

    } catch (error) {
        console.log(error)
    }
    
}


//este metodo va buscar un correo de un usuario
//findOne ---> busca un campo en especifico

export const getUsuarioByEmail =  async email => {
    return await Usuario.findOne({email})
}

//actulizar al usuario en la base de datos
//aca solicitamos userId y los datos a modificar
export const actualizarUsuario = async (userId,nombre,password) => {

try {
    //buscar la usuario
   const usuario =  await getUsuarioById(userId);

   if(!usuario){
    throw new Error("Usuario no Encontrado")
   }

   //actualizar nombre  y password 
   usuario.nombre = nombre;
   usuario.password = await bcrypt.hash (password,10);

   //aca vamos guardar al usuario
   return await usuario.save();
} catch (error) {
    console.error(error);
    
}

}

