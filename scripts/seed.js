require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Exercise = require("../models/schemas/Exercise");
const View = require("../views/ConsoleView");

const exercisePull = [
    { nome: "Puxada Alta (Pulldown)", grupoMuscular: "Costas", categoria: "pull" },
    { nome: "Remada Curvada com Barra", grupoMuscular: "Costas", categoria: "pull" },
    { nome: "Remada Serrote (Unilateral)", grupoMuscular: "Costas", categoria: "pull" },
    { nome: "Remada Cavalinho (T-Bar Row)", grupoMuscular: "Costas", categoria: "pull" },
    { nome: "Puxada Alta com Triângulo", grupoMuscular: "Costas", categoria: "pull" },
    { nome: "Pull-up (Barra Fixa)", grupoMuscular: "Costas", categoria: "pull" },
    { nome: "Remada Baixa na Polia", grupoMuscular: "Costas", categoria: "pull" },
    { nome: "Pulldown com Braços Esticados", grupoMuscular: "Costas", categoria: "pull" },
    { nome: "Levantamento Terra (Deadlift)", grupoMuscular: "Costas", categoria: "pull" },
    { nome: "Remada Apoiada no Banco", grupoMuscular: "Costas", categoria: "pull" },
    { nome: "Rosca Direta com Barra", grupoMuscular: "Bíceps", categoria: "pull" },
    { nome: "Rosca Alternada com Halteres", grupoMuscular: "Bíceps", categoria: "pull" },
    { nome: "Rosca Martelo com Halteres", grupoMuscular: "Bíceps", categoria: "pull" },
    { nome: "Rosca Scott", grupoMuscular: "Bíceps", categoria: "pull" },
    { nome: "Rosca Concentrada", grupoMuscular: "Bíceps", categoria: "pull" },
    { nome: "Rosca na Polia Baixa", grupoMuscular: "Bíceps", categoria: "pull" },
    { nome: "Rosca Inversa com Barra", grupoMuscular: "Antebraço", categoria: "pull" },
    { nome: "Flexão de Punho com Barra", grupoMuscular: "Antebraço", categoria: "pull" },
    { nome: "Extensão de Punho com Barra", grupoMuscular: "Antebraço", categoria: "pull" },
    { nome: "Sustentação de Disco", grupoMuscular: "Antebraço", categoria: "pull" },
    { nome: "Encolhimento com Barra", grupoMuscular: "Trapézio", categoria: "pull" },
    { nome: "Encolhimento com Halteres", grupoMuscular: "Trapézio", categoria: "pull" },
    { nome: "Remada Alta na Polia", grupoMuscular: "Trapézio", categoria: "pull" },
    { nome: "Encolhimento por trás", grupoMuscular: "Trapézio", categoria: "pull" }
];

const exercisePush = [
    { nome: "Supino Reto com Barra", grupoMuscular: "Peito", categoria: "push" },
    { nome: "Supino Inclinado com Halteres", grupoMuscular: "Peito", categoria: "push" },
    { nome: "Crucifixo Reto com Halteres", grupoMuscular: "Peito", categoria: "push" },
    { nome: "Crossover na Polia Alta", grupoMuscular: "Peito", categoria: "push" },
    { nome: "Crossover na Polia Baixa", grupoMuscular: "Peito", categoria: "push" },
    { nome: "Supino Declinado com Barra", grupoMuscular: "Peito", categoria: "push" },
    { nome: "Peck Deck (Voador)", grupoMuscular: "Peito", categoria: "push" },
    { nome: "Flexão de Braço", grupoMuscular: "Peito", categoria: "push" },
    { nome: "Supino Reto na Máquina", grupoMuscular: "Peito", categoria: "push" },
    { nome: "Pullover com Halter", grupoMuscular: "Peito", categoria: "push" },
    { nome: "Tríceps Pulley (Corda)", grupoMuscular: "Tríceps", categoria: "push" },
    { nome: "Tríceps Testa com Barra W", grupoMuscular: "Tríceps", categoria: "push" },
    { nome: "Tríceps Francês Unilateral", grupoMuscular: "Tríceps", categoria: "push" },
    { nome: "Mergulho nas Paralelas (Dips)", grupoMuscular: "Tríceps", categoria: "push" },
    { nome: "Tríceps Coice (Kickback)", grupoMuscular: "Tríceps", categoria: "push" },
    { nome: "Supino Fechado", grupoMuscular: "Tríceps", categoria: "push" },
    { nome: "Desenvolvimento com Halteres", grupoMuscular: "Ombro", categoria: "push" },
    { nome: "Elevação Lateral com Halteres", grupoMuscular: "Ombro", categoria: "push" },
    { nome: "Elevação Frontal na Polia", grupoMuscular: "Ombro", categoria: "push" },
    { nome: "Desenvolvimento Militar com Barra", grupoMuscular: "Ombro", categoria: "push" }
];

const exerciseLegs = [
    { nome: "Agachamento Livre", grupoMuscular: "Quadríceps", categoria: "legs" },
    { nome: "Leg Press 45º", grupoMuscular: "Quadríceps", categoria: "legs" },
    { nome: "Cadeira Extensora", grupoMuscular: "Quadríceps", categoria: "legs" },
    { nome: "Afundo com Halteres", grupoMuscular: "Quadríceps", categoria: "legs" },
    { nome: "Passada (Walking Lunges)", grupoMuscular: "Quadríceps", categoria: "legs" },
    { nome: "Agachamento Búlgaro", grupoMuscular: "Quadríceps", categoria: "legs" },
    { nome: "Agachamento Hack", grupoMuscular: "Quadríceps", categoria: "legs" },
    { nome: "Agachamento Frontal", grupoMuscular: "Quadríceps", categoria: "legs" },
    { nome: "Stiff com Barra", grupoMuscular: "Posteriores", categoria: "legs" },
    { nome: "Mesa Flexora", grupoMuscular: "Posteriores", categoria: "legs" },
    { nome: "Cadeira Flexora", grupoMuscular: "Posteriores", categoria: "legs" },
    { nome: "Levantamento RDL", grupoMuscular: "Posteriores", categoria: "legs" },
    { nome: "Bom Dia (Good Morning)", grupoMuscular: "Posteriores", categoria: "legs" },
    { nome: "Panturrilha em Pé na Máquina", grupoMuscular: "Panturrilhas", categoria: "legs" },
    { nome: "Panturrilha Sentado", grupoMuscular: "Panturrilhas", categoria: "legs" },
    { nome: "Panturrilha no Leg Press", grupoMuscular: "Panturrilhas", categoria: "legs" },
    { nome: "Agachamento Sumô com Halter", grupoMuscular: "Adutores", categoria: "legs" },
    { nome: "Cadeira Adutora", grupoMuscular: "Adutores", categoria: "legs" },
    { nome: "Elevação Pélvica (Hip Thrust)", grupoMuscular: "Glúteos", categoria: "legs" },
    { nome: "Cadeira Abdutora", grupoMuscular: "Glúteos", categoria: "legs" }
];

const seed = async () => {
    await connectDB();
    await Exercise.deleteMany({});
    await Exercise.insertMany([...exercisePull, ...exercisePush, ...exerciseLegs]);
    View.print("Exercícios inseridos!");
    await mongoose.disconnect();
};

seed();
