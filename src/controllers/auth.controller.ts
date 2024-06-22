import { NextFunction } from 'express';
import  bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import UsuarioModel from '../models/usuario.model';
import generateJWT from '../helpers/jwt';
import { CustomRequest } from '../middlewares/validate-jwt';
import { sendEmail } from '../helpers/email';
import path from "path";
import fs from "fs";
import { obtenerUbicacionPorIP } from '../helpers/obtenerDireccionIP';
import { config } from '../config/config';
import UbicacionModel from '../models/ubicaciosIp.model';

const environment = config[process.env.NODE_ENV || "desarrollo"]

export const login = async (req:Request, res:Response) =>{
    const {email,password}= req.body;
    const ipAddress= environment.ip ||  req.ip

    try {
        //verificar email
        const usuario = await UsuarioModel.findOne({email:email});
        if(!usuario){
            return res.status(401).json ({
                ok:false,
                msg:"Las credenciales no son validas"
            });
        }
        //Verificar password
        const validarPassword = bcrypt.compareSync( password, usuario.password);
        if(!validarPassword){
            return res.status(401).json ({
                ok:false,
                msg:"Las credenciales no son validas"
            });
        };
        //Generar Token
        const token = await generateJWT(usuario._id, usuario.email);
        // console.log(token);
        // console.log("req",req.ip);
        const ubicacionIp = await obtenerUbicacionPorIP(ipAddress)
        console.log("data", ubicacionIp);

        const ubicacion = new UbicacionModel({
            usuario: usuario.id,
            ...ubicacionIp,
        });
      
        const ubicacionGuardada = await ubicacion.save();
        
        res.status(200).json({
            ok:true,
            msg: "Token creado",
            usuario,
            token,
            ubicacionGuardada,
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            error,
            msg:"Hable con el administrador"
        });
    }
};

export const renewToken =async (req: CustomRequest, res: Response)=>{
    const id = req._id;
    try {
        if(typeof id==="undefined"){
            throw new Error("No existe el ID");
        }
        const usuario = await UsuarioModel.findById(id);
        //genera el token
        const token = await generateJWT(id.toString());
        res.json({
            ok:true,
            token,
            usuario,
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok:false,
            error,
            msg:"Hable con el administrador"
        })
        
    }
}


export const olvidoContrasena = async(req:Request, res:Response)=>{
    const {email, numeroDocumento} = req.body;
    try {
        const existeUsuario = await UsuarioModel.findOne({
            email,
            numeroDocumento,
        });
        if(!existeUsuario){
            res.status(400).json({
                ok:false,
                msg: "Los datos no coinciden"
            });
        }
        const id= existeUsuario?._id;
        if(id){
            //Genera token
            const token=await generateJWT(id,email,"1h", process.env.JWT_SECRET_PASS);
            //Guarda el token
            existeUsuario.token = token;
            await existeUsuario.save();

            const nombre = existeUsuario.nombre;
            const templatePath = path.join(
                __dirname,
                "../templates/olvidoContrasena.html"
            );
            const emailTemplate = fs.readFileSync(templatePath,"utf8");
            const personalizarEmail = emailTemplate.replace("{{name}}", nombre).replace("{{token}}", existeUsuario.token);

            //llamar funcion para envio crreo
            sendEmail(
                "isiskgf@gmail.com",
                "Cambio Contraseña",
                personalizarEmail
            );
            res.status(200).json({
                ok:true,
                msg:"Proceso exitoso",
                usuario:existeUsuario,
                token
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:"No se logró validar los datos"
        });
        
    }
};

export const cambioContrasena = async (req:CustomRequest, res:Response)=>{
    const id= req._id;
    const {password} = req.body;
    const tokenPass=req.header("x-token-pass") as string
    ;
    try {
        if(!password || !tokenPass){
            return res.status(400).json({
                ok:false,
                msg:"Valores Invalidos"
            });
        }
        const usuario=await UsuarioModel.findOne({token:tokenPass});
        if(!usuario ){
            return res.status(400).json({
                ok:false,
                msg:"El token ya fue utilizado"
            });
        }
        const newPassword =bcrypt.hashSync(password,10);
        const actualizarPassword =await UsuarioModel.findByIdAndUpdate(id,{
            password:newPassword,
            token:""
        },
        {new:true}
        );
        console.log("actualizar contraseña", actualizarPassword);
        if(!actualizarPassword){
            return res.status(400).json({
                ok:false,
                msg:"Error al actualizar la constraseña"
            })
        };
        res.status(200).json({
            ok:true,
            msg:"Contraseña actualizada"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok:false,
            msg:"Error al actualizar la contraseña"
        }); 
    }
}


