import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {
    obterEstoque,
    adicionarProduto,
    editarProduto,
    removerProduto,
} from '../services/EstoqueService';
import {
    formatarData,
    formatarNome,
    formatarPreco,
} from '../services/Formatar.js';
import '../styles/GerenciadorEstoque.css';

const GerenciadorEstoque = () => {
    const [produtoEditado, setProdutoEditado] = useState(null);
    const [produtoRemovido, setProdutoRemovido] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [codigoDeBarras, setCodigoDeBarras] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [data, setData] = useState('');
    const [pesquisaCodigo, setPesquisaCodigo] = useState('');
    const [resultadoPesquisa, setResultadoPesquisa] = useState(null);

    useEffect(() => {
        setProdutos(obterEstoque());
    }, []);

    const confirmDelete = () => {
        if (produtoRemovido) {
            removerProduto(produtoRemovido.codigoDeBarras);
            setProdutos((prevProducts) =>
                prevProducts.filter(
                    (produto) => produto.codigoDeBarras !== produtoRemovido.codigoDeBarras
                )
            );
            setProdutoRemovido(null);
        }
    };

    const handleEdit = () => {
        if (produtoEditado) {
            editarProduto(
                produtoEditado.id,
                produtoEditado.codigoDeBarras,
                produtoEditado.nome,
                parseInt(produtoEditado.quantidade),
                formatarPreco(produtoEditado.preco),
                produtoEditado.data
            );
            setProdutos(obterEstoque());
            setProdutoEditado(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const novoProduto = adicionarProduto(
            codigoDeBarras,
            formatarNome(nome),
            parseInt(quantidade),
            formatarPreco(preco),
            data
        );
        setProdutos([...produtos, novoProduto]);
        setCodigoDeBarras('');
        setNome('');
        setQuantidade('');
        setPreco('');
        setData('');
    };

    const handlePesquisa = () => {
        const resultado = produtos.find(
            (produto) => produto.codigoDeBarras === pesquisaCodigo
        );
        if (resultado) {
            setResultadoPesquisa(resultado);
        } else {
            setResultadoPesquisa(null);
        }
    };

    return (
        <div className="container">
            <h2 className="titulo">Gerenciador de Estoque</h2>
            <div>
                <div className="pesquisa">
                    <input
                        type="text"
                        placeholder="Código de Barras"
                        value={pesquisaCodigo}
                        onChange={(e) => setPesquisaCodigo(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handlePesquisa();
                            }
                        }}
                    />
                    <button onClick={handlePesquisa} className="button1">
                        Pesquisar
                    </button>
                </div>
                <div className="content">
                    {resultadoPesquisa && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nome</th>
                                    <th>Qtd</th>
                                    <th>Preço</th>
                                    <th>Data</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="tdId">{resultadoPesquisa.codigoDeBarras}</td>
                                    <td className="nomeE">{resultadoPesquisa.nome}</td>
                                    <td>{resultadoPesquisa.quantidade}</td>
                                    <td>{resultadoPesquisa.preco}</td>
                                    <td>{formatarData(resultadoPesquisa.data)}</td>
                                    <td className="acoes">
                                        <div>
                                            <button
                                                className="button1"
                                                onClick={() => setProdutoEditado(resultadoPesquisa)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="button2"
                                                onClick={() => setProdutoRemovido(resultadoPesquisa)}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div className="content">
                <table>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Qtd</th>
                            <th>Preço</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto, index) => (
                            <tr key={index}>
                                <td className="tdId">{produto.codigoDeBarras}</td>
                                <td className="nomeE">{produto.nome}</td>
                                <td>{produto.quantidade}</td>
                                <td>{produto.preco}</td>
                                <td>{formatarData(produto.data)}</td>
                                <td className="acoes">
                                    <div>
                                        <button
                                            className="button1"
                                            onClick={() => setProdutoEditado(produto)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="button2"
                                            onClick={() => setProdutoRemovido(produto)}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Código"
                    value={codigoDeBarras}
                    onChange={(e) => setCodigoDeBarras(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Data"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                />
                <button type="submit" className="button3">
                    Adicionar Produto
                </button>
            </form>

            <Modal
                isOpen={produtoEditado !== null}
                onRequestClose={() => setProdutoEditado(null)}
                contentLabel="Editar Produto"
                className="editar"
            >
                <h2>Editar Produto</h2>
                {produtoEditado && (
                    <div>
                        <label>
                            Novo Código de Barras:
                            <input
                                type="text"
                                value={produtoEditado.codigoDeBarras}
                                onChange={(e) =>
                                    setProdutoEditado({
                                        ...produtoEditado,
                                        codigoDeBarras: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            Novo Nome:
                            <input
                                type="text"
                                value={produtoEditado.nome}
                                onChange={(e) =>
                                    setProdutoEditado({ ...produtoEditado, nome: e.target.value })
                                }
                            />
                        </label>
                        <label>
                            Nova Quantidade:
                            <input
                                type="number"
                                value={produtoEditado.quantidade}
                                onChange={(e) =>
                                    setProdutoEditado({
                                        ...produtoEditado,
                                        quantidade: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            Novo Preço:
                            <input
                                type="text"
                                value={produtoEditado.preco}
                                onChange={(e) =>
                                    setProdutoEditado({
                                        ...produtoEditado,
                                        preco: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            Nova Data:
                            <input
                                type="date"
                                value={produtoEditado.data}
                                onChange={(e) =>
                                    setProdutoEditado({ ...produtoEditado, data: e.target.value })
                                }
                            />
                        </label>
                        <button onClick={handleEdit} className="button1">
                            Salvar
                        </button>
                        <button onClick={setProdutoEditado(null)} className="button2">
                            Cancelar
                        </button>
                    </div>
                )}
            </Modal>
            <Modal
                isOpen={produtoRemovido !== null}
                onRequestClose={() => setProdutoRemovido(null)}
                contentLabel="Confirmar Exclusão"
                className="modal"
            >
                <h2>Confirmar Exclusão</h2>
                {produtoRemovido && (
                    <div>
                        <p>
                            Tem certeza que deseja remover o produto{' '}
                            <strong>{produtoRemovido.nome}</strong> do estoque?
                        </p>
                        <button onClick={confirmDelete} className="button2">
                            Confirmar
                        </button>
                        <button
                            onClick={() => setProdutoRemovido(null)}
                            className="button1"
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default GerenciadorEstoque;
