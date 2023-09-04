const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

export const obterUsuarios = () => usuarios;

//usuario para teste
const usuarioAdmin = {
    nome: 'admin',
    senha: '0000',
    cargo: 'admin',
};
const adminJaAdicionado = usuarios.some((usuario) => usuario.nome === 'admin');

if (!adminJaAdicionado) {
    usuarios.unshift(usuarioAdmin);
}

const reorganizarIds = () => {
    usuarios.forEach((usuario, index) => {
        usuario.id = index + 1;
    });
};

const salvarUsuarioNoLocalStorage = () => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};

export const adicionarUsuario = (nome, senha, cargo) => {
    const id = usuarios.length + 1;

    const novoUsuario = {
        id,
        nome,
        senha,
        cargo,
    };

    usuarios.push(novoUsuario);
    salvarUsuarioNoLocalStorage();
    return novoUsuario;
};

export const atualizarUsuarioNaLista = (novosUsuarios) => localStorage.setItem('usuarios', JSON.stringify(novosUsuarios))

export const atualizarUsuario = (id, nome, senha, cargo) => {
    const usuario = usuarios.find((p) => p.id === id);

    if (usuario) {
        usuario.nome = nome;
        usuario.senha = senha;
        usuario.cargo = cargo;
        salvarUsuarioNoLocalStorage();
    }
};

export const removerUsuario = (id) => {
    const index = usuarios.findIndex((p) => p.id === id);

    if (index !== -1) {
        usuarios.splice(index, 1);
        reorganizarIds();
        salvarUsuarioNoLocalStorage();
    }
};
