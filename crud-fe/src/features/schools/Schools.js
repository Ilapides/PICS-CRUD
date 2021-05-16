import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom'
import { selectCampuses, fetchCampuses, addNewCampus, deleteCampus, editCampus } from './schoolsSlice';
import {deleteStudent, selectStudents, editStudent, fetchStudents} from '../students/studentsSlice'

export function EditCampusForm(campus) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: campus.campus.name,
        address: campus.campus.address,
        description: campus.campus.description,
    })
    const [open, setOpen] = useState(false)
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData(state=>({
            ...state,
            [name]: value
        }));
    }
    const postEditCampus = async ()=>{
        const unfilled = []
        if (formData.name === '') unfilled.push('name')
        if (unfilled.length > 0) {
            alert(`Please fill out the following: ${unfilled.join(', ')}`)
            return
        }
        let { campusID } = campus.campus; 
        const resultAction = await dispatch(editCampus({campusID, ...formData}))
        unwrapResult(resultAction);
    }
    console.log("campus", campus)
    return (
        <div className="container ma-b_m">
        <button className="button ma-h_xl ma-b" onClick={()=>setOpen(!open)}>{!open ? "Open " : "Close "} Edit Campus Form</button>
        {open && <div id="editCampusForm" className="ma-h_xl ma-b_l flex column">
            <label htmlFor="name">Name {formData.name === '' ? <span style={{color: "red"}}>(Invalid)</span> : null}</label><input className="input" name="name" onChange={handleChange} value={formData.name} placeholder={campus.campus.name}></input>
            <label htmlFor="address">Address {formData.address === '' ? <span style={{color: "red"}}>(Invalid)</span> : null}</label><input className="input" name="address" onChange={handleChange} value={formData.address} placeholder={campus.campus.address}></input>
            <label htmlFor="description">Description {formData.description === '' ? <span style={{color: "red"}}>(Invalid)</span> : null}</label><input className="input"name="description" onChange={handleChange} value={formData.description} placeholder={campus.campus.description}></input>
            <button onClick={postEditCampus} className="button ra-pill">Edit Campus</button>
        </div>}
        </div>
    )
}

export function CreateCampusForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        description: '',
    })
    const [open, setOpen] = useState(false)
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData(state=>({
            ...state,
            [name]: value
        }));
    }
    const postCampus = async ()=>{
        // make sure first name, last name, and valid email are present
        if (formData.name !== '' & formData.address !== '') {
            const resultAction = await dispatch(addNewCampus(formData))
            unwrapResult(resultAction);
            history.push(`/campuses/${resultAction.payload.campusID}`)
        } else {
            const unfilled = []
            if (formData.name === '') unfilled.push('name')
            if (formData.address === '') unfilled.push('address')
            alert(`Please fill out the following: ${unfilled.join(', ')}`)
        }
    }
    return (
        <>
        <button className="button ma-b_s" onClick={()=>setOpen(!open)}>{!open ? "Open " : "Close "} New Campus Form</button>
        {open && <div id="addCampusForm" className="flex column">
            <label htmlFor="name">Name {formData.name === '' ? <span style={{color: "red"}}>(Invalid)</span> : null}</label><input className="input" name="name" onChange={handleChange}></input>
            <label htmlFor="address">Address {formData.address === '' ? <span style={{color: "red"}}>(Invalid)</span> : null}</label><input className="input" name="address" onChange={handleChange}></input>
            <label htmlFor="description">Description</label><input className="input" name="description" onChange={handleChange}></input>
            <button className="button ra-pill" onClick={postCampus}>Create Campus</button>
        </div>}
        </>
    )
}

function AddStudent(students, campus) {
    let [studentID, updateStudentID] = useState(0)
    
    let studentsSelect = useSelector(selectStudents);
    let dispatch = useDispatch();
    const addStudentCall = async (studentID)=>{
        // really this is just an edit student call we only change the campusCampusID
        let data = {studentID: studentID, campusCampusID: campus.campusID}
        const resultAction = await dispatch(editStudent(data)); 
        console.log("Result action for addStudentCall", resultAction);
        unwrapResult(resultAction);
    }
    console.log("addstudent students", students)
    let studentsOptions = students.students.map(student=>(
        <option value={student.studentID}>{student.firstName} {student.lastName}</option>
    ))
    let handleChange = (e)=>{
        updateStudentID(e.target.value)
    }
    return(
        <>
        <select onChange={handleChange}>
            {studentsOptions}
        </select>
        <button onClick={()=>{addStudentCall(studentID)}}>Add</button>
        </>
    )
}

