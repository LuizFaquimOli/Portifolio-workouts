const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const exerciseSchema = new Schema ({
    nome: {type: String, required: true},
    grupoMuscular: {type: String, required: true},
    categoria: {type: String,enum: ["pull", "push", "legs", "upper", "lower"], required: true}
});

module.exports = model("Exercise", exerciseSchema);