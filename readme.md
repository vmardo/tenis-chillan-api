//aca vamos hacer los metodos clasicos de auntenticacion.Registro y Login

        //Registro
        import {crearUsuario,getUsuarioByEmail} from "../services/usuarioService.js";
        import bcrypt from "bcrypt";
        import jwt from "jsonwebtoken";
        import dotenv from "dotenv";

        dotenv.config();

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

        //GENERAR TOKEN DE ACCESO
        //payload es la informacion que queremos incluir en nuestro TOKEN(EJEMPLO ID,PASSWORD)
        //sing ---> sus parametros son (payload,claveSecreta,variables de opeciones(tiempo de duracion))
        const accessTOKEN = jwt.sign({userId: usuario._id} , process.env.SECRET_KEY,{expiresIn:"1h"})

        res.status(201).json({
            accessTOKEN
        })

        } catch (error) {
                console.error(error);
                res.status(500).json({
                    massage: "Ha ocurrido un error al registrar el usuario"
                })
        }
        
    }
    

        export const login = async (req,res) => {
    
            const {email,password} = req.body;
            try {
                
           
            //verificar si el usuario existe
            const usuario = await getUsuarioByEmail(email);
            if(usuario){
            //si no se encuentra el usuario por su correo,devolver message: crednciales invalidas
            return res.status(401).json({
            message: "Credenciales invalidas"
        })
        
     }

        const passwordValida = await bcrypt.compare(password,usuario.password);

        if(!password){
            return res.status(401).json({
                message: "Credenciales invalidas"
            })
        }

        //en esta seccion ya hemos validado un Login exitoso
        //generar un token de acceso
        const accessTOKEN = jwt.sign({userId: usuario._id} , process.env.SECRET_KEY,{expiresIn:"1h"})

        res.status(201).json({
            accessTOKEN
        })

        } catch (error) {
        console.error(error);
        res.status(500).json({
        massage: "Ha ocurrido un error al iniciar sesion"
                                                              })    
        }
     }

     
este es borrador de authController.js

authenticateToken.js

//este archivo nos va servir para proteger los recursos de nuestra API
//jwt para comprobar la seguridad.
import jwt from "jsonwebtoken";
import { getUsuarioById } from "../services/usuarioService.js";
import dotenv from 'dotenv';

dotenv.config();

//funcion encargada de verificar el token
   export const authenticateToken = async (req,res,next) => {
    try {
      
       const authorizationHeader = req.headers.authorization;

        const accessToken = authorizationHeader && authorizationHeader.split(" ")[1];


        if (!accessToken) {
            return res.status(401).json({
                message: "No se ha proporcianado un token de acceso"
            })
                
        }
        
        //Para decodificar el TOKEN
        const tokenDecodificado = jwt.verify(accessToken,process.env.SECRET_KEY);
        const usuario = await getUsuarioById(tokenDecodificado.userId);
        if(!usuario){
            return res.status(401).json({
                message: "Token de acceso no valido"
            })
        }
        //creando variable de usuario

        //una vez que encuentre el usuario vamos tomar el usuario que pillamos en la base de datos
        //lo vamos dejar disponible para proximo metodo

        req.usario = usuario;
        next();

        //acceso al producto llamar a la funcion next

    } catch (error) {
        

    }


}

//editar datos

import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useAuth } from "../../context/authContext";

import axios from "axios";


function EditarDatos() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const {usuario} = useAuth();
  //creamos la funcion para la peticion con Axios para el backend

  const actualizarUsuario = async() => {
    try {
        const respuesta = await axios.patch(`localhost:3000/usuarios/${usuario._id}`,{
        email,
        password,
    
    })
    } catch (error) {
      
    }
  }
 
  return (
    <>
      <Button onClick={handleOpen}>Editar</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Edita tus datos personales
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Nombre
            </Typography>
            <Input label="nombre" size="lg" />

            <Typography className="-mb-2" variant="h6">
              Rut
            </Typography>
            <Input label="rut" size="lg" />

          </CardBody>
          <CardFooter className="pt-0">
            <div onClick={actualizarUsuario}>
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Actualizar datos
            </Button>
            </div>
            <Button variant="text" color="gray" onClick={handleOpen} fullWidth>
                Cancelar
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default EditarDatos

carritoContext.jsx
import { createContext,useContext,useState } from "react";

//createContext para crear el contexto,useContext para acceder al contexto y useState es el State global del carrito.

//Partimos creando el Contexto 
const CarritoContext = createContext();

//provider es donde colocamos nuestros state y nuestras funciones vamos ocupar mas adelante

export const CarritoProvider = ({children}) => {
    
    const [carrito, setCarrito] = useState([]);

    const agregarProducto = producto => {

        console.log("agregando al carrito");      
    }

    const eliminarProducto = productoId => {

    } 

    const vaciarCarrito = () =>  setCarrito([]);

    const calcularTotal = () => {

    }
        return (
            <CarritoContext.Provider
                value={{

                    carrito,
                    agregarProducto,
                    vaciarCarrito,
                    calcularTotal
                }}
            >{children}</CarritoContext.Provider>  
        )
       
    }
}

export const useCarrito = ()=> {
    return useContext(CarritoContext);
}


//payment Controller 
import axios from "axios";
import {HOST,PAYPAL_API,PAYPAL_API_CLIENT,PAYPAL_API_SECRET} from "../config/config.js";

//aca vamos hacer el codigo nos permitara conectarnos a PAYPLAY 

export const createOrder = async (req,res) => {

    //definiendo la orden 
    try {
        

        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "100"
                    }
                },
                
            ],

            application_context: {

                brand_name: "tenis-chillan.com",
                landing_page: "NO_PREFERENCE",
                user_action : "PAY_NOW",
                return_url:`${HOST}/pagos/capture-order`, 
                cancel_url:`${HOST}/pagos/cancel-payment` 

            }

        }

        //obteniendo token de acceso 
        const params = new URLSearchParams();
        params.append("grant_type","client_credentials");
        //Ahora hacemos la peticion con axios para obtener el Token
        const respuesta = await axios.post(
            `${PAYPAL_API}/v1/oauth2/token` ,  
            params, 
            {
                headers: {
                    "Content-Type" : "aplication/x-www-form-urlencoded"
                },
                auth: {
                    username: PAYPAL_API_CLIENT,
                    password: PAYPAL_API_SECRET
                }
            }
        )

        const token_acceso = respuesta.data.access_token;

        //peticion para crear la orden de compra 

        const orderPaypal = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            order,
            {
                headers: {
                    Authorization: `Bearer ${token_acceso}`
                }
            }
        )

        return res.json(orderPaypal.data)
    } catch (error) {
        console.log(error)
        return res.status(500).json("Algo salio mal")
    }
   

}

export const captureOrder = async(req,res)=> {

    const {token} = req.query;

    try {
        const respuesta = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
            {},
            {
                auth: {
                    username: PAYPAL_API_CLIENT,
                    password: PAYPAL_API_SECRET
                }
            }
        )    

        return res.json(respuesta.data)

    } catch (error) {
        console.log(error)
    }

    console.log("confirmando orden ..."+ token )
    return res.json("orden pagada")
}

