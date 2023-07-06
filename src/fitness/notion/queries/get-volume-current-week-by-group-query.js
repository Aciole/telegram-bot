const { notion, notionDatabaseId } = require('../client');

function getVolumeCurrentWeekByGroupQuery(group) {
    return notion.databases.query({
        database_id: notionDatabaseId,
        filter: {
            and: [
                {
                    property: 'Data',
                    date: {
                        this_week: {}
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

module.exports = getVolumeCurrentWeekByGroupQuery;