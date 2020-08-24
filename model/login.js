var db = require('../database/conexao');

module.exports = {
    liberar: function (dados, _callback) {

        let perfil = 2

        if (parseInt(dados.perfil) > 0) {
            perfil = dados.perfil;
        }

        let sql = `select pessoa.id 
                   from pessoa 
                   inner join perfil on perfil.id = pessoa.id_perfil 
                   where pessoa.usuario = '${dados.usuario}' and pessoa.senha = '${dados.senha}' and pessoa.id_perfil = ${perfil}`;

        db.conexao(function (conexao) {
            conexao.query(sql).then(res => {
                conexao.end();

                if (res.rows.length > 0) {
                    _callback(200, null, parseInt(res.rows[0].id));
                } else {
                    _callback(401, 'Usuário não encontrado', null);
                }
            }).catch(e => {
                conexao.end();
                _callback(500, e, null);
            });
        });
    },

    novoUsuario: function (json, _callback) {
        let sql = 'insert into pessoa (nome, usuario, senha) values ($1, $2, $3)';        

        db.conexao(function (conexao) {
            conexao.query(sql, [json.nome, json.usuario, json.senha]).then(() => {
                conexao.end();
                _callback(201, null);
            }).catch((error) => {
                conexao.end();
                _callback(500, error);
            })
        });
    },
}