'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentCourse = sequelize.define('StudentCourse', {
    StudentId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return StudentCourse;
};