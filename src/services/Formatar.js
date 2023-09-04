export const formatarData = (data) => {
    const dataObj = new Date(data);
    const umDiaEmMilissegundos = 24 * 60 * 60 * 1000;
    const dataF = new Date(dataObj.getTime() + umDiaEmMilissegundos);
    const dia = String(dataF.getDate()).padStart(2, '0');
    const mes = String(dataF.getMonth() + 1).padStart(2, '0');
    const ano = dataF.getFullYear();
    return `${dia}/${mes}/${ano}`;
};

export const formatarNome = (nome) => {
    const palavras = nome.toLowerCase().split(' ');
    const nomeFormatado = palavras
        .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ');
    return nomeFormatado;
};

export const formatarPreco = (preco) => {
    const valorNumerico = parseFloat(preco.replace(',', '.'));
    const valorFormatado = valorNumerico.toFixed(2);
    return valorFormatado;
};