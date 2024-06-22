import { Model, Schema, model } from "mongoose";

const interaccionSchema = new Schema({
    descripcion:{
        type: String,
        require:true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    usuario:{
        type: Schema.Types.ObjectId, ref:"usuario", 
        required: true
    },
    cliente:{
        type: Schema.Types.ObjectId, ref:"usuario", 
        required: false
    }
});

const InteraccionModel: Model<any> = model("interaccion", interaccionSchema);
export default InteraccionModel;