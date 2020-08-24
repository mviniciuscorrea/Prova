var db = require('../database/conexao');

module.exports = {
    status: function (_callback) {
        let sql = `select
                    (select count(agenda.id_servico) from agenda where agenda.dt_cadastro > current_date - interval '7 days') as total_servicos,
                    (select count(agenda.id_servico) from agenda where agenda.confirmado = true and agenda.dt_cadastro > current_date - interval '7 days') as confirmados,
                    (select count(agenda.id_servico) from agenda where agenda.confirmado = false and agenda.dt_cadastro > current_date - interval '7 days') as confirmar,
                    (select coalesce(sum(agenda.valor),0) from agenda where agenda.realizado = true and agenda.dt_cadastro > current_date - interval '7 days') as recebido    
                    from agenda
                    group by 1,2,3,4 `;       

        db.conexao(function (conexao) {
            conexao.query(sql).then(res => {
                conexao.end();
                _callback(200, null, res.rows[0]);
            }).catch(e => {
                conexao.end();
                _callback(500, e, null);
            });
        });
    }
}