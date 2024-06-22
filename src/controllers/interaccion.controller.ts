import { Request, Response } from "express";;
import { CustomRequest } from "../middlewares/validate-jwt";
import InteraccionModel from "../models/interaccion.model";
import mongoose from "mongoose";
import { UsuarioSchema } from "../models/usuario.model";

export const crearInteraccion = async (req:CustomRequest, res:Response) => {
    const {body} = req;
    // const {descripcion}=req.body
    const id= req._id;

    try {
        const nuevaInteraccion = new InteraccionModel({ usuario:id,
            ...body,
        });
        const interaccionCreada = await nuevaInteraccion.save()
        res.status(200).json({
            ok:true,
            msg:"Interaccion creada sastisfactoriamente",
            interaccion: interaccionCreada,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            error, //Puede devolver informacion sensible
            msg:"Error al crear la interaccion"
        });
        
    }
}

export const getInteracciones = async (req:Request, res:Response) => {
    try {
        // mongoose.model('usuario', UsuarioSchema)
        const verInteracciones = await InteraccionModel.find().populate({
            path:"usuario",
            select:"nombre email numeroCelular",
        });
        res.json({
            ok:true,
            verInteracciones: verInteracciones,
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Error al ver las interacciones"
        });
        
    }
}
export const getUnaInteraccion = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const verUnaInteraccion = await InteraccionModel.findById({_id:id}).populate({
            path:"usuario",
            select:"nombre email numeroCelular",
        });
        res.json({
            ok:true,
            verUnaInteraccion: verUnaInteraccion,
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Error al ver la interaccion"
        });
        
    }
}

export const actualizarInteraccion = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const { body } = req;
        const interaccionActualizadas = await InteraccionModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok:true,
            msg:"Interaccion actualizado",
            interaccion: interaccionActualizadas
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al actualizar la interaccion"
        });
        
    }
}

export const eliminarInteraccion = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const interaccionEliminada = await InteraccionModel.findByIdAndDelete({_id:id});
        res.json({
            ok:true,
            msg:"Interaccion Eliminada",
            interaccion: interaccionEliminada
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al eliminar la interaccion"
        });
        
    }
}