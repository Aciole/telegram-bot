
const { notion, notionDatabaseId } = require('../client');
const { sendDetailedTrainingInformation } = require('./send-detailed-training-information')
const { findBySpecificDate } = require('./database-filters')

function getVolumeTodayByGroupQuery(chatId) {

    notion.databases.query({
        database_id: notionDatabaseId,
        filter: {
            and: [
                findBySpecificDate(new Date())
            ]
        }
    }).then((result) => sendDetailedTrainingInformation(chatId, result))
}

module.exports = getVolumeTodayByGroupQuery