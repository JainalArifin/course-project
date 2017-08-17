'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentCourse = sequelize.define('StudentCourse', {
    StudentId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER
  });
  StudentCourse.accociate = (models) => {
    StudentCourse.belongsTo(models.Student);
    StudentCourse.belongsTo(models.Course)
  }
  return StudentCourse;
};
