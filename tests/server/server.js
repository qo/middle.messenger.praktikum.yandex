const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
    noCors: false,
});

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
    }
    next();
});

// API
server.get('/mock', (req, res) => {

    return res.status(200).json({ message: 'Server is running' });
});

server.get('/api/test/get', (req, res) => {

    return res.status(200).json({ status: 200 });
});

server.use(router);
server.listen(1234, () => {
    console.info('Тестовый сервер запущен на порту 1234');
});

module.exports = server;
