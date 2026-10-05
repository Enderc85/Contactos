var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('agenda_view.ejs', { title: 'Agenda de Contactos' });
});

module.exports = router;
