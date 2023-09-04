import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import { obterValidades, atualizarValidade } from '../services/ValidadeService';
import { formatarData } from '../services/Formatar.js';

const GerenciadorValidades = () => {
    const [validades, setValidades] = useState([]);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [novaData, setNovaData] = useState('');

    useEffect(() => {
        const validadesData = obterValidades();
        const validadesOrdenadas = validadesData.sort(
            (a, b) => moment(a.data, 'YYYY-MM-DD') - moment(b.data, 'YYYY-MM-DD')
        );
        setValidades(validadesOrdenadas);
    }, []);

    const openEditModal = (produto) => {
        setEditProduct(produto);
        setNovaData(produto.data);
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditProduct(null);
        setNovaData('');
        setEditModalIsOpen(false);
    };

    const handleEdit = () => {
        if (editProduct) {
            atualizarValidade(editProduct, novaData);
            const validadesData = obterValidades();
            const validadesAtualizadas = validadesData.sort(
                (a, b) => moment(a.data, 'YYYY-MM-DD') - moment(b.data, 'YYYY-MM-DD')
            );
            setValidades(validadesAtualizadas);
            closeEditModal();
        }
    };

    return (
        <div className="container">
            <h2 className="titulo">Gerenciador de Validades</h2>
            <div className="content">
                <table>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Data de Validade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {validades.map((produto, index) => (
                            <tr key={index}>
                                <td>{produto.nome}</td>
                                <td>{`${formatarData(produto.data)}`}</td>
                                <td>
                                    <button
                                        onClick={() => openEditModal(produto)}
                                        className="button1"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={closeEditModal}
                contentLabel="Editar Data de Validade"
                className="modal"
            >
                <h2>Editar Data de Validade</h2>
                {editProduct && (
                    <div>
                        <label>
                            Nova Data de Validade:
                            <input
                                type="date"
                                value={novaData}
                                onChange={(e) => setNovaData(e.target.value)}
                            />
                        </label>
                        <button onClick={handleEdit} className="button1">
                            Salvar
                        </button>
                        <button onClick={closeEditModal} className="button2">
                            Cancelar
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default GerenciadorValidades;
