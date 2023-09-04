const estoque = JSON.parse(localStorage.getItem('estoque')) || [];

export function obterEstoque() {
    return estoque;
}

export function adicionarProduto(
    codigoDeBarras,
    nome,
    quantidade,
    preco,
    data
) {
    const id = estoque.length + 1;

    const novoProduto = {
        id,
        codigoDeBarras,
        nome,
        quantidade,
        preco,
        data,
    };
    estoque.push(novoProduto);
    salvarEstoqueNoLocalStorage();
    return novoProduto;
}

export function editarProduto(
    id,
    codigoDeBarras,
    nome,
    quantidade,
    preco,
    data
) {
    const produto = estoque.find((p) => p.id === id);
    if (produto) {
        produto.codigoDeBarras = codigoDeBarras;
        produto.nome = nome;
        produto.quantidade = quantidade;
        produto.preco = preco;
        produto.data = data;
        salvarEstoqueNoLocalStorage();
    }
}

export function removerProduto(codigoDeBarras) {
    const index = estoque.findIndex((p) => p.codigoDeBarras === codigoDeBarras);
    if (index !== -1) {
        estoque.splice(index, 1);
        reorganizarIds();
        salvarEstoqueNoLocalStorage();
    }
}

export function venderProduto(codigoDeBarras, quantidade) {
    const produto = estoque.find((p) => p.codigoDeBarras === codigoDeBarras);
    if (produto) {
        if (produto.quantidade >= quantidade) {
            produto.quantidade -= quantidade;
            salvarEstoqueNoLocalStorage();
        } else {
            console.error('Estoque insuficiente para a venda');
        }
    }
}

function reorganizarIds() {
    estoque.forEach((produto, index) => {
        produto.id = index + 1;
    });
}

function salvarEstoqueNoLocalStorage() {
    localStorage.setItem('estoque', JSON.stringify(estoque));
}
