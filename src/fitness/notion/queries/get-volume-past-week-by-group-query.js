const { notion, notionDatabaseId } = require('../client');
const { findPastWeek, findBySpecificGroup } = require('./database-filters')
const { sendGeneralTrainingInformation } = require('./send-general-training-information')

function getVolumePastWeekByGroupQuery(chatId, group) {
    notion.databases.query({
        database_id: notionDatabaseId,
        filter: {
            and: [
                findPastWeek,
                findBySpecificGroup(group)
            ]
        }
    }).then((result) => sendGeneralTrainingInformation(chatId, result))
}

module.exports = getVolumePastWeekByGroupQuery