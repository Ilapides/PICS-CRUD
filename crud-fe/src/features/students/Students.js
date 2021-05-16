import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { selectStudents, fetchStudents, addNewStudent, deleteStudent, editStudent } from './studentsSlice';
import { fetchCampuses, selectCampuses } from '../schools/schoolsSlice';

export function EditStudentForm(student) {
    const dispatch = useDispatch();
    const campusSelector = useSelector(selectCampuses);
    useEffect(()=>{
        dispatch(fetchCampuses())
        console.log(campusSelector.campuses)
        setFormData({
            ...formData,
            campusCampusID: campusSelector.campuses[0].campusID
        })
    }, [dispatch])
    const [formData, setFormData] = useState({
        firstName: student.student.firstName,
        lastName: student.student.lastName,
        campusCampusID: campusSelector.campuses[0] !== undefined ? parseInt(campusSelector.campuses[0].campusID) : null // student.student.campusCampusID,
    }, [student])
    const [open, setOpen] = useState(false)
    const campusOptions = campusSelector.campuses.map(c=><option value={c.campusID}>{c.name}</option>)
    const handleChange = (e)=>{
        const { name, value } = e.target;
        console.log(value);
        setFormData(state=>({
            ...state,
            [name]: value
        }));
    }
    const postEditStudent = async ()=>{
        const unfilled = []
        if (formData.firstName === '') unfilled.push('first name')
        if (formData.lastName === '') unfilled.push('last name')
        if (unfilled.length > 0) {
            alert(`Please fill out the following: ${unfilled.join(', ')}`)
            return
        }
        let { studentID } = student.student; 
        const resultAction = await dispatch(editStudent({studentID, ...formData}))
        unwrapResult(resultAction);
    }
    console.log("student", student)
    return (
        <>
        <button className="button button ma-h_xl ma-b" onClick={()=>setOpen(!open)}>{!open ? "Open " : "Close "} Edit Student Form</button>
        {open && <div id="editStudentForm" className="flex column ma-h_xl">
            <label htmlFor="firstName">First Name {formData.firstName === '' ? <span style={{color: "red"}}>(Invalid)</span> : null}</label><input className="input" name="firstName" onChange={handleChange} value={formData.firstName} placeholder={student.student.firstName}></input>
            <label htmlFor="lastName">Last Name {formData.lastName === '' ? <span style={{color: "red"}}>(Invalid)</span> : null}</label><input className="input" name="lastName" onChange={handleChange} value={formData.lastName} placeholder={student.student.lastName}></input>
            <label htmlFor="lastName">Email</label><input className="input" name="email" onChange={handleChange} value={formData.email} placeholder={student.student.email}></input>
            <label htmlFor="campusCampusID">Campus</label><select className="select" name="campusCampusID" placeholder={student.student.campusCampusID} onChange={handleChange}>{campusOptions}</select>
            <button className="button ra-pill" onClick={postEditStudent}>Edit Student</button>
        </div>}
        </>
    )
}

export function CreateStudentForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gpa: 0.0,
        campusID: null
    })
    const [open, setOpen] = useState(false)
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData(state=>({
            ...state,
            [name]: value
        }));
    }
    const validEmail = (email)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // regular expression to validateEmail
    const postStudent = async ()=>{
        // make sure email is correctly formatted
        // make sure first name, last name, and valid email are present
        if (formData.firstName !== '' & formData.lastName !== '' && formData.email !== '' && validEmail(formData.email)) {
            const resultAction = await dispatch(addNewStudent(formData))
            console.log(resultAction)
            unwrapResult(resultAction);
            if (resultAction.payload !== undefined) {
                history.push(`/students/${resultAction.payload.studentID}`)
            }
        } else if (!validEmail(formData.email)) {
            alert("Email address is invalid!")
        } else {
            const unfilled = []
            if (formData.firstName === '') unfilled.push('First Name')
            if (formData.lastName === '') unfilled.push('Last Name')
            if (formData.email === '') unfilled.push('Email')
            alert(`Please fill out the following: ${unfilled.join(', ')}`)
        }
    }
    return (
        <>
        <button className="button ma-b_s" onClick={()=>setOpen(!open)}>{!open ? "Open " : "Close "} New Student Form</button>
        {open && <div id="addStudentForm" className="flex column">
            <label htmlFor="firstName">First Name {formData.firstName === '' ? <span style={{color: "red"}}>(Invalid)</span> : null}</label><input className="input" name="firstName" onChange={handleChange}></input>
            <label htmlFor="lastName">Last Name {formData.lastName === '' ? <span style={{color: "red"}}>(Invalid)</span> : null}</label><input className="input" name="lastName" onChange={handleChange}></input>
            <label htmlFor="email">Email {formData.email === '' || !validEmail(formData.email) ? <span style={{color: "red"}}>(Invalid)</span> : null}</label><input className="input" name="email" onChange={handleChange}></input>
            <label htmlFor="gpa">GPA</label><input className="input" name="gpa" type="decimal" onChange={handleChange}></input>
            <button className="button ra-pill" onClick={postStudent}>Create Student</button>
        </div>}
        </>
    )
}

