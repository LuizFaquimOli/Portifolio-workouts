const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const trainingSchema = new Schema ({
    exercises: [{ nome: String, grupoMuscular: String}],
    criadoEM: {type: Date, default: Date.now}
});

module.exports = model("Training", trainingSchema);