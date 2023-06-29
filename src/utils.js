const splitMenu = (itens, max) => {
    return itens.reduce((acumulador, item, indice) => {
        const grupo = Math.floor(indice / max);
        acumulador[grupo] = [...(acumulador[grupo] || []), item];
        return acumulador;
    }, []);
}

module.exports = {
    splitMenu
}