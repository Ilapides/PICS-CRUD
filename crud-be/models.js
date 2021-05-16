const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize("postgres://postgres:postgres@localhost/final", {dialect: 'postgres'});
// const queryInterface = sequelize.getQueryInterface();

sequelize
    .authenticate()
    .then(()=>{
        console.log('Connection established');
    })
    .catch(err=>{
        console.error('Problem! ', err);
    })

/*
- [ ] Write a `campuses` model with the following information:
  - [ ] name - not empty or null
  - [ ] imageUrl - with a default value
  - [ ] address - not empty or null
  - [ ] description - extremely large text
*/

const Campus = sequelize.define('campus', {
    campusID: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, validate: {
      notEmpty: true,
      notNull: true
    } },
    imageUrl: { type: DataTypes.STRING, defaultValue: "/logo.png" },
    address: { type: DataTypes.STRING, allowNull: false, validate: {
      notEmpty: true,
      notNull: true
    } },
    description: {type: DataTypes.TEXT },
});

/*
- [ ] Write a `students` model with the following information:
  - [ ] firstName - not empty or null
  - [ ] lastName - not empty or null
  - [ ] email - not empty or null; must be a valid email
  - [ ] imageUrl - with a default value
  - [ ] gpa - decimal between 0.0 and 4.0
*/

const Student = sequelize.define('student', {
    studentID: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, allowNull: false, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false, validate: {
      notEmpty: true,
      notNull: true
    } },
    lastName: { type: DataTypes.STRING, allowNull: false, validate: {
      notEmpty: true,
      notNull: true
    } },
    email: { type: DataTypes.STRING, allowNull: false, validate: {
      notEmpty: true,
      notNull: true,
      isEmail: true
    }}, // must be a valid email -- could this be checked here?
    imageUrl: { type: DataTypes.STRING, defaultValue: "/logo.png"},
    gpa: { type: DataTypes.DECIMAL, validate: {min: 0.0, max: 4.0}  },
})

/*
 - Students may be associated with at most one campus. Likewise, campuses may be associated with many students
*/
Student.belongsTo(Campus, {constraints: false});
Campus.hasMany(Student, {constraints: false})


sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })
  .then(() => {
      // make dummy data
      Campus.create({name: "Fake State University", address: "123 Fake Street, Fake City, 40404, FS", description: "Per herbam ad astra"})
        .then(()=>{
            Student.create({firstName: "Bond", lastName: "James", email: "bond@jim.co", gpa: 3.1, campusCampusID: 1})
            Student.create({
                firstName: "Max",
                lastName: "Power",
                email: "MP@aol.com",
                gpa: 2.75,
                campusCampusID: 1,
            })
        })
      Campus.create({name: "Hogwarts School of Wizardry", address: "456 Magic Lane, Hogwarts, Land of Wizardry", description: "I actually don't really know anything about the Harry Potter series"})
        .then(()=>{

          Student.create({
            firstName: "Harry",
            lastName: "Potter",
            email: "hpotter@hogwarts.edu",
            gpa: 2.75,
            campusCampusID: 2,
          })
        })
    })



module.exports = {
    Student,
    Campus
}

