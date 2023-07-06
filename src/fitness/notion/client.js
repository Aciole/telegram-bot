const { Client } = require('@notionhq/client');

const notionSecret = process.env.SECRET_NOTION;
const notionDatabaseId = process.env.NOTION_GYM_DATABASEID;

const notion = new Client({
    auth: notionSecret
});


module.exports = {
    notion,
    notionDatabaseId
}