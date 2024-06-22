"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const interaccionSchema = new mongoose_1.Schema({
    descripcion: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "usuario",
        required: true
    },
    cliente: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "usuario",
        required: false
    }
});
const InteraccionModel = (0, mongoose_1.model)("interaccion", interaccionSchema);
exports.default = InteraccionModel;
//# sourceMappingURL=interaccion.model.js.map