const router = require('express').Router()
const tvSeriesRoute = require('./tvSerieRoute')
const MovieCtrl = require('../controllers/MovieCtrl')

router.get('/movies', MovieCtrl.findAll)
router.get('/movies/:id', MovieCtrl.findOne)
router.post('/movies', MovieCtrl.addMovie)
router.put('/movies/:id', MovieCtrl.updateMovie)
router.delete('/movies/:id', MovieCtrl.deleteMovie)

router.use('/tv', tvSeriesRoute)

module.exports = router