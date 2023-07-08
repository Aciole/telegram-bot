
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

            if (typeof (iteration[`${chatId}#${msg.chat.first_name}`]) == 'undefined') {
                iteration[`${chatId}#${msg.chat.first_name}`] = [];
            }

            iteration.user = msg.chat.first_name;
            let msgText = match[1].toLowerCase();

            iteration.count = iteration.count + 1;
            if (msg.text === "/therapis") {
                msgText = `Eu sou ${msg.chat.first_name}`;
            }

            generateOpenAIResponse(chatId, msg);

        });
    }
}

function getHistoryMessage(chatId, msg) {

    const messages = []

    messages.push({
        role: 'system',
        content: prompt
    })

    iteration[`${chatId}#${msg.chat.first_name}`].forEach(el => {

        messages.push({
            role: 'assistant',
            content: el.system
        })

        messages.push({
            role: 'user',
            content: el.userReply
        })

    })


    messages.push({
        role: 'user',
        content: msg.text === "/therapis" ? `Eu sou ${msg.chat.first_name}` : msg.text
    })


    return messages;
}

function generateOpenAIResponse(chatId, msg) {

    const messages = getHistoryMessage(chatId, msg);

    openaiChatApi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages
    }).then((response) => {
        const data = response.data.choices[0].message.content;

        iteration[`${chatId}#${msg.chat.first_name}`].push({ userReply: msg.text, system: data });


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