import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {
    obterUsuarios,
    atualizarUsuarioNaLista,
} from '../services/UsuariosService.js';
import '../styles/TodosUsuarios.css';

const TodosUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [senhaAntiga, setSenhaAntiga] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [novoNome, setNovoNome] = useState('');
    const [novoCargo, setNovoCargo] = useState('');
    const [editandoUsuario, setEditandoUsuario] = useState(null);
    const [senhaAntigaModalAberto, setSenhaAntigaModalAberto] = useState(false);
    const [usuarioRemover, setUsuarioRemover] = useState(null);
    const [atualizacoesModalAberto, setAtualizacoesModalAberto] = useState(false);
    const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false);

    console.log(usuarios);

    useEffect(() => {
        setUsuarios(obterUsuarios());
    }, []);

    const handleEditarUsuario = (usuario) => {
        setEditandoUsuario(usuario);
        setSenhaAntigaModalAberto(true);
    };

    const handleEditarSenha = () => {
        if (senhaAntiga === editandoUsuario.senha) {
            setSenhaAntigaModalAberto(false);
            setAtualizacoesModalAberto(true);
        } else {
            alert('Senha antiga incorreta. Tente novamente.');
        }
    };

    const handleEditarUsuarioInfo = () => {
        if (novoNome || senhaNova || novoCargo) {
            const usuarioAtualizado = { ...editandoUsuario };
            console.log(usuarioAtualizado);
            if (novoNome) {
                usuarioAtualizado.nome = novoNome;
            }
            if (senhaNova) {
                usuarioAtualizado.senha = senhaNova;
            }
            if (novoCargo) {
                usuarioAtualizado.cargo = novoCargo;
            }

            const novosUsuarios = usuarios.map((u) =>
                u.id === usuarioAtualizado.id ? usuarioAtualizado : u
            );

            setUsuarios(novosUsuarios);
            atualizarUsuarioNaLista(novosUsuarios);
            console.log(novosUsuarios);

            // Limpar os campos após a atualização
            setNovoNome('');
            setSenhaNova('');
            setNovoCargo('');
            setEditandoUsuario(null);
            setAtualizacoesModalAberto(false);
        }
    };

    const handleConfirmarRemocao = () => {
        if (usuarioRemover) {
            const novosUsuarios = usuarios.filter((u) => u.id !== usuarioRemover.id);
            atualizarUsuarioNaLista(novosUsuarios);
            setUsuarios(novosUsuarios);
            setModalConfirmacaoAberto(false);
        }
    };

    return (
        <div className="todosUsuarios">
            <h2 className="titulo">Lista de Usuários</h2>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        <span>
                            Nome: <em>{usuario.nome}</em>, Senha:{' '}
                            <em>{usuario.senha.replace(/./g, '*')}</em>, Cargo:{' '}
                            <em>{usuario.cargo}</em>
                        </span>
                        <div>
                            <button
                                onClick={() => handleEditarUsuario(usuario)}
                                className="button1"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => {
                                    setUsuarioRemover(usuario);
                                    setModalConfirmacaoAberto(true);
                                }}
                                className="button2"
                            >
                                Remover
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <Modal
                isOpen={modalConfirmacaoAberto}
                onRequestClose={() => setModalConfirmacaoAberto(false)}
                className="modal"
            >
                <h2>Confirmar Remoção</h2>
                <p>
                    Deseja remover o usuário {usuarioRemover ? usuarioRemover.nome : ''}?
                </p>
                <div>
                    <button onClick={handleConfirmarRemocao} className="button3">
                        Confirmar
                    </button>
                    <button
                        onClick={() => setModalConfirmacaoAberto(false)}
                        className="button2"
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={senhaAntigaModalAberto}
                onRequestClose={() => setSenhaAntigaModalAberto(false)}
                className="modal"
            >
                <h2>Digite sua senha para editar as informações</h2>
                <label htmlFor="senhaAntiga">Senha:</label>
                <input
                    type="password"
                    id="senhaAntiga"
                    value={senhaAntiga}
                    onChange={(e) => setSenhaAntiga(e.target.value)}
                />
                <div>
                    <button onClick={handleEditarSenha} className="button3">
                        Confirmar Senha
                    </button>
                    <button
                        onClick={() => setSenhaAntigaModalAberto(false)}
                        className="button2"
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>
            <Modal
                isOpen={atualizacoesModalAberto}
                onRequestClose={() => setAtualizacoesModalAberto(false)}
                className="modal"
            >
                <h2>Editar Informações</h2>
                <label htmlFor="novoNome">Novo Nome:</label>
                <input
                    type="text"
                    id="novoNome"
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                />
                <label htmlFor="senhaNova">Nova Senha:</label>
                <input
                    type="password"
                    id="senhaNova"
                    value={senhaNova}
                    onChange={(e) => setSenhaNova(e.target.value)}
                />
                <label htmlFor="novoCargo">Novo Cargo:</label>
                <input
                    type="text"
                    id="novoCargo"
                    value={novoCargo}
                    onChange={(e) => setNovoCargo(e.target.value)}
                />
                <div>
                    <button onClick={handleEditarUsuarioInfo} className="button3">
                        Concluir Edição
                    </button>
                    <button
                        onClick={() => setAtualizacoesModalAberto(false)}
                        className="button2"
                    >
                        Cancelar
                    </button>
                </div>
                <em>Caso deixe vazio o campo ficara a informação antiga</em>
            </Modal>
        </div>
    );
};

export default TodosUsuarios;
