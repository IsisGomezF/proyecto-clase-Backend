import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";
import bcrypt from "bcryptjs"

export const crearUsuario = async (req:Request, res:Response) => {
    const {body} = req;
    const {email, password} = body;
    try {
        const  existeEmail = await UsuarioModel.findOne({email,password})

        if(existeEmail){
            return res.status(409).json({
                ok: false,
                msg: `Ya existe el email ${email}`
            })
        }

        const nuevoUsuario = new UsuarioModel({
            ...body,
        });

        const salt = bcrypt.genSaltSync(10);
        nuevoUsuario.password = bcrypt.hashSync(password, salt)

        const usuarioCreado = await nuevoUsuario.save()

        res.status(200).json({
            ok:true,
            msg:"Usuario creado sastisfactoriamente",
            usuario: usuarioCreado,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            error, //Puede devolver informacion sensible
            msg:"Error al crear el usuario"
        });
        
    }
}

export const getUsuarios = async (req:Request, res:Response) => {
    try {
        const verUsuarios = await UsuarioModel.find();
        res.json({
            ok:true,
            verUsuarios,
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Error al ver el usuario"
        });
        
    }
}
export const getUnUsuario = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const verUsuario = await UsuarioModel.findById({_id:id});
        res.json({
            ok:true,
            verUsuario,
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Error al ver el usuario"
        });
        
    }
}

export const actualizarUsuario = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const { body } = req;
        const usuariosActualizado = await UsuarioModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok:true,
            msg:"Usuario actualizado",
            usuario: usuariosActualizado
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al actualizar el usuario"
        });
        
    }
}

export const eliminarUsuario = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const usuarioEliminado = await UsuarioModel.findByIdAndDelete({_id:id});
        res.json({
            ok:true,
            msg:"Usuario Eliminado",
            usuario: usuarioEliminado
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al eliminar el usuario"
        });
        
    }
}