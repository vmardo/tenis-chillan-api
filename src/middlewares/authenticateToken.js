import jwt from 'jsonwebtoken';
import { getUsuarioById } from '../services/usuarioService.js';
import dotenv from 'dotenv';

dotenv.config();

//funcion encargada de verificar el token
export const authenticateToken = async (req, res, next) => {

    try {
        
        const authorizationHeader = req.headers.authorization;
        const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];


        if(!accessToken){
            return res.status(401).json({
                message: 'No se ha proporcionado un token de acceso'
            })
        }

        const tokenDecodificado = jwt.verify(accessToken, process.env.SECRET_KEY );
        const usuario = await getUsuarioById(tokenDecodificado.userId);

        if(!usuario){
            return res.status(401).json({
                message: 'Token de acceso no valido'
            })
        }

        req.usuario = usuario;
        next();

    } catch ( error ) {
        


    }

}
