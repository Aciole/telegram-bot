const { notion, notionDatabaseId } = require('../client');
const { findPastWeek, findBySpecificGroup } = require('./database-filters')
const { sendDetailedTrainingInformation } = require('./send-detailed-training-information')

function getVolumeLastTrainingByGroupQuery(chatId, group) {
    notion.databases.query({
        database_id: notionDatabaseId,
        filter: {
            and: [
                findPastWeek,
                findBySpecificGroup(group)
            ]
        }
    }).then((result) => sendDetailedTrainingInformation(chatId, result))
}

module.exports = getVolumeLastTrainingByGroupQuery