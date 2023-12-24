        //aca vamos hacer los metodos clasicos de auntenticacion.Registro y Login

        //Registro
        import {crearUsuario,getUsuarioByEmail} from "../services/usuarioService.js";

        //creamos nuestra funcion de registro
        //aca debemos extraer los parametros 
        //colocando export adelante podemos exportar 

        export const register = async (req,res) => {
            const {nombre,email,password} = req.body;

    
        try {
            
        //verificar si ya existe un usuario con el mismo correo
        const usuarioExiste = await getUsuarioByEmail(email);
        if(usuarioExiste){
        //el usuario ya existe,no continuar con el registro
        return res.status(400).json({
            message: "Ya existe un usuario con el mismo correo"
        })
        }
        
        console.log("registrando usuario...")

        //guardar usuario
        const usuario = await crearUsuario(nombre,email,password);

        res.status(201).json({
            message: "Usuario creado con exito"
        })

        } catch (error) {
                console.error(error);
                res.status(500).json({
                    massage: "Ha ocurrido un error al registrar el usuario"
                })
        }
        
}
    




    export const login = async (req,res) => {
    console.log("logeando usuario...")
    

    res.status(201).json({
        message: "Usuario creado con exito"
    })

    } 
       



