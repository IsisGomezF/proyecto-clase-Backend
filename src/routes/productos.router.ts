import { Router } from "express";
import { actualizarProducto, crearProducto, eliminarProducto, getProductos, getUnProducto } from "../controllers/productos.controller";
import { validateFields } from "../middlewares/validate.fields";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validate-jwt";


//path/api/v1/Producto


const router = Router();

router.post("/",
validateJWT,
[
    check("nombre","El nombre es obligatorio").not().isEmpty(), 
    check("sku","El SKU de documento es obligatorio").not().isEmpty(),
    check("cantidad","La cantidad es obligatoria").not().isEmpty().isNumeric(),
    check("precio","El precio es obligatorio").not().isEmpty().isNumeric(),
    validateFields], 
crearProducto);

router.get("/", getProductos)
router.get("/:id", getUnProducto)
router.put("/:id", actualizarProducto)
router.delete("/:id", eliminarProducto)


export default router