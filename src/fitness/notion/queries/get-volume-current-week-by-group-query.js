const { notion, notionDatabaseId } = require('../client');
const { findThisWeek, findBySpecificGroup } = require('./database-filters')

const { sendGeneralTrainingInformation } = require('./send-general-training-information')

function getVolumeCurrentWeekByGroupQuery(chatId, group) {
    notion.databases.query({
        database_id: notionDatabaseId,
        filter: {
            and: [
                findThisWeek,
                findBySpecificGroup(group)
            ]
        }
    }).then((result) => sendGeneralTrainingInformation(chatId, result))
}

module.exports = getVolumeCurrentWeekByGroupQuery;