const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const rotas = require('./routes');

app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', rotas);
app.use((req, res, next) => {
    const erro = new Error("Rota não encontrada");
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            mensagem: error.message
        }
    })
})

module.exports = app;