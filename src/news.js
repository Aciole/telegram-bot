
const Parser = require('rss-parser');
const { splitMenu } = require('./utils');

const parser = new Parser();
const itemsPerPage = 5;

let currentPage = 0;

const news = [
    {
        title: 'G1 SP',
        rss: 'https://g1.globo.com/dynamo/sao-paulo/rss2.xml'
    },
    {
        title: 'G1 Tecnologia',
        rss: 'https://g1.globo.com/dynamo/tecnologia/rss2.xml'
    },
    {
        title: 'uol Começar o dia',
        rss: 'https://rss.uol.com.br/feed/comecar-o-dia.xml'
    },
]

function initNews(bot, chatId) {

    bot.sendMessage(chatId, 'Noticias sobre ...', {
        reply_markup: {
            keyboard: splitMenu(news.map(n => n.title), 3),
            one_time_keyboard: true
        }
    });

    bot.once('message', (selectedNews) => {
        const rss = news.filter(n => n.title == selectedNews.text)[0].rss
        parser.parseURL(rss).then((feed) => {
            displayPage(bot, chatId, currentPage, feed);

            bot.on('callback_query', (query) => {
                const chatId = query.message.chat.id;
                const data = query.data;

                const arr = ['anterior', 'proxima', 'voltar']



                if (!arr.includes(data)) {
                    if (data === 'proxima') {
                        currentPage++;
                    } else if (data === 'anterior' && currentPage > 0) {
                        currentPage--;
                    }

                    else if (data === 'voltar') {
                        currentPage = 0;
                        initNews(bot, chatId, splitMenu);
                        return;
                    }

                    displayPage(bot, chatId, currentPage, feed);
                }

            })


        }).catch((error) => {
            console.error('Erro ao buscar feed RSS:', error);
            bot.sendMessage(chatId, 'Ocorreu um erro ao buscar o feed RSS. Tente novamente mais tarde.');
        });
    })



}

function displayPage(bot, chatId, page, feed) {

    const startIdx = page * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const items = feed.items.slice(startIdx, endIdx);

    try {
        items.forEach((item) => {
            const message = `${item.title}\n ${item.link}`;
            bot.sendMessage(chatId, message);
        });
    } catch (error) {

    } finally {
        const totalPages = Math.ceil(feed.items.length / itemsPerPage);
        const currentPageNum = page + 1;
        const paginationMessage = `Página ${currentPageNum} de ${totalPages}`;

        bot.sendMessage(chatId, paginationMessage, {
            reply_markup: {
                inline_keyboard: [[
                    { text: 'Anterior', callback_data: 'anterior' },
                    { text: 'Próxima', callback_data: 'proxima' },
                    { text: 'Voltar', callback_data: 'voltar' },
                ]]
            }
        })
    }
}

const newsMenu = {
    regex: /\/news/,
    link: '/news'
};

module.exports = { initNews, newsMenu }
