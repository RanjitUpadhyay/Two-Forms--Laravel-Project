import { useState,useEffect } from "react";
import axios from "axios";

function TeacherSubjectForm()
{
    const[teacherSubject,setTeacherSubject]=useState({
        "teacher_id":"",
       "subject_name":"",
       "subject_code":"",
       "class_name":"",
       "academic_year":""
    })

    const[teacherSubjects,setTeacherSubjects]=useState([]);
    const[teachers,setTeachers]=useState([]);
    const[editId,setEditId]=useState(null);
    const[errors,setErrors]=useState({});

    const TURL="http://127.0.0.1:8000/api/teacher";
    const URL="http://127.0.0.1:8000/api/teacher-subject";

    const handleChange=(e)=>{
        setTeacherSubject({
            ...teacherSubject,
            [e.target.name]:e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name]:null
        })
    }

    const getAllTeachers=async()=>{
        const response=await axios.get(TURL);
        setTeachers(response.data);
    }

    const getAllTeacherSubjects=async()=>{
        const response=await axios.get(URL);
        setTeacherSubjects(response.data);
    }

    useEffect(()=>{
        getAllTeacherSubjects();
        getAllTeachers();
    },[]);

    const getSingleTeacherSubject=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setTeacherSubject(response.data);
        setEditId(id);
    }

    const addTeacherSubject=async()=>{
        await axios.post(URL,teacherSubject);
        alert("Subject Teacher Added");
    }

    const updateTeacherSubject=async()=>{
        await axios.put(`${URL}/${editId}`,teacherSubject);
        alert("Subject Teacher Updated");
    }

    const deleteTeacherSubject=async(id)=>{
        const confirmDelete=window.confirm("Delete Subject Teacher?");

        if(!confirmDelete)
        {
            return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            alert("Subject Teacher Deleted");
            getAllTeacherSubjects();
        }
    }

    const clearForm=()=>{
        setTeacherSubject({
        "teacher_id":"",
       "subject_name":"",
       "subject_code":"",
       "class_name":"",
       "academic_year":""
        })
        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};

        if(!teacherSubject.teacher_id)
        {
            newErrors.teacher_id=["teacher_id is required"];
        }

        if(!teacherSubject.subject_name)
        {
            newErrors.subject_name=["subject_name is required"];
        }

        if(!teacherSubject.subject_code)
        {
            newErrors.subject_code=["subject_code is required"];
        }

        if(!teacherSubject.class_name)
        {
            newErrors.class_name=["class_name is required"];
        }

        if(!teacherSubject.academic_year)
        {
            newErrors.academic_year=["academic_year is required"];
        }

       setErrors(newErrors);
       return Object.keys(newErrors).length===0;
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!validateForm())
        {
            return;
        }

        try{
            if(editId===null)
            {
                await addTeacherSubject();
            }
            else{
                await updateTeacherSubject();
                setEditId(null);
            }
            await getAllTeacherSubjects();
            clearForm();
        }
        catch(error)
        {
            if(error.response && error.response.status===422)
            {
                setErrors(error.response.data.errors);
            }
            else{
                alert("Something Went Wrong");
            }
        }
    }

    return(
        <div style={{width:"1000px", margin:"50px auto"}}>

            <form onSubmit={handleSubmit}>
                <h1>Subject Teacher Form</h1>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Select Teacher</label>
                    <select name="teacher_id"  value={teacherSubject.teacher_id} onChange={handleChange}>
                        <option value="">Select Teacher</option>
                        {teachers.map((item)=>{
                            return(
                                <option  key={item.teacher_id} value={item.teacher_id}>{item.teacher_name}</option>
                            )
                        })}
                    </select>
                    <span style={{color:"red"}}>{errors.teacher_id?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Subject Name:</label>
                    <input type="text" name="subject_name" value={teacherSubject.subject_name} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.subject_name?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Subject Code:</label>
                    <input type="text" name="subject_code" value={teacherSubject.subject_code} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.subject_code?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Class Name:</label>
                    <input type="text" name="class_name" value={teacherSubject.class_name} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.class_name?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Academic Year:</label>
                    <input type="date" name="academic_year" value={teacherSubject.academic_year} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.academic_year?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>

                <table border="1" cellPadding="5">
                    <thead>
                        <tr>
                            <th>Subject Teacher ID</th>
                            <th>Teacher ID</th>
                            <th>Teacher Name</th>
                            <th>Subject Name</th>
                            <th>Subject Code</th>
                            <th>Class Name</th>
                            <th>Academic Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {teacherSubjects.map((item)=>{
                            return( <tr key={item.subject_id}>
                                <td>{item.subject_id}</td>
                                <td>{item.teacher_id}</td>
                                <td>{item.teacher?item.teacher.teacher_name:""}</td>
                                <td>{item.subject_name}</td>
                                <td>{item.subject_code}</td>
                                <td>{item.class_name}</td>
                                <td>{item.academic_year}</td>

                                <td>
                                    <button type="button" onClick={()=>getSingleTeacherSubject(item.subject_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteTeacherSubject(item.subject_id)}>Delete</button>
                                </td>


                            </tr>
                            )
                        })}
                    </tbody>

                </table>
            </form>

        </div>
    )
}

export default TeacherSubjectForm;