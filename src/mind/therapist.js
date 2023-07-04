
const { Configuration, OpenAIApi } = require('openai');

const { bot } = require('../utils');
const { prompt } = require('../constants/prompt-openai')

const iteration = {}

const openaiChatApi = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_TOKEN,
    organization: process.env.OPENAI_ORGANIZATION
}));

function startTherapist(chatId, chatActived) {
    iteration.count = 1;

    bot.on('message', (msg) => {

        if (chatActived) {
            let msgText = '';

            if (msg.text === "/therapis") {
                iteration.user = msg.chat.first_name;
                msgText = `Eu sou ${msg.chat.first_name}`;
            } else {
                iteration.count = iteration.count + 1;
                msgText = msg.text;
                iteration[iteration.count] = msgText
            }

            generateOpenAIResponse(chatId, msgText);
        }

    });
}

function generateOpenAIResponse(chatId, msg) {

    openaiChatApi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: 'assistant',
                content: prompt
            },
            {
                role: 'user',
                content: msg
            }
        ]
    }).then((response) => {
        const data = response.data.choices[0].message.content;
        console.log(`iteration`, iteration)
        console.log(`USER: ${iteration.user}, `, msg)
        console.log('SYSTEM:', data)
        bot.sendMessage(chatId, data)
    }).catch((err) => {
        console.log(err)
    });
}

const therapistMenu = {
    regex: /\/therapis/,
    link: '/therapis'
};


module.exports = {
    startTherapist,
    therapistMenu
}