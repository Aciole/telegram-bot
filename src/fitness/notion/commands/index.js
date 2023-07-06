const { notion, notionDatabaseId } = require('../client');

function registerExerciseExecution(group, exercise, carga, series, reps, restTime) {
    reps = reps.replace(' reps', '');
    carga = carga.replace('kg', '');

    return notion.pages.create({
        parent: {
            database_id: notionDatabaseId,
        },
        properties: {
            'Exercicios': {
                title: [
                    {
                        text: {
                            content: exercise
                        }
                    }
                ]
            },
            "Agrupamento": {
                rich_text: [
                    {
                        text: { content: group }
                    }
                ]
            },
            "Descanso": {
                rich_text: [
                    {
                        text: { content: restTime }
                    }
                ]
            },
            "Serie": {
                number: series
            },
            "Reps": {
                number: parseInt(reps)
            },
            "Carga": {
                number: parseInt(carga)
            },
            "Data": {
                date: {
                    start: new Date(),
                    time_zone: 'Brazil/West'
                }
            }

        }
    })
}

module.exports = {
    registerExerciseExecution
}