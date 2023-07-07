const { notion, notionDatabaseId } = require('../client');
const { calculatedVolumeByroupingAndExercise } = require('./calculated-by-grouping')


function getVolumeByGroupAndDateQuery(chatId, group, datetime) {
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, "0"); // Adiciona um zero à esquerda se o mês for menor que 10
    const date = String(datetime.getDate()).padStart(2, "0"); // Adiciona um zero à esquerda se o dia for menor que 10

    notion.databases.query({
        database_id: notionDatabaseId,
        filter: {
            and: [
                {
                    property: 'Data',
                    date: {
                        equals: `${year}-${month}-${date}`
                    }
                },
                {
                    property: 'Agrupamento',
                    rich_text: {
                        contains: group
                    }
                }
            ]
        }
    }).then((result) => calculatedVolumeByroupingAndExercise(chatId, result))
}

module.exports = getVolumeByGroupAndDateQuery
