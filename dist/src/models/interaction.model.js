"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const interaccionSchema = new mongoose_1.Schema({
    descripcion: {
        type: String,
        require: true
    },
    fechaCreacion: {
        type: Date,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    cliente: {
        type: String,
        require: true
    }
});
const InteraccionModel = (0, mongoose_1.model)("interaccion", interaccionSchema);
exports.default = InteraccionModel;
//# sourceMappingURL=interaction.model.js.map