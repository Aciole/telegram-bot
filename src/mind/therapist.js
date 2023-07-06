
const { Configuration, OpenAIApi } = require('openai');

const { bot } = require('../utils');
const { prompt } = require('../constants/prompt-openai')

const iteration = {}

const openaiChatApi = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_TOKEN,
    organization: process.env.OPENAI_ORGANIZATION
}));

function startTherapist(chatId, chatActived) {
    iteration.count = 0;

    if (chatActived) {
        bot.sendMessage(chatId, "Oi sou um robô Terapeuta, como você está? você pode encerrar a consulta escrevendo /start");
        bot.onText(/(.+)/, (msg, match) => {

            if (msg.text === '/start' || chatActived == false) {
                chatActived = false;
                return;
            }

            iteration.user = msg.chat.first_name;
            let msgText = match[1].toLowerCase();

            iteration.count = iteration.count + 1;
            if (msg.text === "/therapis") {
                msgText = `Eu sou ${msg.chat.first_name}`;
            }

            generateOpenAIResponse(chatId, msgText);

        });
    }
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
        iteration[iteration.count] = { user: msg, system: data };

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