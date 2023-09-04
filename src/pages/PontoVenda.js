import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { obterEstoque, venderProduto } from '../services/EstoqueService.js';
import { obterUsuarioAtual } from '../services/UsuarioAtualService.js';
import { adicionarRelatorio } from '../services/UltimaVendaService.js';
import '../styles/PontoVenda.css';

const PontoVendas = () => {
    const [carrinho, setCarrinho] = useState([]);
    const [codigoDeBarras, setCodigoDeBarras] = useState('');
    const [modalImprimirOpen, setModalImprimirOpen] = useState(false);
    const [modalFinalizarOpen, setModalFinalizarOpen] = useState(false);
    const [modalCancelarOpen, setModalCancelarOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [valorPago, setValorPago] = useState(0);
    const [relatorioVendas, setRelatorioVendas] = useState([]);
    const [estoque, setEstoque] = useState([]);
    const [usuario, setUsuario] = useState('');

    useEffect(() => {
        setEstoque(obterEstoque());
        setUsuario(obterUsuarioAtual());
    }, []);

    const adicionarAoCarrinho = (produto) => {
        const produtoNoCarrinho = carrinho.find((item) => item.id === produto.id);

        if (produtoNoCarrinho) {
            const novoCarrinho = carrinho.map((item) =>
                item.id === produto.id
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            );
            setCarrinho(novoCarrinho);
        } else {
            setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
        }
    };

    const buscarProdutoPorCodigo = () => {
        const produtoEncontrado = estoque.find(
            (produto) => produto.codigoDeBarras === codigoDeBarras
        );
        if (produtoEncontrado) {
            adicionarAoCarrinho(produtoEncontrado);
            setCodigoDeBarras('');
        }
    };

    const finalizarCompra = () => {
        if (modalImprimirOpen) {
            setModalImprimirOpen(false);
            imprimirListaDeItens();
        }

        if (modalFinalizarOpen) {
            setModalFinalizarOpen(false);
            setSelectedPayment('');

            carrinho.forEach((produto) => {
                venderProduto(produto.codigoDeBarras, produto.quantidade);
            });

            const relatorio = {
                valorTotal: calcularTotal(),
                itens: carrinho.map((produto) => ({
                    usuario: usuario,
                    nome: produto.nome,
                    quantidade: produto.quantidade,
                    preco: produto.preco,
                    data: new Date(),
                })),
                formaPagamento: selectedPayment,
            };

            setRelatorioVendas([...relatorioVendas, relatorio]);
            adicionarRelatorio([...relatorioVendas, relatorio]);

            setCarrinho([]);
            setSelectedPayment('');
            setValorPago(0);
        }
    };

    const cancelarCompra = () => {
        setCarrinho([]);
        setModalCancelarOpen(false);
        setSelectedPayment('');
        setValorPago(0);
        setRelatorioVendas([]);
    };

    const removerItemDoCarrinho = (index) => {
        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1);
        setCarrinho(novoCarrinho);
    };

    const calcularTotal = () => {
        return carrinho
            .reduce((total, produto) => total + produto.preco * produto.quantidade, 0)
            .toFixed(2);
    };

    const imprimirListaDeItens = () => {
        const listaDeItens = carrinho
            .map(
                (produto) =>
                    `${produto.nome} - Preço: ${produto.preco} - Quantidade: ${produto.quantidade}`
            )
            .join('\n');
        const popup = window.open('', '_blank');
        popup.document.write('<h2>Lista de Itens</h2>');
        popup.document.write('<pre>' + listaDeItens + '</pre>');
        popup.document.close();
        popup.print();
    };

    const openModalImprimir = () => {
        if (carrinho.length === 0) {
            return alert(
                'O carrinho está vazio. Adicione produtos antes de imprimir a compra.'
            );
        }
        setModalImprimirOpen(true);
    };

    const openModalFinalizar = () => {
        if (carrinho.length === 0) {
            return alert(
                'O carrinho está vazio. Adicione produtos antes de finalizar a compra.'
            );
        }
        setModalFinalizarOpen(true);
    };

    return (
        <div className="container">
            <h1 className="titulo">Ponto de Vendas</h1>
            <div className="content">
                <table>
                    <thead>
                        <tr>
                            <th className="id">Id</th>
                            <th>Nome</th>
                            <th className="quantidade">Quantidade</th>
                            <th className="preco">Preço</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="carrinho">
                        {carrinho.map((produto, index) => (
                            <tr
                                key={produto.id}
                                className={index % 2 === 0 ? 'claro' : 'escuro'}
                            >
                                <td>{index + 1}</td>
                                <td className="nome">{produto.nome}</td>
                                <td>{produto.quantidade}</td>
                                <td>R${produto.preco}</td>
                                <td>
                                    <button
                                        onClick={() => removerItemDoCarrinho(index)}
                                        className="button2"
                                    >
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="buscar">
                <input
                    type="text"
                    value={codigoDeBarras}
                    onChange={(e) => setCodigoDeBarras(e.target.value)}
                    placeholder="Digite o código de barras"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            buscarProdutoPorCodigo();
                        }
                    }}
                />
                <button onClick={buscarProdutoPorCodigo} className="button1">
                    Buscar
                </button>
            </div>

            <div className="finalizar">
                <p>
                    Total: R$<em>{calcularTotal()}</em>
                </p>
                <button onClick={openModalFinalizar} className="button3">
                    Finalizar Compra
                </button>
                <button onClick={() => setModalCancelarOpen(true)} className="button2">
                    Cancelar Compra
                </button>
                <button onClick={openModalImprimir} className="button1">
                    Imprimir Lista de Itens
                </button>
                <Modal
                    isOpen={modalImprimirOpen}
                    onRequestClose={() => setModalImprimirOpen(false)}
                    contentLabel="Confirmação de Impressão"
                    className="modal"
                >
                    <h2>Deseja imprimir uma folha com os itens?</h2>
                    <div className="buttons">
                        <button onClick={finalizarCompra}>Imprimir</button>
                        <button onClick={() => setModalImprimirOpen(false)}>
                            Cancelar
                        </button>
                    </div>
                </Modal>
                <Modal
                    isOpen={modalFinalizarOpen}
                    onRequestClose={() => {
                        setModalFinalizarOpen(false);
                        setSelectedPayment('');
                    }}
                    contentLabel="Confirmação de Finalização"
                    className="modal"
                >
                    <h2>Deseja finalizar a compra?</h2>
                    <div className="payment-methods">
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Dinheiro"
                                onChange={() => setSelectedPayment('Dinheiro')}
                            />
                            Dinheiro
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Credito"
                                onChange={() => setSelectedPayment('Credito')}
                            />
                            Crédito
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Debito"
                                onChange={() => setSelectedPayment('Debito')}
                            />
                            Débito
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="PIX"
                                onChange={() => setSelectedPayment('PIX')}
                            />
                            PIX
                        </label>
                    </div>
                    <p>Forma de pagamento selecionada: {selectedPayment}</p>
                    <p>
                        Total: R$<em>{calcularTotal()}</em>
                    </p>
                    {selectedPayment === 'Dinheiro' && (
                        <div className="payment-end">
                            <label>
                                Valor Pago:
                                <input
                                    type="number"
                                    onChange={(e) => setValorPago(e.target.value)}
                                />
                            </label>
                            <label>
                                Valor Troco:{(valorPago - calcularTotal()).toFixed(2)}
                            </label>
                        </div>
                    )}
                    <div className="buttons">
                        <button onClick={finalizarCompra}>Confirmar</button>
                        <button
                            onClick={() => {
                                setModalFinalizarOpen(false);
                                setSelectedPayment('');
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </Modal>
                <Modal
                    isOpen={modalCancelarOpen}
                    onRequestClose={() => setModalCancelarOpen(false)}
                    contentLabel="Confirmação de Cancelamento"
                    className="modal"
                >
                    <h2>Deseja cancelar a compra?</h2>
                    <div className="buttons">
                        <button onClick={cancelarCompra}>Confirmar</button>
                        <button onClick={() => setModalCancelarOpen(false)}>
                            Cancelar
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default PontoVendas;
