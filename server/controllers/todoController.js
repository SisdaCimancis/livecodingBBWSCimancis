const Todo = require('../models/todoModel');

exports.getTodos = (req, res) => res.json(Todo.getAll());

exports.addTodo = (req, res) => {
  if (!req.body.title) return res.status(400).json({ message: 'Title required' });
  res.status(201).json(Todo.create(req.body.title));
};

exports.updateTodo = (req, res) => {
  const todo = Todo.update(req.params.id, req.body);
  res.json(todo);
};

exports.deleteTodo = (req, res) => {
  Todo.remove(req.params.id);
  res.status(204).send();
};