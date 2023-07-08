require('dotenv').config();

const { initGym, gymMenu } = require('./fitness/gym')
const { initNews, newsMenu } = require('./mind/news')
const { startTherapist, therapistMenu } = require('./mind/therapist')
const { bot, splitMenu } = require('./utils')

let chatActived = false;

bot.onText(/\/start/, (msg => {
    const chatId = msg.chat.id;
    chatActived = false;
    bot.sendMessage(chatId, 'Selecione uma opção', {
        reply_markup: {
            inline_keyboard: splitMenu([
                { text: '🏋️‍♂️ Academia', callback_data: gymMenu.link },
                { text: '📰 Noticias', callback_data: newsMenu.link },
                { text: '🛋️ Terapia', callback_data: therapistMenu.link },
                { text: '🍗 Dieta', callback_data: '/diet' },
                { text: '🇺🇸 Ingles', callback_data: '/english' },
            ], 3)
        }
    });
}))

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const response = query.data;

    chatActived = false;

    switch (response) {
        case gymMenu.link:
            initGym(chatId);
            break;

        case newsMenu.link:
            initNews(chatId);
            break;

        case therapistMenu.link:
            chatActived = true;
            startTherapist(chatId, chatActived);
            break;
        default:
            bot.sendMessage(chatId, `Opção: ${response}, não disponivel`)
            break;
    }
})

bot.onText(gymMenu.regex, (msg) => {
    const chatId = msg.chat.id;
    chatActived = false;
    initGym(chatId);
});

bot.onText(newsMenu.regex, (msg) => {
    const chatId = msg.chat.id;

    initNews(chatId);
});

bot.onText(therapistMenu.regex, (msg) => {
    const chatId = msg.chat.id;
    chatActived = true;
    startTherapist(chatId, chatActived);
});