require("dotenv").config();
const connectDB = require("./config/db");
const WorkoutController = require("./controllers/WorkoutController");

const start = async () => {
    await connectDB();
    await WorkoutController.menu();
};

start();