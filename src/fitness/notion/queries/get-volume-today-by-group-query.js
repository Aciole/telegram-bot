
const getVolumeByGroupAndDateQuery = require('./get-volume-by-group-and-date-query')

function getVolumeTodayByGroupQuery(chatId, group) {
    const today = new Date();

    getVolumeByGroupAndDateQuery(chatId, group, today)

}

module.exports = getVolumeTodayByGroupQuery