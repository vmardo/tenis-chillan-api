//vamos importar nuestro modelo creado
import Usuario from "../models/usuarioModel.js"

//vamos crear un metodo de prueba (nos ayuda crear usuario).Cada funcion que se comunica con la base de datos es async
//en los parametros solicitamos lo que pedimos al usuario
//linea 9 :generamos una constante para guardar los parametros antes que lleguen a la base de datos.
export const crearUsuario = async (nombre,email,password) => {

//este objeto es de tipo modelo
//linea 17: usuario.save() es el encargado de guardar en la base de datos
//linea 20:para retornar el usuario
    const usuario = new Usuario({
        nombre,
        email,
        password,
    })

    await usuario.save();

    return usuario;

}
//este metodo va buscar un correo de un usuario
//findOne ---> busca un campo en especifico

export const getUsuarioByEmail =  async email => {
    return await Usuario.findOne({email})
}

