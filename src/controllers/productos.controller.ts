import { Request, Response } from "express";;
import ProductoModel from "../models/productos.model";
import { CustomRequest } from "../middlewares/validate-jwt";
import { UsuarioSchema } from "../models/usuario.model";
import mongoose from "mongoose";

export const crearProducto = async (req:CustomRequest, res:Response) => {
    const {body} = req;
    const id= req._id;

    try {
        const nuevoProducto = new ProductoModel({ usuario:id,
            ...body,
        });
        const productoCreado = await nuevoProducto.save()
        res.status(200).json({
            ok:true,
            msg:"Producto creado sastisfactoriamente",
            producto: productoCreado,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            error, //Puede devolver informacion sensible
            msg:"Error al crear el producto"
        });
        
    }
}

export const getProductos = async (req:Request, res:Response) => {
    try {
        // mongoose.model('usuario', UsuarioSchema)
        const verProductos = await ProductoModel.find().populate({
            path:"usuario",
            select:"nombre email numeroCelular",
        });
        res.json({
            ok:true,
            verProductos,
        })
    } catch (error) {
        console.log(error);
        
        res.status(400).json({
            ok:false,
            msg:"Error al ver los productos"
        });
        
    }
}
export const getUnProducto = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const verUnProducto = await ProductoModel.findById({_id:id});
        res.json({
            ok:true,
            verUnProducto,
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Error al ver el producto"
        });
        
    }
}

export const actualizarProducto = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const { body } = req;
        const productosActualizados = await ProductoModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok:true,
            msg:"Usuario actualizado",
            producto: productosActualizados
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al actualizar el producto"
        });
        
    }
}

export const eliminarProducto = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const productoEliminado = await ProductoModel.findByIdAndDelete({_id:id});
        res.json({
            ok:true,
            msg:"Producto Eliminado",
            producto: productoEliminado
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al eliminar el producto"
        });
        
    }
}