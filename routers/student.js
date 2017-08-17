const express = require('express')
const router = express.Router()

const model = require('../models')

router.get('/', (req, res)=>{
  model.Student.findAll()
  .then((dataStudent)=> {
    res.render('student', {dtStudent:dataStudent})
  })
})

router.post('/', (req, res)=> {
  model.Student.create({name:`${req.body.name}`,gender:`${req.body.gender}`,address:`${req.body.address}`,email:`${req.body.email}`})
  .then(() => {
    res.redirect('/student')
  })
})

module.exports = router
