import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components
import Navegacao from './components/Navegacao.js';
import Usuario from './components/Usuario.js';
// Pages
import GerenciadorEstoque from './pages/GerenciadorEstoque.js';
import GerenciadorValidades from './pages/GerenciadorValidade.js';
import Login from './pages/Login.js';
import PontoVenda from './pages/PontoVenda.js';
import RelatorioVendas from './pages/RelatorioVendas.js';
import TodosUsuarios from './pages/TodosUsuarios.js';
// Styles
import './styles/App.css';

const App = () => (
  <BrowserRouter>
    <Navegacao />
    <main>
      <Usuario />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ponto-de-vendas/" element={<PontoVenda />} />
        <Route path="/gerenciador-estoque" element={<GerenciadorEstoque />} />
        <Route path="/usuarios" element={<TodosUsuarios />} />
        <Route
          path="/gerenciador-validades"
          element={<GerenciadorValidades />}
        />
        <Route path="/relatorio-vendas" element={<RelatorioVendas />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
