const loginModel = require('../model/login');

module.exports = {
    liberar: async (req, res) => {
        let erro = '';

        if (!req.headers.usuario) {
            erro = "Usuário não informado";
        }

        if (!req.headers.senha) {
            erro = "Senha não informada";
        }

        if (erro != '') {
            res.status(400).json({ Retorno: erro });
        } else {
            loginModel.liberar(req.headers, function (statusCode, msg, data) {
                if (statusCode == 200) {
                    res.status(statusCode).json({ id_usuario: data });
                } else {
                    res.status(statusCode).json({ Retorno: msg });
                }
            });
        }
    },

    novoUsuario: async (req, res) => {
        let erro = '';

        console.log(req.body)

       
        if (erro != '') {
            res.status(400).json({ Retorno: erro });
        } else {
            loginModel.novoUsuario(req.body, function (statusCode, msg, data) {
                if (statusCode == 201) {
                    res.status(statusCode).json();
                } else {
                    res.status(statusCode).json({ Retorno: msg });
                }
            });
        }
    },
}