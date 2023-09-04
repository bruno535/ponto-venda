import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    obterUsuarioAtual,
    removerUsuarioAtual,
} from '../services/UsuarioAtualService.js';
import '../styles/Usuario.css';

const Usuario = () => {
    const [usuario, setUsuario] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setUsuario(obterUsuarioAtual());
    }, [navigate]);

    const handleLogout = () => {
        removerUsuarioAtual();
        setUsuario([]);
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/');
    };

    return (
        <div className="usuario">
            <h2>Operador(a)</h2>
            <img
                src="https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png"
                alt="usuario"
            />
            {usuario ? (
                <>
                    <p>{usuario.nome && `Nome: ${usuario.nome}`}</p>
                    <p>{usuario.cargo && `Cargo: ${usuario.cargo}`}</p>
                    <button onClick={handleLogout} className="button2">
                        Logout
                    </button>
                </>
            ) : (
                <button onClick={handleLogin} className="button2">
                    Login
                </button>
            )}
        </div>
    );
};

export default Usuario;
