const express = require('express')
const router = express.Router()

const models = require('../models')

router.get('/', (req, res)=>{
  models.Student.findAll()
  .then((data)=> {
    res.render('student', {dataStudent: data})
  })
})


router.get('/add', (req, res) => {
    res.render('addStudent', {
      errmsg: '', pageTitle: 'Add Student Page'
    })
 })

router.post('/', (req, res) => {
   models.Student.findOne({
      where:{
       email:req.body.email
      }
    })
  .then((result) => {
    if(!result){
      models.Student.create({
        name: req.body.name,
        gender: req.body.gender,
        address: req.body.address,
        email: req.body.email,
      })
      .then(() => {
        res.redirect('/student')
      })
      .catch((err) => {
       res.render('addStudent', {
         errmsg: err.message
       });
      })
    } else {
      res.render('addStudent', {
        errmsg: 'Email sudah ada'
      });
     }
    })
  })

 router.get('/delete/:id', (req, res) => {
  models.Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.redirect('/student');
  })
})

router.get('/edit/:id', (req, res) => {
  models.Student.findById(req.params.id)
  .then((rows) => {
    res.render('editStudent',{
      data:rows, errmsg: ''
    })
  })
})

router.post('/edit/:id', (req, res) => {
   models.Student.findOne({
     where:{
      email: req.body.email
     }
   })
.then((result) => {
  if(!result || req.body.email === req.body.emailOri){
    models.Student.update({
      name: req.body.name,
      gender: req.body.gender,
      address: req.body.address,
      email: req.body.email,
    },{
      where:{
        id:req.params.id
      }
    })
    .then(() => {
      res.redirect('/student');
    })
    .catch((err) => {
      models.Student.findById(req.params.id)
      .then((rows) => {
        res.render('editStudent',{
          data:rows, errmsg: err
        })
      })
    })
  } else {
    res.send('email sudah ada')
  }
 })
})

router.get('/edit/:id/addcourse', (req, res) => {
  models.Student.findById(req.params.id)
  .then((rows) => {
    models.Course.findAll()
    .then((dataCourse) => {
      console.log(rows);
      res.render('addCourseStudent', {
        data:rows, data2: dataCourse
      })
    })
  })
})


router.post('/edit/:id/addcourse', (req, res) => {
  models.StudentCourse.create({
    StudentId: parseInt(req.params.id),
    CourseId: req.body.CourseId
  })
  .then(() =>{
    res.redirect('/student')
  })
})

router.get('/:id/detailStudent', (req, res) => {
  models.StudentCourse.findAll({
    where: {
      StudentId: req.params.id
    },
    include: [{all:true}]
  })
  .then(data => {
    console.log(data);
    // res.send(data);
    res.render('studentCourse', {
      dataStudent: data
    });
  })
})



module.exports = router
