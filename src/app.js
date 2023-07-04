require('dotenv').config();

const { initGym, gymMenu } = require('./fitness/gym')
const { initNews, newsMenu } = require('./mind/news')
const { startTherapist, therapistMenu } = require('./mind/therapist')
const { bot } = require('./utils')

let chatActived = false;

bot.onText(/\/start/, (msg => {
    const chatId = msg.chat.id;
    chatActived = false;
    bot.sendMessage(chatId, 'Selecione uma opção', {
        reply_markup: {
            keyboard: [[gymMenu.link, newsMenu.link, therapistMenu.link]],
            one_time_keyboard: true,
        }
    });
}))

bot.onText(gymMenu.regex, (msg) => {
    const chatId = msg.chat.id;

    initGym(chatId);
});

bot.onText(newsMenu.regex, (msg) => {
    const chatId = msg.chat.id;

    initNews(chatId);
});

bot.onText(therapistMenu.regex, (msg) => {
    const chatId = msg.chat.id;
    chatActived = false;
    // startTherapist(chatId, chatActived);
});
