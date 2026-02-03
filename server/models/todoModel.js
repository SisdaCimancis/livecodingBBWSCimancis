let todos = [];
let id = 1;

module.exports = {
  getAll: () => todos,
  create: title => {
    const todo = { id: id++, title, completed: false };
    todos.push(todo);
    return todo;
  },
  update: (idTodo, data) => {
    const todo = todos.find(t => t.id == idTodo);
    if (!todo) return null;
    todo.completed = data.completed ?? todo.completed;
    todo.title = data.title ?? todo.title;
    return todo;
  },
  remove: idTodo => {
    todos = todos.filter(t => t.id != idTodo);
  }
};