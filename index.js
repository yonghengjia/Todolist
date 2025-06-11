// 1. 引入 express 框架,处理http请求
const express = require('express');

// 2. 创建 express 应用对象，初始化一个web服务器实例，app是整个应用的控制器
const app = express();

// 3. 设置服务器监听的端口，前端之后就是访问这个端口
const port = 3000;

// 4. 中间件：中间件：自动把请求中的 JSON 数据转换为 JS 对象（否则 req.body 是 undefined）
app.use(express.json());
// 引入 todos 路由
const todoRoutes = require('./routes/todos');
app.use('/todos', todoRoutes);


// 5. 定义一个测试用的根路由，可以用浏览器打开 http://localhost:3000/ 来测试服务器是否跑通
app.get('/', (req, res) => {
  res.send('Welcome to Todo API!');
});

// 6. 启动服务器，开始监听端口请求（运行成功会打印一段提示）
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
