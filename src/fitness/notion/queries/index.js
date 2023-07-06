
const getVolumeCurrentWeekByGroupQuery = require('./get-volume-current-week-by-group-query');
const getVolumePastWeekByGroupQuery = require('./get-volume-past-week-by-group-query')
const getVolumeLastTrainingByGroupQuery = require('./get-volume-last-training-by-group-query')
const getVolumeByGroupAndDateQuery = require('./get-volume-by-group-and-date-query')
const getVolumeTodayByGroupQuery = require('./get-volume-today-by-group-query')

module.exports = {
    getVolumeCurrentWeekByGroupQuery,
    getVolumePastWeekByGroupQuery,
    getVolumeLastTrainingByGroupQuery,
    getVolumeByGroupAndDateQuery,
    getVolumeTodayByGroupQuery,
}