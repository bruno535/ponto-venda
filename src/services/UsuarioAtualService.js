export const obterUsuarioAtual = () =>
    JSON.parse(localStorage.getItem('usuarioAtual'));

export const removerUsuarioAtual = () =>
    localStorage.removeItem('usuarioAtual');

export const adicionarUsuarioAtual = (usuario) =>
    localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
