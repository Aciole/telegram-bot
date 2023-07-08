


const findThisWeek = {
    property: 'Data',
    date: {
        this_week: {}
    }
}

const findPastWeek = {
    property: 'Data',
    date: {
        past_week: {}
    }
}

const findBySpecificDate = (datetime) => {
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, "0");
    const date = String(datetime.getDate()).padStart(2, "0");

    return {
        property: 'Data',
        date: {
            equals: `${year}-${month}-${date}`
        }
    };

}

const findBySpecificGroup = (group) => {
    return {
        property: 'Agrupamento',
        rich_text: {
            contains: group
        }
    }
}



module.exports = {
    findThisWeek,
    findPastWeek,
    findBySpecificDate,
    findBySpecificGroup
}