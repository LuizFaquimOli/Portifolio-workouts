const Exercise = require("./schemas/Exercise");
const Training = require("./schemas/Training");

let trainingList = [];

const getExercisesByCategory = async (categoria) => {
    return await Exercise.find({ categoria }).sort({ _id: 1 });
};

const getUpperExercises = async () => {
    return await Exercise.find({ categoria: { $in: ["pull", "push"] } }).sort({ _id: 1 });
};

const addTraining = (exercise) => trainingList.push(exercise);
const getTrainingList = () => trainingList;

const saveTraining = async () => {
    if (trainingList.length === 0) return;
    const training = new Training({ exercises: trainingList });
    await training.save();
    trainingList = [];
};

module.exports = { getExercisesByCategory, getUpperExercises, addTraining, getTrainingList, saveTraining };