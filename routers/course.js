const express = require('express')
const router = express.Router()

const models = require('../models')

router.get('/', (req, res)=>{
  models.Course.findAll()
  .then((dataCourse)=> {
    res.render('course', {dtCourse:dataCourse})
  })
})


router.get('/add', (req, res) => {
  res.render('addCourse')
})


router.post('/', (req, res) => {
  models.Course.create({
    course_name: req.body.course_name
  })
  .then(() => {
    res.redirect('/course')
  })
  .catch(err => {
    console.log(err);
  })
})
//
// router.get('/edit/:id', (req, res) => {
//   models.Course.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(data => {
//     res.render('editCourse', {
//       data: data}
//     )
//   })
//   .catch(() => {
//     console.log(err);
//   })
//  })
//
// router.post('/edit/:id', (req, res) => {
//   models.Course.update({
//     course_name: req.body.course_name
//   }, {
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(() => {
//     res.redirect('/course')
//   })
//   .catch( err => {
//     console.log(err);
//   })
// })
//
// router.get('/delete/:id', (req, res) => {
//   models.Course.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(data => {
//     models.StudentCourse.destroy({
//       where: {
//         CourseId: req.params.id
//       }
//     })
//       .then(gg => {
//         res.redirect('/course')
//       })
//     })
//   })
// })

// router.get('/:id/detailCourse', (req, res) => {
//   models.StudentCourse.findAll({
//     where: {
//       CourseId: req.params.id
//     },
//     include: [{all:true}],
//     order: [['Student', 'name', 'ASC']]
//   })
//   .then(data => {
//     console.log(JSON.stringify(data,null,2));
//     res.render('courseStudents', {
//       dataCourse: data
//     });
//   })
// })
router.get('/:id/detailCourse', (req, res) => {
  models.StudentCourse.findAll({
    where: {
      CourseId: req.params.id
    },
    include: [{all:true}]
  })
  .then(data => {
    console.log(data);
    // res.send(data);
    res.render('courseStudents', {
      dataCourse: data
    });
  })
  // .catch(err => {
  //   res.render('courseStudents', {errmsg: 'Data Masih Kosong'})
  // })
})




module.exports = router
