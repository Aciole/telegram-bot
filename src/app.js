const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const { initGym, gymMenu } = require('./gym')
const { initNews, newsMenu } = require('./news')

const telegramToken = process.env.SECRET_TELEGRAM;
const bot = new TelegramBot(telegramToken, { polling: true });

bot.onText(/\/start/, (msg => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Selecione uma opção', {
        reply_markup: {
            keyboard: [[gymMenu.link, newsMenu.link]],
            one_time_keyboard: true,
        }
    });
}))

bot.onText(gymMenu.regex, (msg) => {
    const chatId = msg.chat.id;

    initGym(bot, chatId);
});

bot.onText(newsMenu.regex, (msg) => {
    const chatId = msg.chat.id;

    initNews(bot, chatId);
});
