const router = require('express').Router()
const MovieCtrl = require('../controllers/MovieCtrl')

router.get('/', (req, res) => res.send('Server Movies Running'))

router.get('/movies', MovieCtrl.findAll)
router.get('/movies/:id', MovieCtrl.findOne)
router.post('/movies', MovieCtrl.addMovie)
router.put('/movies/:id', MovieCtrl.updateMovie)
router.delete('/movies/:id', MovieCtrl.deleteMovie)

module.exports = router