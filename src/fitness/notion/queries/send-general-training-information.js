const { bot } = require('../../../utils')

function sendGeneralTrainingInformation(chatId, result) {

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

        const totalReps =
            projection
                .map(p => p.Reps)
                .map(c => c.number)
                .reduce((partialSum, a) => partialSum + a, 0);

        const group = projection[0].Agrupamento.rich_text[0].plain_text;

        bot.sendMessage(chatId, `
            Essa semana foi feitas ${totalSeries} Series, ${totalWeights} kg, ${totalReps} Reps no ${group}
        `)
    } else {
        bot.sendMessage(chatId, `Registro`)
    }
}

module.exports = {
    sendGeneralTrainingInformation
}