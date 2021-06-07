const router = require('express').Router()
const TvSeriesCtrl = require('../controllers/TvSeriesCtrl')

router.get('/', (req, res) => res.send('Server TV Series Running'))

router.get('/tv', TvSeriesCtrl.findAll)
router.get('/tv/:id', TvSeriesCtrl.findOne)
router.post('/tv', TvSeriesCtrl.addTvSeries)
router.put('/tv/:id', TvSeriesCtrl.updateTvSeries)
router.delete('/tv/:id', TvSeriesCtrl.deleteTvSeries)

module.exports = router