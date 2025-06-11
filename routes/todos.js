const express = require('express');
const router = express.Router(); //拆分出一个小型路由系统（模块化设计）

// 模拟数据库的数组，临时数组，以后可以替换成MongoDB
let todos = [];
let nextId = 1;

// GET 所有 todos， 功能：返回所有代办事项
router.get('/', (req, res) => {
  res.json(todos);
});

// POST 新增 todo 功能：创建新事项，并自动生成ID
router.post('/', (req, res) => {
    const text = req.body?.text;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    

  const newTodo = { id: nextId++, text };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT 修改 todo 功能：修改指定ID的事项内容
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
  
    // 防止 req.body 为 undefined
    const text = req.body?.text;
    if (typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required and must be a non-empty string' });
    }
  
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
  
    todo.text = text;
    res.json(todo);
  });
  

// DELETE 删除 todo 功能：删除指定ID的事项
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
