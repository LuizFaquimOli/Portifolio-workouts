const Model = require("../models/WorkoutModel");
const View = require("../views/ConsoleView");

const menu = async () => {
    try {
        View.print("=== OPÇÕES DE TREINO ===\n1. PPL UPPER LOWER\n2. PPL\n3. UPPER LOWER\n4. ...\n");
        View.print("------------------------\n");
        const trainingOption = await View.ask("Escolha a divisão de  treino que mais lhe agrada.\n");

        switch (trainingOption.trim()) {
            case "1":
                pplUpLow();
                break;

            case "2":
                ppl();
                break;

            case "3":
                upperLower();
                break;

            case "4":
                View.print("Mais opções de treino em breve.")
                menu();
                break;

            default:
                View.print("Escolha uma opção valida");
                menu();
        }
    } catch (erro) {
        View.print("Falha ao ler os dados do terminal", erro);
    }
};

const pplUpLow = async () => {
    View.clear();
    try {
        View.print("=== OPÇÕES DE TREINO ===\n1. Pull (Costas)\n2. Push (Peito)\n3. Legs (Perna)\n4. Upper (Superior completo)\n5. Lower(Inferior completo)\n0. Voltar ao menu");
        View.print("------------------------\n");
        const training = await View.ask("Escolha a opção de treino.\n");

        switch (training.trim()) {
            case "1":
                await workoutPlan(await Model.getExercisesByCategory("pull"));
                break;

            case "2":
                await workoutPlan(await Model.getExercisesByCategory("push"));
                break;

            case "3":
                await workoutPlan(await Model.getExercisesByCategory("legs"));
                break;

            case "4":
                await workoutPlan(await Model.getUpperExercises());
                break;

            case "5":
                await workoutPlan(await Model.getExercisesByCategory("legs"));
                break;

            case "0":
                View.clear();
                menu();
                break;

            default:
                View.print("Escolha uma opção valida");
                pplUpLow();
        }
    } catch (erro) {
        View.print("Falha ao ler os dados do terminal", erro);
    }
};

const ppl = async () => {
    View.clear();
    try {
        View.print("=== OPÇÕES DE TREINO ===\n1. Pull (Costas)\n2. Push (Peito)\n3. Legs (Perna)\n0. Voltar ao menu");
        View.print("------------------------\n");
        const training = await View.ask("Escolha a opção de treino.\n")

        switch (training.trim()) {
            case "1":
                await workoutPlan(await Model.getExercisesByCategory("pull"));
                break;

            case "2":
                await workoutPlan(await Model.getExercisesByCategory("push"));
                break;

            case "3":
                await workoutPlan(await Model.getExercisesByCategory("legs"));
                break;

            case "0":
                View.clear();
                menu();
                break;

            default:
                View.print("Escolha uma opção valida.\n")
                ppl();

        }
    } catch (erro) {
        View.print("Falha ao ler os dados do terminal", erro);
    }
};
const upperLower = async () => {
    View.clear();
    View.print("=== OPÇÕES DE TREINO ===\n1. Upper (Superior completo)\n2. Lower (Inferior completo)\n0. Voltar ao menu");
    View.print("------------------------\n");
    const training = await View.ask("Escolha a opção de treino.\n");

    switch (training.trim()) {
        case "1":
            await workoutPlan(await Model.getUpperExercises());
            break;

        case "2":
            await workoutPlan(await Model.getExercisesByCategory("legs"));
            break;

        case "0":
            View.clear();
            menu();
            break;

        default:
            View.print("Escolha uma opção valida.\n");
            upperLower();

    }
};

const workoutPlan = async (exercise) => {
    View.clear();
    try {
        const numberTraining = await View.ask("Escolha o numero de exercícios do seu treino.\n")
        View.clear();

        View.print("\n------------------------\n");
        for (let i = 1; i <= numberTraining; i++) {
            exercise.forEach((exercicio, index) => {
                View.print(`${index + 1}. ${exercicio.nome} | ${exercicio.grupoMuscular}\n`);
            });
            View.print("------------------------------------------------\nSelecione 0 para ver como está seu treino agora.\n------------------------------------------------\n")

            const selectedExercise = await View.ask(`Escolha o ${i} exercício do seu treino.\n`);
            View.clear();
            const valueExercise = selectedExercise.trim();
            const index = parseInt(valueExercise.trim()) - 1;

            if (valueExercise === "0") {
                View.print("===Seu treino atual===\n")
                const currentList = Model.getTrainingList();
                if (currentList.length === 0) {
                    View.print("Nenhum treino adicionado ainda.")
                    View.print("------------------------\n");
                } else {
                    currentList.forEach(currentExercise => {
                        View.print(`Exercício ${currentExercise.nome} focado em ${currentExercise.grupoMuscular}\n`);
                        View.print("------------------------\n");
                    });
                }


                await View.ask("Pressione [Enter] para continuar...");
                View.clear();

                i--;
                continue;
            }

            if (isNaN(index) || index < 0 || index >= exercise.length) {
                View.print("Escolha uma opção valida entre as disponíveis na lista de exercícios.")
                View.print("------------------------\n");
                i--;
                continue;
            };

            Model.addTraining(exercise[index]);
            View.print(`O exercício ${exercise[index].nome} foi adicionado ao seu treino.`);
            View.print("------------------------\n");
        };
        View.clear();
        View.print("\nA montagem do seu treino foi finalizada, segue os exercícios selecionados.\n===Seu treino atual===\n");
        Model.getTrainingList().forEach(currentExercise => {
            View.print(`Exercício ${currentExercise.nome} focado em ${currentExercise.grupoMuscular}\n`);
            View.print("------------------------\n");
        });
        await Model.saveTraining();
        View.print("\nTreino salvo no banco de dados com sucesso\n");
    } catch (erro) {
        View.print("Falha ao ler os dados do terminal", erro);
    } finally {
        View.close();
        process.exit(0);
    }
};

module.exports = { menu };