export function Student() {
    const {id} = useParams();
    console.log(id)
    const students = useSelector(selectStudents);
    const campuses = useSelector(selectCampuses);
    const dispatch = useDispatch();
    useEffect(async ()=>{
        await dispatch(fetchStudents())
        await dispatch(fetchCampuses())
    }, [dispatch])
    console.log("Students.students", students.students)
    const student = students.students.find(s=>s.studentID===parseInt(id))
    const deleteStudentCall = async (student)=>{
        console.log("Got this far")
        const resultAction = await dispatch(deleteStudent({studentID: student.studentID})); 
        console.log("After await")
        console.log("Result action", resultAction);
        unwrapResult(resultAction);
    }
    if (student === undefined) {
        return (<p>Student not found!</p>)
    }
    console.log("campus find", student.campusCampusID);
    console.log("campus find", campuses.campuses)
    let campus = campuses.campuses.find(c=>c.campusID===student.campusCampusID);
    // if (campus === undefined) {return <p>Loading</p>} 
    if (campus === undefined) {
        campus = {name: "No university"}
    }
    const studentProfile = (
        
        <>
                {(students.status !== "loading" && students.status !== undefined && students !== undefined && campus !== undefined) &&
                
                <div className="flex column bo_px ra_s bs_xs ma-h_xl ma-v_m">
                    <div className="text-center ma-b_m">
                        <img src={student.imageUrl} alt="Portrait" className="ra-circle bo_xs size_xl"/>
                        <h3 className="text-clip">{`${student.firstName} ${student.lastName}`}</h3>
                        <p className="ma-t_xs">{`${student.email}`}</p>
                        <p className="ma-t_xs"><Link to={`/campuses/${student.campusCampusID}`}>{campus.name}</Link></p>
                        <p className="ma-t_s ma-b_s">GPA: {student.gpa}</p>
                        <button className="button ra-pill" onClick={()=>{deleteStudentCall(student)}}>Delete Student</button>
                    </div>
                </div>
                }
            <EditStudentForm student={student} />
        </>
    )
    return studentProfile;
}



export function Students() {
    const students = useSelector(selectStudents);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchStudents())
    }, [dispatch])
    const deleteStudentCall = async (student)=>{
        console.log("Got this far")
        const resultAction = await dispatch(deleteStudent({studentID: student.studentID})); 
        console.log("After await")
        console.log("Result action", resultAction);
        unwrapResult(resultAction);
        
    }
    const students_ = students.students.map(student=>{
        return (<>{(students.status !== "loading" && students.status !== undefined && student !== undefined) &&
        <div key={student.studentID} className="flex bo-b_xs items-center">
            <p style={{flex: 2}}><Link to={`/students/${student.studentID}`}>{`${student.firstName} ${student.lastName}`}</Link></p>
            <button className="button ra-pill ma-v_s" style={{flexGrow: 0}} onClick={()=>{deleteStudentCall(student)}}>Delete</button></div>
        }</>)
    })
    if (students_.length === 0) {
        return (<div>
            <CreateStudentForm/>
            <p>No students to show!</p>
        </div>)
    }
    return(
        <div className="flex column ma-h_xl ma-t_m">
            <h3>All Students</h3>
            <CreateStudentForm />
            {(students.status !== "loading" && students.status !== undefined && students !== undefined) &&
            students_
            }
        </div>
    )
}