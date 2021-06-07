const ObjectId = require('mongodb').ObjectId;
const { getDatabase } = require('../config/mongodb')

class TvSeries {
  static findAll() {
    return(
      getDatabase()
        .collection('TvSeries')
        .find()
        .toArray()
    ) 
  }

  static findOne(id) {
    const o_id = new ObjectId(id)
    return(
      getDatabase()
        .collection('TvSeries')
        .findOne({ "_id": o_id })
    )
  }

  static addTvSeries(payload) {
    return(
      getDatabase()
        .collection('TvSeries')
        .insertOne(payload)
    )
  }

  static updateTvSeries(payload, id) {
    const o_id = new ObjectId(id)
    return( 
      getDatabase()
        .collection('TvSeries')
        .updateOne({ _id : o_id }, { $set: payload })
    )
  }

  static deleteTvSeries(id) {
    const o_id = new ObjectId(id)
    return(
      getDatabase()
        .collection('TvSeries')
        .findOneAndDelete({ "_id" : o_id })
    )
  }
}
module.exports = TvSeries