const express = require('express');
const router = express.Router();
const servicos = require('./controller/servicos');
const agenda = require('./controller/agenda');
const login = require('./controller/login');
const status = require('./controller/status');

router.get('/status/', status.status);

router.get('/login/', login.liberar);
router.post('/login/', login.novoUsuario);

router.get('/servicos/', servicos.buscar);
router.post('/agendas/', agenda.inserir);

router.get('/agendas/completo/', agenda.buscarCompleto);
router.get('/agendas/:id_pessoa', agenda.buscar);

router.put('/agendas/remarcar/', agenda.remarcarAgendamento);
router.put('/agendas/realizado/:id_agendamento', agenda.realizadoAgendamento);
router.put('/agendas/confirmar/:id_agendamento', agenda.confirmarAgendamento);

module.exports = router;