const { bot } = require('../../../utils')

function calculatedVolumeByroupingAndExercise(chatId, result) {
    const { results } = result;

    if (results.length > 0) {
        const projection = results.map(r => r.properties);

        const exercisesDuplicate =
            projection
                .map(p => p.Exercicios)
                .map(c => c.title).flat()
                .map(t => t.plain_text);
        ;

        const exercises = exercisesDuplicate.filter((valor, indice) => {
            return exercisesDuplicate.indexOf(valor) === indice;
        });

        let sendMessage = '';

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

            sendMessage += `

*${exercise}*      

*Média de carga:* ${mediaWeight} kg

*Carga mínima:* ${minWeight} kg
*Carga máxima:* ${maxWeight} kg
*Total de carga:* ${totalWeights} kg

*Número de séries:* ${totalSeries} séries           
            `;
        })

        bot.sendMessage(chatId,
            sendMessage, {
            parse_mode: 'Markdown'
        })
    } else {
        bot.sendMessage(chatId, `Você não treinou  Hoje!`)
    }

}

module.exports = {
    calculatedVolumeByroupingAndExercise
};