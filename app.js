const express = require('express');
const { sequelize, Task } = require('./models');

const app = express();
app.use(express.json());

// Получение всех задач
app.get('/tasks', (req, res) => {
  Task.findAll().then(tasks => res.json(tasks)).catch(err => res.status(500).send(err.message));
});

// Получение задачи по ID
app.get('/tasks/:id', (req, res) => {
  Task.findByPk(req.params.id)
    .then(task => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).send('Task not found');
      }
    })
    .catch(err => res.status(500).send(err.message));
});

// Создание новой задачи
app.post('/tasks', (req, res) => {
  Task.create(req.body).then(task => res.status(201).json(task)).catch(err => res.status(400).send(err.message));
});

// Обновление задачи
app.put('/tasks/:id', (req, res) => {
  Task.update(req.body, {
    where: { id: req.params.id }
  })
  .then(() => {
    res.status(200).send('Updated successfully');
  })
  .catch(err => res.status(400).send(err.message));
});

// Удаление задачи
app.delete('/tasks/:id', (req, res) => {
  Task.destroy({
    where: { id: req.params.id }
  })
  .then(() => {
    res.status(200).send('Deleted successfully');
  })
  .catch(err => res.status(500).send(err.message));
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
