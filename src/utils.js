const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.SECRET_TELEGRAM, { polling: true });

const splitMenu = (itens, max) => {
    return itens.reduce((acumulador, item, indice) => {
        const grupo = Math.floor(indice / max);
        acumulador[grupo] = [...(acumulador[grupo] || []), item];
        return acumulador;
    }, []);
}

module.exports = {
    bot,
    splitMenu
}