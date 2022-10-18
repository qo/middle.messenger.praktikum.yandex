const express = require('express');

const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
    console.log(
        `
        Сервер запущен на порту 3000.
        http://localhost:3000/
        `
    );
});