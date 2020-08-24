const pg = require('pg');

module.exports = {
    conexao: function (_callback) {    
        const conexao = new pg.Client({
            user: 'fyzxjegb',
            host: 'tuffi.db.elephantsql.com',
            database: 'fyzxjegb',
            password: '8qqQO0K3ixTzsxgu_c3JvivNTMLpbiKZ',
            port: 5432,
            ssl: true
        })

        conexao.connect();
        _callback(conexao);
    },
}
