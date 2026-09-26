import { useState,useEffect } from "react";
import axios from "axios";

function CourseEnrollmentForm()
{
    const[courseEnrollment,setCourseEnrollment]=useState({
        "course_id":"",
       "student_name":"",
       "email":"",
       "enrollment_date":"",
       "status":""
    })

    const[courseEnrollments,setCourseEnrollments]=useState([]);
    const[editId,setEditId]=useState(null);
    const[errors,setErrors]=useState({});

    const[courses,setCourses]=useState([]);

    const URL="http://127.0.0.1:8000/api/course-enrollment";
    const COURSE_URL="http://127.0.0.1:8000/api/course";

    const handleChange=(e)=>{
        setCourseEnrollment({
            ...courseEnrollment,
            [e.target.name]:e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name]:null
        })
    }

    const getAllCourses=async()=>{
        const response=await axios.get(COURSE_URL);
        setCourses(response.data);
    }

    const getAllCourseEnrollments=async()=>{
        const response=await axios.get(URL);
        setCourseEnrollments(response.data);
    }

    useEffect(()=>{
        getAllCourseEnrollments();
        getAllCourses();
    },[]);

    const getSingleCourseEnrollment=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setCourseEnrollment(response.data);
        setEditId(id);
    }

    const addCourseEnrollment=async()=>{
        await axios.post(URL,courseEnrollment);
        alert("Course Enrollment added");
    }

    const updateCourseEnrollment=async()=>{
        await axios.put(`${URL}/${editId}`, courseEnrollment);
        alert("Course Enrollment Updated");
    }

    const deleteCourseEnrollment=async(id)=>{
        const confirmDelete=window.confirm("Delete Course Enrollment?");
        if(!confirmDelete)
        {
            return;
        }

        else{
            await axios.delete(`${URL}/${id}`);
            alert("Course Enrollment Deleted");
            getAllCourseEnrollments();
        }
    }

    const clearForm=()=>{
        setCourseEnrollment({
        "course_id":"",
       "student_name":"",
       "email":"",
       "enrollment_date":"",
       "status":""
        })

        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};

        if(!courseEnrollment.course_id){
            newErrors.course_id=["course_id is required"];
        }

         if(!courseEnrollment.student_name){
            newErrors.student_name=["student_name is required"];
        }

         if(!courseEnrollment.email){
            newErrors.email=["email is required"];
        }

         if(!courseEnrollment.enrollment_date){
            newErrors.enrollment_date=["enrollment_date is required"];
        }

         if(!courseEnrollment.status){
            newErrors.status=["status is required"];
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
                await addCourseEnrollment();
            }
            else{
                await updateCourseEnrollment();
                setEditId(null);
            }
            await getAllCourseEnrollments();
            clearForm();
        }
        catch(error){
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
        <div style={{width:"1000px", margin:"30px auto"}}>
            <form onSubmit={handleSubmit}>
                <h1>Course Enrollment Form</h1>
                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Course Name:</label>
                    <select name="course_id" value={courseEnrollment.course_id} onChange={handleChange}>
                        <option value="">Select Course</option>
                        {courses.map((item)=>{
                            return(
                                <option key={item.course_id} value={item.course_id}>{item.course_name}</option>
                            )
                        })}
                    </select>
                    <span style={{color:"red"}}>{errors.course_id?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Student Name:</label>
                    <input type="text" value={courseEnrollment.student_name} name="student_name" onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.student_name?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Email:</label>
                    <input type="text" value={courseEnrollment.email} name="email" onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.email?.[0]}</span>
                </p>


                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Enrollment Date:</label>
                    <input type="date" value={courseEnrollment.enrollment_date} name="enrollment_date" onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.enrollment_date?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Status:</label>
                   <select name="status" value={courseEnrollment.status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                   </select>
                    <span style={{color:"red"}}>{errors.status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>

                <table border="1" cellPadding="5">
                    <thead>
                        <tr>
                            <th>Enrollment ID</th>
                            <th>Course Id</th>
                            <th>Course Name</th>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Enrollment Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>
                        {courseEnrollments.map((item)=>{
                            return(
                                <tr key={item.enrollment_id}>
                                    <td>{item.enrollment_id}</td>
                                    <td>{item.course_id}</td>

                                    <td>{item.course?item.course.course_name:""}</td>

                                    <td>{item.student_name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.enrollment_date}</td>
                                    <td>{item.status}</td>

                                    <td>
                                        <button type="button" onClick={()=>getSingleCourseEnrollment(item.enrollment_id)}>Edit</button>
                                        &nbsp;
                                        <button type="button" onClick={()=>deleteCourseEnrollment(item.enrollment_id)}>Delete</button>
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

export default CourseEnrollmentForm;