export function Campus() {
    const {id} = useParams();
    console.log(id)
    const schools = useSelector(selectCampuses);
    const studentsSel = useSelector(selectStudents);
    console.log("studentsSel", studentsSel)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchCampuses())
        dispatch(fetchStudents())
    }, [dispatch])
    console.log("schools.campuses", schools.campuses)
    const campus = schools.campuses.find(c=>c.campusID===parseInt(id))
    console.log("campus?", campus)
    console.log(schools.status);
    const [students, updateStudents] = useState([])
    useEffect(async ()=>{
        let students = await fetch('http://localhost:5000/students').then(r=>r.json())
        updateStudents(state=>[...students.filter(s=>s.campusCampusID === parseInt(id))])
    }, [])
    const deleteCampusCall = async (campus)=>{
        console.log("Got this far")
        const resultAction = await dispatch(deleteCampus({campusID: campus.campusID})); 
        console.log("After await")
        console.log("Result action", resultAction);
        unwrapResult(resultAction);
    }
    console.log(students)

    const addStudentCall = async(student) => {
        // really just edit student to have a different ID
        const resultAction = await dispatch(editStudent({studentID: student.studentID, campusCampusID: id})); 
        let i = students.findIndex(s=>s.studentID===student.studentID)
        updateStudents(()=>[...students.splice(i, 1)])
        unwrapResult(resultAction);
    }
    const students_ = studentsSel.students.map(student=>{
        return <option value={student.studentID}>{student.firstName} {student.lastName}</option>
    })
    const [studentID, updateStudentID] = useState(studentsSel.students[0] !== undefined ? studentsSel.students[0].studentID : null)
    const handleChange = (e)=>{
        updateStudentID(e.target.value)
    }

    const deleteStudentCall = async (student)=>{
        const resultAction = await dispatch(editStudent({studentID: student.studentID, campusCampusID: 0})); 
        let i = students.findIndex(s=>s.studentID===student.studentID)
        updateStudents(()=>[...students.splice(i, 1)])
        unwrapResult(resultAction);
    }
    let studentsList = studentsSel.students.filter(s=>s.campusCampusID === parseInt(id)).map(student=>(
        <div className="flex column ma-v_s box">
            <p><Link to={`/students/${student.studentID}`}>{student.firstName} {student.lastName}</Link></p>
            <p>{student.email}</p>
            <p>GPA: {student.gpa}</p>
            <button className="button ra-pill ma-t_s" onClick={()=>{deleteStudentCall(student)}}>Remove Student</button>
        </div>
    ))
    if (studentsList.length === 0) studentsList = <p>No students!</p>
    if (campus === undefined) {
        return <p>Campus not found!</p>
    }
    const campusProfile = (
        <>
            <div className="flex column bo_px ra_s bs_xs ma-h_xl ma-v_m">
                    <div className="text-center ma-b_m">
                        <img src={`${campus.imageUrl}`} alt="Portrait" className="ra-circle bo_xs size_xl"/>
                        <h3 className="text-clip">{`${campus.name}`}</h3>
                        <p>{campus.address}</p>
                        <p className="ma-t_xs">{`${campus.description}`}</p>
                        <button className="button ra-pill ma-t_m" onClick={()=>{deleteCampusCall(campus)}}>Delete Campus</button>
                    </div>
            </div>
            <EditCampusForm campus={campus}/>
            <div className="ma-h_xl flex">
                <h3>Add Student</h3>
                <select className="select inline-flex" name="studentID" onChange={handleChange}>
                    {students_}
                </select>
                <button className="button ra-pill" onClick={()=>addStudentCall({studentID: parseInt(studentID)})}>Add Student</button>
            </div>
            <div className="ma-h_xl ma-v_l">
                <h3>Students</h3>
                {studentsList}
            </div>
        </>
    )
    return campusProfile;
}

export function Schools () {
    const schools = useSelector(selectCampuses);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchCampuses())
    }, [dispatch])
    const deleteCampusCall = async (campus)=>{
        console.log("Got this far")
        const resultAction = await dispatch(deleteCampus({campusID: campus.campusID})); 
        console.log("After await")
        console.log("Result action", resultAction);
        unwrapResult(resultAction);
    }
    const campuses = schools.campuses.map(campus=>(
            <div key={campus.campusID} className="flex bo-b_xs items-center">
                <img src={campus.imageUrl} width="100px"></img>
                <p className="ma-h_l" style={{flex: 2}}><Link to={`/campuses/${campus.campusID}`}>{campus.name}</Link></p>
                <button className="button ra-pill" style={{flexGrow: 0}}onClick={()=>{deleteCampusCall(campus)}}>Delete</button>
            </div>
    ))
    if (campuses.length === 0) {
        return (<div>
            <CreateCampusForm/>
            <p>No campuses to show!</p>
        </div>)
    }
    return(
        <div className="flex column ma-h_xl ma-t_m">
            <h3>All Campuses</h3>
            <CreateCampusForm/>
            {campuses}
        </div>
    )
}