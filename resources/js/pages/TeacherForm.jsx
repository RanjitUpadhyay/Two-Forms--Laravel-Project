import { useState,useEffect } from "react";
import axios from "axios";

function TeacherForm()
{
    const[teacher,setTeacher]=useState({
        "teacher_name":"",
        "email":"",
        "phone":"",
        "gender":"",
        "department":"",
        "status":""
    })

    const[teachers,setTeachers]=useState([]);
    const[editId,setEditId]=useState(null);
    const[errors,setErrors]=useState({});
    const[view,setView]=useState(null);

    const URL="http://127.0.0.1:8000/api/teacher";

    const handleChange=(e)=>{
        setTeacher({
            ...teacher,
            [e.target.name]:e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name]:null
        })
    }

    const viewTeacher=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setView(response.data)
    }

    const getAllTeachers=async()=>{
        const response=await axios.get(URL);
        setTeachers(response.data);
    }

    useEffect(()=>{
        getAllTeachers();
    },[])

    const getSingleTeacher=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setTeacher(response.data);
        setEditId(id);
    }

    const addTeacher=async()=>{
        await axios.post(URL,teacher);
        alert("Teacher Added");
    }

    const updateTeacher=async()=>{
        await axios.put(`${URL}/${editId}`,teacher);
        alert("Teacher Updated");
    }

    const deleteTeacher=async(id)=>{
        const confirmDelete=window.confirm("Delete Teacher?");
        if(!confirmDelete)
        {
            return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            getAllTeachers();
        }
    }

    const clearForm=()=>{
        setTeacher({
        "teacher_name":"",
        "email":"",
        "phone":"",
        "gender":"",
        "department":"",
        "status":""
        })
        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};

        if(!teacher.teacher_name)
        {
            newErrors.teacher_name=["teacher_name is required"]
        }

        if(!teacher.email)
        {
            newErrors.email=["email is required"]
        }

        if(!teacher.phone)
        {
            newErrors.phone=["phone is required"]
        }

        if(!teacher.gender)
        {
            newErrors.gender=["gender is required"]
        }

        if(!teacher.department)
        {
            newErrors.department=["department is required"]
        }

        if(!teacher.status)
        {
            newErrors.status=["status is required"]
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
                await addTeacher();
            }
            else{
                await updateTeacher();
                setEditId(null);
            }
            await getAllTeachers();
            clearForm();
        }
        catch(error)
        {
            if(error.response && error.response.status===422)
            {
                setErrors(error.response.data.errors);
            }
            else{
                alert("Something went Wrong");
            }
        }
    }

    return(
        <div style={{width:"1000px", margin:"30px auto"}}>
            <form onSubmit={handleSubmit}>
                <h1>Teacher Form</h1>
                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Teacher Name:</label>
                    <input type="text" name="teacher_name" value={teacher.teacher_name} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.teacher_name?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px", display:"inline-block"}}>Email:</label>
                    <input type="text" name="email" value={teacher.email} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.email?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px", display:"inline-block"}}>Phone:</label>
                    <input type="text" name="phone" value={teacher.phone} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.phone?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px", display:"inline-block"}}>Gender:</label>
                    <label htmlFor="male">
                     <input type="radio" name="gender" id="male" value="male" checked={teacher.gender==="male"} onChange={handleChange} />
                    Male</label> &nbsp; &nbsp;
                    <label htmlFor="female">
                        <input type="radio" name="gender" id="female" value="female" checked={teacher.gender==="female"} onChange={handleChange}/>
                    Female</label>
                    
                    <span style={{color:"red"}}>{errors.gender?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px", display:"inline-block"}}>Deparment:</label>
                    <input type="text" name="department" value={teacher.department} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.department?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px", display:"inline-block"}}>Status:</label>
                    <select name="status" value={teacher.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <span style={{color:"red"}}>{errors.status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>
            </form>

            <table border="1" cellPadding="5">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Teacher Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {teachers.map((item)=>{
                        return(
                            <tr key={item.teacher_id}>
                                <td>{item.teacher_id}</td>
                                <td>{item.teacher_name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.gender}</td>
                                <td>{item.department}</td>
                                <td>{item.status}</td>

                                <td>
                                    <button type="button" onClick={()=>getSingleTeacher(item.teacher_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteTeacher(item.teacher_id)}>Delete</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>viewTeacher(item.teacher_id)}>View</button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>

            </table>

            {view &&(
                <div>
                    <p>
                        ID:{view.teacher_id}

                    </p>

                     <p>
                        Teacher Name:{view.teacher_name}
                        
                    </p>

                     <p>
                        Email:{view.email}
                        
                    </p>

                     <p>
                        Phone:{view.phone}
                        
                    </p>

                     <p>
                        Gender:{view.gender}
                        
                    </p>

                     <p>
                        Department:{view.department}
                        
                    </p>

                     <p>
                        Status:{view.status}
                        
                    </p>

                    <p>
                        <button type="button" onClick={()=>setView(null)}>Close</button>
                    </p>
                </div>
            )}

        </div>
    )
}

export default TeacherForm;