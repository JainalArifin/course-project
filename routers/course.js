const express = require('express')
const router = express.Router()

const db = require('../models')

router.get('/', (req, res)=>{
  db.Course.findAll()
  .then((dataCourse)=> {
    res.render('course', {dtCourse:dataCourse})
  })
})


module.exports = router
