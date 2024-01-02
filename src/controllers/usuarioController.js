import { getUsuarioById,actualizarUsuario } from "../services/usuarioService.js";


export const getUsuarioActual = async (req,res) => {
    try {
        const userId = req.usuario._id;
        const usuario = await  getUsuarioById(userId);

        if(!usuario){
            res.startus(404).json({message:"Usuario no encontrado"})

        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error(error)
    }
}

export const actualizarUsuarioController = async (req,res) => {

    try {

        console.log("actualizar datos")
        console.log(req.body)
        const {id} = req.params;
        const {nombre,password} = req.body

        const usuarioActualizado = await actualizarUsuario(id,nombre,password);

        //aca vamos devolver al usuario
        res.status(200).json(usuarioActualizado)

    } catch (error) {
        res.startus(404).json({message:"Ha ocurrido un error al actualizar el usuario"})

    }
}