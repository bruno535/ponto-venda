import React from 'react';
import { Link } from 'react-router-dom';

const Navegacao = () => (
    <nav>
        <Link to="/ponto-de-vendas/">Ponto de Vendas</Link>
        <Link to="/gerenciador-estoque">Gerenciador de Estoque</Link>
        <Link to="/gerenciador-validades">Gerenciamento de Validades</Link>
        <Link to="/relatorio-vendas">Relatorio de Vendas</Link>
        <Link to="/usuarios">Usuarios</Link>
    </nav>
);

export default Navegacao;
