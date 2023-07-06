const { notion, notionDatabaseId } = require('../client');

function getVolumeLastTrainingByGroupQuery(group) {
    return notion.databases.query({
        database_id: notionDatabaseId,
        filter: {
            and: [
                {
                    property: 'Data',
                    date: {
                        past_week: {}
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
    })
}

module.exports = getVolumeLastTrainingByGroupQuery