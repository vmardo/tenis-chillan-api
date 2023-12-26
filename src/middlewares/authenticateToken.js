//este archivo nos va servir para proteger los recursos de nuestra API
//jwt para comprobar la seguridad.
import jwt from "jsonwebtoken";

//funcion encargada de verificar el token
const authenticateToken = async (req,res,next) => {
    try {
      
        const authorizationHeader = req.headers.authorization

        const accessToken = authorizationHeader && authorizationHeader.split(" ")[1];

        console.log(accessToken);

        if (!accessToken) {
            return res.status(401).json({
                message: "No se ha proporcianado un token de acceso"
            })

        }
        


        next();

        //acceso al producto llamar a la funcion next

    } catch (error) {
        

    }


}

export default authenticateToken;