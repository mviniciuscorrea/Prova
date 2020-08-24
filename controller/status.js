const statusModel = require('../model/status');

module.exports = {
    status: async (req, res) => {
        statusModel.status(function (statusCode, msg, data) {
            if (statusCode == 200) {
                res.status(statusCode).json(data);
            } else {
                res.status(statusCode).json({ Retorno: msg });
            }
        });
    },
}