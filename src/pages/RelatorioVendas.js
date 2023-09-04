import React, { useState, useEffect } from 'react';
import { obterRelatorio } from '../services/UltimaVendaService.js';
import {
    todosRelatorios,
    adicionarATodosRelatorios,
} from '../services/RelatoriosService.js';
import '../styles/RelatorioVenda.css';

const RelatorioVendas = () => {
    const [venda, setVenda] = useState([]);
    const [relatorios, setRelatorios] = useState([]);
    const [filtroData, setFiltroData] = useState(null);

    useEffect(() => {
        const relatorioVendaData = obterRelatorio() || [];
        setVenda(relatorioVendaData);

        const todosRelatoriosData = todosRelatorios() || [];
        setRelatorios(todosRelatoriosData);

        const vendaExistente = todosRelatoriosData.some((existingVenda) => {
            return (
                existingVenda.itens.length === relatorioVendaData[0].itens.length &&
                existingVenda.itens.every((item, index) => {
                    const newItem = relatorioVendaData[0].itens[index];
                    return (
                        item.nome === newItem.nome &&
                        item.quantidade === newItem.quantidade &&
                        item.preco === newItem.preco
                    );
                }) &&
                existingVenda.valorTotal === relatorioVendaData[0].valorTotal &&
                existingVenda.formaPagamento === relatorioVendaData[0].formaPagamento
            );
        });

        if (!vendaExistente) {
            setRelatorios([...todosRelatoriosData, ...relatorioVendaData]);
            adicionarATodosRelatorios([
                ...todosRelatoriosData,
                ...relatorioVendaData,
            ]);
        }
    }, []);

    const formatFiltroDate = (data) => {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${ano}-${mes}-${dia}`;
    };

    const formatFiltroDate2 = (data) => {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <div className="relatorios">
            <h1 className="titulo">Relatório da última Venda</h1>
            <div className="containerR">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Itens</th>
                            <th>Qtd</th>
                            <th>Preço</th>
                            <th>Valor Total</th>
                            <th>Forma de Pagamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venda.map((v, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="rNome">
                                    {v.itens.map((item, index) => (
                                        <p key={index}>{item.nome}</p>
                                    ))}
                                </td>
                                <td>
                                    {v.itens.map((item, index) => (
                                        <p key={index}>{item.quantidade}</p>
                                    ))}
                                </td>
                                <td>
                                    {v.itens.map((item, index) => (
                                        <p key={index}>R${item.preco}</p>
                                    ))}
                                </td>
                                <td>R${v.valorTotal}</td>
                                <td>{v.formaPagamento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h1 className="titulo">Relatório de todas as Vendas</h1>
            <div className="containerR">
                <div className="filtroDia">
                    <label>Filtrar por dia:</label>
                    <input
                        type="date"
                        value={filtroData}
                        onChange={(e) => setFiltroData(e.target.value)}
                    />
                </div>
                {relatorios.map((v, index) => {
                    const data1 = new Date(v.itens[0].data);

                    if (!filtroData || formatFiltroDate(data1) === filtroData) {
                        return (
                            <div className="itensVenda" key={index}>
                                <h3>Operador: {v.itens[0].usuario.nome}</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Itens</th>
                                            <th>Qtd</th>
                                            <th>Preço</th>
                                            <th>Valor Total</th>
                                            <th>Forma de Pagamento</th>
                                            <th>Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td className="rNome">
                                                {v.itens.map((item, index) => (
                                                    <p key={index}>{item.nome}</p>
                                                ))}
                                            </td>
                                            <td>
                                                {v.itens.map((item, index) => (
                                                    <p key={index}>{item.quantidade}</p>
                                                ))}
                                            </td>
                                            <td>
                                                {v.itens.map((item, index) => (
                                                    <p key={index}>R${item.preco}</p>
                                                ))}
                                            </td>
                                            <td>R${v.valorTotal}</td>
                                            <td>{v.formaPagamento}</td>
                                            <td>{formatFiltroDate2(data1)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default RelatorioVendas;
