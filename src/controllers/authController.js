import {crearUsuario, getUsuarioByEmail} from '../services/usuarioService.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js';




export const register = async (req, res) => {

    const { nombre, email, password } = req.body;

    try {

        //verificar si ya existe un usuario con el mismo correo
        const usuarioExiste = await getUsuarioByEmail(email);
        if(usuarioExiste){
            //el usuario ya existe, no continuar con el registro
            return res.status(500).json({
                
                message: 'Ya existe un usuario con el mismo correo'
            })
        }

        console.log('registrando usuario....')

        //guardar el usuario
        const usuario = await crearUsuario(nombre, email, password);

        //GENERAR TOKEN DE ACCESO
        const accessToken = jwt.sign( { userId: usuario._id},SECRET_KEY, { expiresIn: '1h' } );

        res.status(201).json({
            accessToken
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al registrar el usuario'
        })
    }

}



export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        //verificar si el usuario existe
        const usuario = await getUsuarioByEmail(email);
        if(!usuario){
            //si no se encuentra un usuario por su correo, devolver message: credenciales invalidas
            return res.status(401).json({
                message: 'Credenciales invalidas'
            })
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);

        if(!passwordValida){
            return res.status(401).json({
                message: 'Credenciales invalidas'
            })
        }

        //en esta seccion ya hemos validado un login exitoso
        //GENERAR TOKEN DE ACCESO
        const accessToken = jwt.sign( { userId: usuario._id},SECRET_KEY, { expiresIn: '1h' } );

        res.status(201).json({
            accessToken
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al iniciar sesion'
        })
    }


}