var db = require('../database/conexao');
const moment = require('moment');

module.exports = {
    inserir: function (json, _callback) {
        const promises = [];

        db.conexao(function (conexao) {
            json.forEach(s => {
                let data = s.data_agendamento.substring(10, 6) + '-' + s.data_agendamento.substring(5, 3) + '-' + s.data_agendamento.substring(0, 2)

                let sql = 'insert into agenda (pessoa, data_agendamento, hora_agendamento, id_servico, valor) values ($1, $2, $3, $4, $5)';

                const promise = conexao.query(sql, [s.pessoa, data, s.hora_agendamento, s.id_servico, s.valor]);
                promises.push(promise);
            });

            Promise.all(promises).then(() => {
                conexao.end();
                _callback(201, null);
            }).catch((error) => {
                conexao.end();
                _callback(500, error);
            })
        });
    },

    buscarCompleto: function (pesquisar, _callback) {
        let where = '';      

        if (pesquisar !== '') {
            if (isNaN(pesquisar)) {
                where += " fun_sem_acento(pessoa.nome) ilike '%" + pesquisar + "%'";
            } else {
                where += ' pessoa.id = ' + pesquisar;
            }
        }

        let sql = `SELECT ROW_NUMBER () OVER (ORDER BY agenda.data_agendamento, agenda.hora_agendamento) as index
                             ,pessoa.id
                             ,pessoa.nome 
                             ,agenda.id
                             ,to_char(agenda.data_agendamento, 'DD/MM/YYYY') AS data_agendamento            
                            ,agenda.hora_agendamento
                            ,agenda.id_servico
                            ,servicos.servico
                            ,agenda.valor
                            ,agenda.realizado
                            ,agenda.confirmado
                        FROM agenda
                        INNER JOIN servicos ON servicos.id = agenda.id_servico
                        inner join pessoa on pessoa.id = agenda.pessoa 
                        where ${where} order by agenda.data_agendamento, agenda.hora_agendamento`;       

        db.conexao(function (conexao) {
            conexao.query(sql).then(res => {
                conexao.end();
                _callback(200, null, res.rows);
            }).catch(e => {
                conexao.end();
                _callback(500, e, null);
            });
        });
    },

    realizadoAgendamento: function (id_agendamento, _callback) {
        let sql = 'update agenda set realizado = true where id = ' + id_agendamento;

        db.conexao(function (conexao) {
            conexao.query(sql).then(res => {
                conexao.end();
                _callback(204, null, null);
            }).catch((error) => {
                conexao.end();
                _callback(500, error);
            })
        });
    },

    confirmarAgendamento: function (id_agendamento, _callback) {
        let sql = 'update agenda set confirmado = true where id = ' + id_agendamento;

        console.log(sql);

        db.conexao(function (conexao) {
            conexao.query(sql).then(res => {
                conexao.end();
                _callback(204, null, null);
            }).catch((error) => {
                conexao.end();
                _callback(500, error);
            })
        });
    },

    buscar: function (pessoa, headers, _callback) {
        let where = '';

        if (headers.realizado) {
            if (headers.realizado == 'true' || headers.realizado == 'false') {
                where = ` agenda.realizado = ${headers.realizado} and`;
            }
        }

        if ((headers.dtinicial) && (headers.dtfinal)) {
            where += ` dt_cadastro >= '${headers.dtinicial} 00:00:01' and dt_cadastro <= '${headers.dtfinal} 23:59:59' and`
        }

        let sql = `SELECT ROW_NUMBER () OVER (ORDER BY agenda.data_agendamento, agenda.hora_agendamento) as index
                             ,agenda.id
                             ,to_char(agenda.data_agendamento, 'DD/MM/YYYY') AS data_agendamento            
                            ,agenda.hora_agendamento
                            ,agenda.id_servico
                            ,servicos.servico
                            ,agenda.valor
                            ,agenda.realizado
                            ,agenda.confirmado
                        FROM agenda
                        INNER JOIN servicos ON servicos.id = agenda.id_servico
                        WHERE ${where} pessoa = ${pessoa} order by agenda.data_agendamento, agenda.hora_agendamento`;

        db.conexao(function (conexao) {
            conexao.query(sql).then(res => {
                conexao.end();
                _callback(200, null, res.rows);
            }).catch((error) => {
                conexao.end();
                _callback(500, error);
            })
        });
    },

    remarcar: function (json, _callback) {
        let data = json.data_agendamento.substring(10, 6) + '-' + json.data_agendamento.substring(5, 3) + '-' + json.data_agendamento.substring(0, 2)

        let sql = "update agenda set data_agendamento = '" + data + "', hora_agendamento = '" + json.hora_agendamento + "' where id = " + json.id;

        db.conexao(function (conexao) {
            conexao.query(sql).then(() => {
                conexao.end();
                _callback(204, null);
            }).catch(err => {
                conexao.end();
                _callback(500, err);
            });
        });
    },
}