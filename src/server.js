const express = require('express');

const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../dist/')));
app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// require('dotenv').config();
// const PORT = process.env.PORT || 3000;
const PORT = 3000;

app.listen(PORT, () => {
    console.log(
        `
        Сервер запущен на порту ${PORT}.
        http://localhost:${PORT}/
        `
    );
});