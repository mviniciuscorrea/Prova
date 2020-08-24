const agendaModel = require('../model/agenda');

module.exports = {
    inserir: (req, res) => {
        agendaModel.inserir(req.body, function (statusCode, msg) {
            if (statusCode == 201) {
                res.status(statusCode).json();
            } else {
                res.status(statusCode).json({ Retorno: msg });
            }
        });
    },

    buscarCompleto: async (req, res) => {
        console.log('pesquisar');

        agendaModel.buscarCompleto(req.headers.pesquisar, function (statusCode, msg, data) {
            if (statusCode == 200) {
                res.status(statusCode).json(data);
            } else {
                res.status(statusCode).json({ Retorno: msg });
            }
        });
    },

    buscar: async (req, res) => {
        let erro = '';

        if ((!req.params.id_pessoa) || (isNaN(req.params.id_pessoa)) || (req.params.id_pessoa < 1)) {
            erro = "Usuário não informado";
        }

        if (erro != '') {
            res.status(400).json({ Retorno: erro });
        } else {
            agendaModel.buscar(req.params.id_pessoa, req.headers, function (statusCode, msg, data) {
                if (statusCode == 200) {
                    res.status(statusCode).json(data);
                } else {
                    res.status(statusCode).json({ Retorno: msg });
                }
            });
        }
    },

    realizadoAgendamento: (req, res) => {
        let erro = '';

        if ((!req.params.id_agendamento) || (isNaN(req.params.id_agendamento)) || (req.params.id_agendamento < 1)) {
            erro = "ID do agendamento não informado";
        }

        if (erro != '') {
            res.status(400).json({ Retorno: erro });
        } else {
            agendaModel.realizadoAgendamento(req.params.id_agendamento, function (statusCode, msg) {
                if (statusCode == 204) {
                    res.status(statusCode).json();
                } else {
                    res.status(statusCode).json({ Retorno: msg });
                }
            });
        }
    },

    confirmarAgendamento: (req, res) => {
        let erro = '';

        if ((!req.params.id_agendamento) || (isNaN(req.params.id_agendamento)) || (req.params.id_agendamento < 1)) {
            erro = "ID do agendamento não informado";
        }

        if (erro != '') {
            res.status(400).json({ Retorno: erro });
        } else {
            agendaModel.confirmarAgendamento(req.params.id_agendamento, function (statusCode, msg) {
                if (statusCode == 204) {
                    res.status(statusCode).json();
                } else {
                    res.status(statusCode).json({ Retorno: msg });
                }
            });
        }
    },

    remarcarAgendamento: (req, res) => {
        agendaModel.remarcar(req.body, function (statusCode, msg) {
            if (statusCode == 204) {
                res.status(statusCode).json();
            } else {
                res.status(statusCode).json({ Retorno: msg });
            }
        });
    }
}