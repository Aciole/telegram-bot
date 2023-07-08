const { notion, notionDatabaseId } = require('../client');
const { sendDetailedTrainingInformation } = require('./send-detailed-training-information')
const { findBySpecificDate, findBySpecificGroup } = require('./database-filters')


function getVolumeByGroupAndDateQuery(chatId, group, datetime) {

    notion.databases.query({
        database_id: notionDatabaseId,
        filter: {
            and: [
                findBySpecificDate(datetime),
                findBySpecificGroup(group)
            ]
        }
    }).then((result) => sendDetailedTrainingInformation(chatId, result))
}

module.exports = getVolumeByGroupAndDateQuery
