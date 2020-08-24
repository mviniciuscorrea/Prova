const servicosModel = require('../model/servicos');

module.exports = {
    buscar: async (req, res) => {
        let erro = '';

        if ((!req.headers.idcategoria) || (req.headers.idcategoria < 1)) {
            erro = "Id da categoria não informado ou inválido";
        }

        if (erro != '') {
            res.status(400).json({ Retorno: erro });
        } else {
            servicosModel.buscar(req.headers.idcategoria, function (statusCode, msg, data) {
                if (statusCode == 200) {
                    res.status(statusCode).json(data);
                } else {
                    res.status(statusCode).json({ Retorno: msg });
                }
            });
        }
    },
}