const router = require('express').Router()
const TvSerieCtrl = require('../controllers/TvSerieCtrl')

router.get('/', TvSerieCtrl.findAll)
router.get('/:id', TvSerieCtrl.findOne)
router.post('/', TvSerieCtrl.addTvSeries)
router.put('/:id', TvSerieCtrl.updateTvSeries)
router.delete('/:id', TvSerieCtrl.deleteTvSeries)

module.exports = router