const express = require('express');

const app = express();
const port = 5000;
const cors = require('cors') // so we can run on localhost at different ports and circumvent the browser cors policy

app.use(cors());
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Hello, World!')
})

const { Student, Campus } = require('./models')

/**
 * STUDENTS ROUTES
 */
// write a route to serve up all students
app.get('/students', (req, res)=>{
    Student.findAll().then(users => res.json(users));
})
// write a route to serve up a single student (based on their id) including that student's campus
app.get('/students/:studentID', async (req, res) => {
    let student = await Student.findOne({where: { studentID: req.params.studentID }})
    student.dataValues.campus = await Campus.findOne({where: {campusID: student.campusCampusID}})
    console.log(student)
    res.json(student.toJSON())
})
// write a route to add a student
app.post('/students', async (req, res)=>{
    try {
        let student = await Student.create(
            {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, gpa: req.body.gpa, campusCampusID: req.body.campusID}
        )
        res.json({status: true, message: "New student created", data: student.toJSON()})
    } catch(err) {
        console.log("error", err)
        res.json({status: false, message: err})
    }
})
// edit specific student
app.post('/students/:id', async (req, res) => {
    let student = await Student.findOne({ where: {studentID: req.params.id} });
    console.log(student)
    let keys = Object.keys(req.body)
    keys.forEach(k=>{
        console.log(`student[${k}] = ${req.body[k]}`)
        student[k] = req.body[k]
        if (k === "campusCampusID") {
            student[k] = parseInt(req.body[k])
        }
    })
    console.log(keys)
    student.save()
    res.json(await student.toJSON())
})
// write a route to remove a student
app.delete('/students/:studentID', (req, res)=>{
    Student.destroy({where: {studentID: req.body.studentID}})
        .then(deleted=>{
            console.log({studentID: req.body.studentID})
            res.json({status: true, message: "Student deleted", data: {studentID: req.body.studentID}})
        })
})
/**
 * CAMPUS ROUTES
 */
// write a route to serve up all campuses
app.get('/campuses', (req, res)=>{
    Campus.findAll().then(campuses => res.json(campuses))
})
// write a route to serve up a single campus (based on its id) including that campuses's students
app.get('/campuses/:campusID', async (req, res) => {
    let campus = await Campus.findOne({where: { campusID: req.params.campusID }})
    let students = await Student.findAll({where: { campusCampusID: campus.campusID }})
    campus.dataValues.students = students
    res.json(campus)

})
// write a route to add a campus
app.post('/campuses', async (req, res)=>{
    let campus = await Campus.create(
        {
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
        }
    )
    res.json({status: true, message: "New student created", data: campus.toJSON()})
})
// edit specific campus
app.post('/campuses/:id', async (req, res) => {
    let campus = await Campus.findOne({ where: {campusID: req.params.id} });
    let keys = Object.keys(req.body)
    keys.forEach(k=>{
        campus[k] = req.body[k]
    })
    console.log("keys", keys)
    await campus.save()
    res.json(await Campus.findOne({ where: { campusID: req.params.id } }))
})
// write a route to remove a campus
app.delete('/campuses/:campusID', (req, res) => {
    Campus.destroy({where: {campusID: req.body.campusID}})
        .then(deleted=>{
            console.log({studentID: req.body.studentID})
            res.json({status: true, message: "Campus deleted", data: {campusID: req.body.campusID}})
        })
})

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})