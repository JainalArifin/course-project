'use strict';
module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define('Course', {
    course_name: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Course;
};