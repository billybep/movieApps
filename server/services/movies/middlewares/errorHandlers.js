module.exports = errorHandler = (err, req, res, next) => {
  console.log(err)
  
  switch (err.name) { 
    default: res.status(500).json({message: err.mesaage || 'Internal Server Error!'})
      break;
  }
}
