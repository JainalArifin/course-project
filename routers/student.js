const express = require('express')
const router = express.Router()

const db = require('../models')

router.get('/', (req, res)=>{
  db.Student.findAll()
  .then((dataStudent)=> {
    res.render('student', {dtStudent:dataStudent})
  })
})

router.post('/', (req, res)=> {
  db.Student.create({name:`${req.body.name}`,gender:`${req.body.gender}`,address:`${req.body.address}`,email:`${req.body.email}`})
  .then(() => {
    res.redirect('/student')
  })
})

module.exports = router
