//ruta relacionada con los pagos 
import express from "express"
import { captureOrder, createOrder } from "../controllers/paymentController.js";
import {authenticateToken} from "../middlewares/authenticateToken.js";

const router = express.Router();

//rutas para pagos
router.post("/create-order",authenticateToken, createOrder)

router.post("/capture-order",captureOrder)

export default router;
