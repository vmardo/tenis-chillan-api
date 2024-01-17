import axios from 'axios';
import { HOST, PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from '../config/config.js';
import CC from 'currency-converter-lt'



const CURRENCY_CODE = "USD";


export const createOrder = async (req, res) => {


     const items = await parseItems(req.body.carrito)
     const amount = calculateAmount(items)
    
     const purchase_units = [
         {
           amount,
           items
         },
     ]

    //definiendo la orden
    try {
        
        const order = {
            intent: "CAPTURE",
            //simulando que vamos a comprar 2 productos
            purchase_units,
            application_context: {
                brand_name: "mycompany.com",
                landing_page: "NO_PREFERENCE",
                user_action: "PAY_NOW",
              },
        }


        //obteniendo el token de acceso
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        const respuesta = await axios.post( 
            `${PAYPAL_API}/v1/oauth2/token`,
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


        //peticion para crear la orden de compra https://api-m.paypal.com/v2/checkout/orders

        const ordenPaypal = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            order,
            {
                headers: {
                    Authorization: `Bearer ${token_acceso}`
                }
            }
        );
        
        console.log(ordenPaypal.data)

        return res.json(ordenPaypal.data)
    } catch (error) {
        console.log(error)
        return res.status(500).json("Algo salio mal")
    }

}

export const captureOrder = async (req, res) => {

    const { orderID } = req.body;


    try {
        
        const respuesta = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
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

    console.log('confirmando orden...: ' + orderID)
    return res.json('orden pagada!')
}

const parseItems = async (productos) => {
    const conversorMoneda = new CC({ from: "CLP", to: "USD" });

    const results = [];

    for (const producto of productos) {
        const name = producto.nombre;
        const quantity = producto.cantidad+'';
        const category = "PHYSICAL_GOODS";


        try {
            const precioUSD = await conversorMoneda.convert(producto.precio_actual);
            
            results.push({
                name,
                quantity,
                category,
                unit_amount: {
                    currency_code: CURRENCY_CODE,
                    value: parseFloat(precioUSD.toFixed(2))
                },
            });
        } catch (error) {
            // Manejar el error según tus necesidades
            console.error(`Error convirtiendo el precio para ${name}: ${error.message}`);
        }
    }

    return results;
};

const calculateAmount = (productos) => {
    
    const total = productos.reduce( (total, producto) =>  total + producto.unit_amount.value * producto.quantity, 0 )

    return {
        currency_code: CURRENCY_CODE,
        value: parseFloat(total.toFixed(2)),
        breakdown: {
            item_total: {
            currency_code: CURRENCY_CODE,
            value:  parseFloat(total.toFixed(2)),
            },
        },
    }

}