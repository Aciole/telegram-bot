const { bot, splitMenu } = require('../utils')
const { workouts } = require('../constants/workout')
const {
    getVolumeCurrentWeekByGroupQuery,
    getVolumePastWeekByGroupQuery,
    getVolumeTodayByGroupQuery,
    getVolumeLastTrainingByGroupQuery
} = require('./notion/queries')
const { registerExerciseExecution } = require('./notion/commands')


const grupoMuscular = workouts.map(workout => workout.title);

function initGym(chatId) {

    bot.sendMessage(chatId, 'Selecione uma opção', {
        reply_markup: {
            keyboard: splitMenu(['Relatorios', 'Treinar'], 3),
            one_time_keyboard: true
        }
    });

    bot.once('message', (selectedGroup) => {

        switch (selectedGroup.text) {
            case 'Treinar':
                training(chatId);
                break;
            case 'Relatorios':
                queries(chatId);
                break;
            default:
                bot.sendMessage(chatId, 'opção não existe');
                break;
        }
    })
}


function training(chatId) {
    let serie = 1;

    bot.sendMessage(chatId, 'Selecione um Agrupamento Muscular:', {
        reply_markup: {
            keyboard: splitMenu([...grupoMuscular, 'Fim de Treino'], 3),
            one_time_keyboard: true
        }
    });

    bot.once('message', (selectedGroup) => {
        const group = selectedGroup.text;

        if (group == 'Fim de Treino') {
            bot.sendMessage(chatId, `Terminou`);
            return;
        }

        const selectedExercises = workouts
            .filter(w => w.title == group)

        const exercisesTitleKeyboard = selectedExercises
            .map(w => w.exercises.map(e => e.title))
            ;


        bot.sendMessage(chatId, `Selecionado: ${group}\n Informe o Exercicio:`, {
            reply_markup: {
                keyboard: splitMenu(exercisesTitleKeyboard.flat(), 3),
                one_time_keyboard: true
            }
        });

        bot.once('message', (exerciseMsg) => {

            const selectedExercise =
                selectedExercises
                    .map(g => g.exercises.filter(e => e.title == exerciseMsg.text));

            const exercise = selectedExercise[0][0];

            executeWorkOut(chatId, group, exercise, serie)
        });
    })
}

function executeWorkOut(chatId, group, exercise, serie) {

    bot.sendMessage(chatId, `Informe a carga de ${exercise.title}, da Serie: ${serie}`, {
        reply_markup: {
            keyboard: splitMenu([...exercise.weights, 'Fim'], 4),
            one_time_keyboard: true
        }
    });

    bot.once('message', (weight) => {

        if (weight.text == 'Fim') {
            training(chatId)
            return;
        }

        const restTimeKeyboard = [['15s', '30s', '45s'], ['1m', '2m', '3m']];
        bot.sendMessage(chatId, 'Informe o tempo de descanso', {
            reply_markup: {
                keyboard: restTimeKeyboard,
                one_time_keyboard: true
            }
        });

        bot.once('message', (restTime) => {

            const repsKeyboard = [['4 reps', '6 reps', '8 reps'], ['10 reps', '12 reps', '15 reps'], ['20 reps', '30 reps', '40 reps']];
            bot.sendMessage(chatId, 'Informe a quantidade de Repetições', {
                reply_markup: {
                    keyboard: repsKeyboard,
                    one_time_keyboard: true
                }
            });

            bot.once('message', (reps) => {

                registerExerciseExecution(group, exercise.title, weight.text, serie, reps.text, restTime.text)
                    .then(() => {
                        serie += 1;
                        executeWorkOut(chatId, group, exercise, serie);
                    })
                    .catch((error) => {
                        bot.sendMessage(chatId, 'Ocorreu um erro ao registrar o treino.');
                    });
            })
        })
    });
}

function queries(chatId) {

    bot.sendMessage(chatId, 'Selecione uma opção:', {
        reply_markup: {
            keyboard: splitMenu([
                'Volume Semana Atual',
                'Volume Semana Passada',
                'Ultimo treino do mesmo agrupamento muscular',
                'Treino de Hoje'
            ], 3),
            one_time_keyboard: true
        }
    });

    bot.once('message', (menu) => {

        bot.sendMessage(chatId, 'Selecione um Agrupamento Muscular:', {
            reply_markup: {
                keyboard: splitMenu([...grupoMuscular, 'voltar'], 3),
                one_time_keyboard: true
            }
        });

        bot.once('message', (selectedGroup) => {
            switch (menu.text) {
                case 'Volume Semana Atual':
                    getVolumeCurrentWeekByGroup(chatId, selectedGroup.text);
                    break;
                case 'Volume Semana Passada':
                    getVolumePastWeekByGroup(chatId, selectedGroup.text)
                    break;
                case 'Ultimo treino do mesmo agrupamento muscular':
                    getVolumeLastTrainingByGroup(chatId, selectedGroup.text)
                    break;

                case 'Treino de Hoje':
                    getVolumeTodayByGroupQuery(chatId, selectedGroup.text)
                    break;

                default:
                    break;
            }
        })
    })
}
function getVolumeLastTrainingByGroup(chatId, group) {

    getVolumeLastTrainingByGroupQuery(group)
        .then((result => calc(chatId, result)))
}


function getVolumeCurrentWeekByGroup(chatId, group) {
    getVolumeCurrentWeekByGroupQuery(group)
        .then((result) => {
            const { results } = result;

            if (results.length > 0) {
                const projection = results.map(r => r.properties);

                const totalWeights =
                    projection
                        .map(p => p.Carga)
                        .map(c => c.number)
                        .reduce((partialSum, a) => partialSum + a, 0);

                const totalSeries =
                    projection
                        .map(p => p.Serie)
                        .map(c => c.number)
                        .reduce((partialSum, a) => partialSum + a, 0);

                bot.sendMessage(chatId, `
                    Essa semana foi feitas ${totalSeries} Series, e ${totalWeights} kg, no ${group}
                `)
            }
        })
}

function getVolumePastWeekByGroup(chatId, group) {
    return getVolumePastWeekByGroupQuery(group)
        .then((result) => {
            const { results } = result;

            if (results.length > 0) {
                const projection = results.map(r => r.properties);

                const totalWeights =
                    projection
                        .map(p => p.Carga)
                        .map(c => c.number)
                        .reduce((partialSum, a) => partialSum + a, 0);

                const totalSeries =
                    projection
                        .map(p => p.Serie)
                        .map(c => c.number)
                        .reduce((partialSum, a) => partialSum + a, 0);

                bot.sendMessage(chatId, `
                Essa semana foi feitas ${totalSeries} Series, e ${totalWeights} kg, no ${group}
            `)
            }

        })
}




const gymMenu = {
    regex: /\/gym/,
    link: '/gym'
};


module.exports = {
    initGym,
    gymMenu
}