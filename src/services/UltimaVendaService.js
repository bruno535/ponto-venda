export const adicionarRelatorio = (relatorio) =>
    localStorage.setItem('relatorioVendas', JSON.stringify(relatorio));

export const obterRelatorio = () =>
    JSON.parse(localStorage.getItem('relatorioVendas'));
