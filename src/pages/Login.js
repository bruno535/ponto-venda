import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { obterUsuarios, adicionarUsuario } from '../services/UsuariosService.js';
import {
    obterUsuarioAtual,
    adicionarUsuarioAtual,
} from '../services/UsuarioAtualService.js';
import BemVindo from '../components/BemVindo.js';
import '../styles/Login.css';

const Login = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [cargo, setCargo] = useState('');
    const [senhaQuaseSecreta, setSenhaQuseSecreta] = useState('');
    const [logado, setLogado] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const navegar = useNavigate();

    useEffect(() => {
        const usuarioGuardado = obterUsuarioAtual();

        if (usuarioGuardado) {
            setNome(usuarioGuardado.nome);
            setLogado(true);
        }

        const usuarios = obterUsuarios();
        setUsuarios(usuarios);
    }, []);

    const lidarComLogin = () => {
        try {
            if (!nome || !senha) {
                setMensagemErro('Preencha todos os campos.');
                return;
            }

            const usuarioEncontrado = usuarios.find(
                (usuario) => usuario.nome === nome && usuario.senha === senha
            );

            if (usuarioEncontrado) {
                adicionarUsuarioAtual(usuarioEncontrado);
                setLogado(true);
                setMensagemErro('');
                setTimeout(() => {
                    setLogado(true);
                }, 4000);
            } else {
                setLogado(false);
                setMensagemErro('Credenciais inválidas');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            setMensagemErro('Ocorreu um erro ao fazer login.');
        }
    };
    useEffect(() => {
        if (logado) {
            setTimeout(() => {
                navegar('/ponto-de-vendas/');
            }, 3000);
        }
    }, [logado]);

    if (logado) {
        return (
            <>
                <BemVindo nome={nome} />
                <p>Redirecionando...</p>
            </>
        );
    }

    const adicionarNovoUsuario = () => {
        if (senhaQuaseSecreta === 'senha') {
            adicionarUsuario(nome, senha, cargo);
            setModalAberto(false);
        } else {
            setMensagemErro('Senha administrativa incorreta');
        }
    };

    return (
        <div className="login">
            <div className="containerLogin">
                <h2>Login</h2>
                <div>
                    <span>admin - 0000</span>
                </div>
                <input
                    type="text"
                    placeholder="Nome de Usuário"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            lidarComLogin();
                        }
                    }}
                />
                <div className="loginButtons">
                    <button onClick={lidarComLogin} className="button1">
                        Entrar
                    </button>
                    <button onClick={() => setModalAberto(true)} className="button1">
                        Adicionar
                    </button>
                </div>
                <p className="erro">{mensagemErro}</p>
                <Modal
                    isOpen={modalAberto}
                    onRequestClose={() => setModalAberto(false)}
                    contentLabel="Adicionar Usuário"
                    className="modal"
                >
                    <h2>Adicionar Novo Usuário</h2>
                    <input
                        type="text"
                        placeholder="Nome de Usuário"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Cargo do Usuário"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha Administrativa"
                        value={senhaQuaseSecreta}
                        onChange={(e) => setSenhaQuseSecreta(e.target.value)}
                    />
                    <button onClick={adicionarNovoUsuario} className="button3">
                        Adicionar
                    </button>
                </Modal>
            </div>
        </div>
    );
};

export default Login;
