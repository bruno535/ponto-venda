export const todosRelatorios = () => JSON.parse(localStorage.getItem('todosRelatorios'))

export const adicionarATodosRelatorios = (relatorios) => localStorage.setItem(
    'todosRelatorios',
    JSON.stringify(relatorios))