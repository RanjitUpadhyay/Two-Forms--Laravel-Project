import { useState, useEffect } from "react";
import axios from "axios";

function StudentForm() {
    const [student, setStudent] = useState({
        student_name: "",
        email: "",
        phone: "",
        DOB: "",
        gender: "",
        address: "",
        status: ""
    })

    const [students, setStudents] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [view, setView] = useState(null);

    const URL = "http://127.0.0.1:8000/api/student";

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const viewStudent = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setView(response.data);
    }

    const getAllStudent = async () => {
        const response = await axios.get(URL);
        setStudents(response.data);
    }

    useEffect(()=>{
        getAllStudent();
    },[]);

    const getSingleStudent = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setStudent(response.data);
        setEditId(id);
    }

    const addStudent = async () => {
        await axios.post(URL, student);
        alert("Student Added");
    }

    const updateStudent = async () => {
        await axios.put(`${URL}/${editId}`, student);
        alert("Student Updated");
    }

    const deleteStudent = async (id) => {
        const confirmDelete = window.confirm("Delete Student?");

        if (!confirmDelete) {
            return;
        }

        else {
            await axios.delete(`${URL}/${id}`);
            alert("Student Deleted");
            getAllStudent();
        }
    }

    const clearForm = () => {
        setStudent({
            student_name: "",
            email: "",
            phone: "",
            DOB: "",
            gender: "",
            address: "",
            status: ""
        });

        setEditId(null);
        setErrors({});
    }

    const validateForm = () => {
        let newErrors = {};

        if (!student.student_name) {
            newErrors.student_name = ["Student Name is required"];
        }

        if (!student.email) {
            newErrors.email = ["Email is required"];
        }

        if (!student.phone) {
            newErrors.phone = ["Phone is required"];
        }

        if (!student.DOB) {
            newErrors.DOB = ["DOB is required"];
        }

        if (!student.gender) {
            newErrors.gender = ["gender is required"];
        }

        if (!student.address) {
            newErrors.address = ["address is required"];
        }

        if (!student.status) {
            newErrors.status = ["status is required"];
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
       try{
        
        if (editId === null) {
            await addStudent();
        }

        else {
            await updateStudent();
            setEditId(null);
        }

        await getAllStudent();
        clearForm();
       }

       catch(error){
        if(error.response && error.response.status===422)
        {
            setErrors(error.response.data.errors);
        }
        else{
            alert("Something Went Wrong")
        }
       }
    }

    return (
        <div style={{ width: "1000px", margin: "50px auto" }}>

            <form onSubmit={handleSubmit}>


                <h1>Student Form</h1>

                <p>
                    <label >Student Name:</label>
                    <input type="text" name="student_name" value={student.student_name} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.student_name?.[0]}</span>
                </p>

                <p>
                    <label >Email:</label>
                    <input type="text" name="email" value={student.email} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.email?.[0]}</span>
                </p>

                <p>
                    <label >Phone:</label>
                    <input type="text" name="phone" value={student.phone} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.phone?.[0]}</span>
                </p>

                <p>
                    <label >DOB:</label>
                    <input type="date" name="DOB" value={student.DOB} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.DOB?.[0]}</span>
                </p>

                <p>
                    <label >Gender:</label>
                    <label htmlFor="male">
                        <input type="radio" name="gender" id="male" value="male" checked={student.gender == "male"} onChange={handleChange} />Male
                    </label>
                    &nbsp;

                    <label htmlFor="female">
                        <input type="radio" name="gender" id="female" value="female" checked={student.gender == "female"} onChange={handleChange} />Female
                    </label>

                    <span style={{ color: "red" }}>{errors.gender?.[0]}</span>
                </p>

                <p>
                    <label >Address:</label>
                    <input type="text" name="address" value={student.address} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.address?.[0]}</span>
                </p>

                <p>
                    <label >Status:</label>
                    <select name="status" value={student.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="passed_out">Passed Out</option>
                    </select>

                    <span style={{ color: "red" }}>{errors.status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId === null ? "Save" : "Update"}</button>
                    &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>
            </form>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((item) => {
                        return (
                            <tr key={item.student_id}>
                                <td> {item.student_id}</td>
                                <td> {item.student_name}</td>
                                <td> {item.email}</td>
                                <td> {item.phone}</td>
                                <td> {item.DOB}</td>
                                <td> {item.gender}</td>
                                <td> {item.address}</td>
                                <td> {item.status}</td>

                                <td>
                                    <button type="button" onClick={()=>getSingleStudent(item.student_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteStudent(item.student_id)}>Delete</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>viewStudent(item.student_id)}>View</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

            {view && (<div>
                <h2>Student Record</h2>
                <p>
                    Student ID:{view.student_id}
                </p>
                <p>
                    Student Name:{view.student_name}
                </p>

                <p>
                    Email:{view.email}
                </p>

                <p>
                    Phone:{view.phone}
                </p>

                <p>
                    DOB:{view.DOB}
                </p>

                <p>
                    Gender:{view.gender}
                </p>

                <p>
                    Address:{view.address}
                </p>

                <p>
                    Status:{view.status}
                </p>

                <button type="button" onClick={() => setView(null)}>Close</button>
            </div>

            )
            }

        </div>
    )
}

export default StudentForm;
