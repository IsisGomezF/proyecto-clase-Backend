import { Router } from "express";
import { validateFields } from "../middlewares/validate.fields";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validate-jwt";
import { actualizarInteraccion, crearInteraccion, eliminarInteraccion, getInteracciones, getUnaInteraccion } from "../controllers/interaccion.controller";


//path/api/v1/Producto


const router = Router();

router.post("/",
validateJWT,
[
    check("descripcion","La descripcion es obligatoria").not().isEmpty(), 
    // check("fechaCreacion","La fecha de creacion es obligatoria").not().isEmpty(),
    // check("usuario","El usuario es obligatorio").not().isEmpty().isNumeric(),
    // check("cliente","El cliente es obligatorio").not().isEmpty().isNumeric(),
    validateFields], 
crearInteraccion);

router.get("/",validateJWT, getInteracciones)
router.get("/:id",validateJWT, getUnaInteraccion)
router.put("/:id",validateJWT, actualizarInteraccion)
router.delete("/:id",validateJWT, eliminarInteraccion)


export default router