import React from 'react';

const Produto = ({ produto, adicionarAoCarrinho }) => (
    <div className="produto">
        <h3>{produto.nome}</h3>
        <p>Preço: R${produto.preco}</p>
        <button onClick={() => adicionarAoCarrinho(produto)}>
            Adicionar ao Carrinho
        </button>
    </div>
);

export default Produto;
