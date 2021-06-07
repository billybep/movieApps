const { ObjectId } = require('bson');
const { getDatabase } = require('../config/mongodb')

class Movie {
  static findAll() {
    return(
      getDatabase()
        .collection('Movies')
        .find()
        .toArray()
    ) 
  }

  static findOne(id) {
    const o_id = new ObjectId(id)
    return(
      getDatabase()
        .collection('Movies')
        .findOne({ "_id": o_id })
    )
  }

  static addMovie(payload) {
    return(
      getDatabase()
        .collection('Movies')
        .insertOne(payload)
    )
  }

  static updateMovie(payload, id) {
    const o_id = new ObjectId(id)
    return( 
      getDatabase()
        .collection('Movies')
        .updateOne({ _id : o_id }, { $set: payload })
    )
  }

  static deleteMovie(id) {
    const o_id = new ObjectId(id)
    return(
      getDatabase()
        .collection('Movies')
        .findOneAndDelete({ "_id" : o_id })
    )
  }
}
module.exports = Movie