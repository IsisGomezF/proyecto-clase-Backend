import { Router } from "express";
import { actualizarUsuario, crearUsuario, eliminarUsuario, getUnUsuario, getUsuarios } from "../controllers/usuario.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate.fields";
import { validateJWT } from "../middlewares/validate-jwt";

//path/api/v1/usuario


const router = Router();

router.post("/", 
validateJWT,
[
check("nombre","El nombre es obligatorio").not().isEmpty(), 
check("numeroDocumento","El numero de documento es obligatorio").not().isEmpty(),
check("email","El correo electronico es obligatorio").not().isEmpty().isEmail(),
validateFields], 


crearUsuario);
router.get("/", getUsuarios)
router.get("/:id", validateJWT, getUnUsuario)
router.put("/:id", validateJWT, actualizarUsuario)
router.delete("/:id", validateJWT, eliminarUsuario)


export default router