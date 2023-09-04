import { obterEstoque, editarProduto } from './EstoqueService.js';

const validades = obterEstoque();

export const obterValidades = () => {
    return validades;
};

export const atualizarValidade = (produto, data) => {
    const novaValidade = validades.find((v) => v.id === produto.id);
    if (novaValidade) {
        editarProduto(
            produto.id,
            produto.codigoDeBarras,
            produto.nome,
            produto.quantidade,
            produto.preco,
            data
        );
    }
};
