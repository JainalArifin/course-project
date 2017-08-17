const express = require('express')
const router = express.Router()

const model = require('../models')

router.get('/', (req, res)=>{
  model.Course.findAll()
  .then((dataCourse)=> {
    res.render('course', {dtCourse:dataCourse})
  })
})


module.exports = router
