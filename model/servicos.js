var db = require('../database/conexao');

module.exports = {
    buscar: function (id_categoria, _callback) {
        let sql = "select servicos.* from servicos " +
            " inner join categorias on categorias.id = servicos.id_categoria " +
            ` where servicos.id_categoria = ${id_categoria} order by servicos.servico`

        db.conexao(function (conexao) {
            conexao.query(sql).then(res => {
                conexao.end();
                _callback(200, null, res.rows);
            }).catch(e => {
                conexao.end();
                _callback(500, e, null);
            });
        });
    }


}