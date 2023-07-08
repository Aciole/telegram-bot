const { bot } = require('../../../utils')

function sendDetailedTrainingInformation(chatId, result) {
    const { results } = result;

    if (results.length > 0) {
        let sendMessage = '';

        const projection = results.map(r => r.properties);

        let exercises =
            projection
                .map(p => p.Exercicios)
                .map(c => c.title).flat()
                .map(t => t.plain_text);
        ;

        exercises = exercises.filter((valor, indice) => {
            return exercises.indexOf(valor) === indice;
        });

        exercises.forEach((exercise) => {
            const projectionByExercise = projection.filter((p) => {
                return p.Exercicios.title
                    .filter((txt) => {
                        return txt.plain_text === exercise

                    }).length > 0;
            })

            const totalWeights =
                projectionByExercise
                    .map(p => p.Carga)
                    .map(c => c.number)
                    .reduce((partialSum, a) => partialSum + a, 0);

            const mediaWeight = totalWeights / projectionByExercise.length;

            const cargas = projectionByExercise.map(p => p.Carga.number)

            const minWeight = Math.min(...cargas);

            const maxWeight = Math.max(...cargas);


            const totalSeries =
                Math.max(...projectionByExercise
                    .map(p => p.Serie.number))

            const totalReps =
                projectionByExercise
                    .map(p => p.Reps)
                    .map(c => c.number)
                    .reduce((partialSum, a) => partialSum + a, 0);

            if (!sendMessage.includes(`*=== ${projectionByExercise[0].Agrupamento.rich_text[0].plain_text} ===*`)) {
                sendMessage += `

*=== ${projectionByExercise[0].Agrupamento.rich_text[0].plain_text} ===*
                
                `
            }

            sendMessage += getTemplateMarkdown(
                exercise, mediaWeight, minWeight, maxWeight, totalWeights, totalReps, totalSeries
            );
        })

        bot.sendMessage(chatId,
            sendMessage, {
            parse_mode: 'Markdown'
        })
    } else {
        bot.sendMessage(chatId, `Você não treinou  Hoje!`)
    }
}


function getTemplateMarkdown(exercise, mediaWeight, minWeight, maxWeight, totalWeights, totalReps, totalSeries) {
    const msg =
        `
*${exercise}*      

*Média de carga:* ${mediaWeight} kg

*Carga mínima:* ${minWeight} kg
*Carga máxima:* ${maxWeight} kg

*Total de carga:* ${totalWeights} kg

*Número de repetições:* ${totalReps}
*Número de séries:* ${totalSeries} séries     
    `

    return msg
}

module.exports = {
    sendDetailedTrainingInformation
};