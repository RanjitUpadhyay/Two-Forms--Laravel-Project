import { useState, useEffect, } from "react";
import axios from "axios";

function EnrollmentForm() {
    const [enrollment, setEnrollment] = useState({
        student_id: "",
        class_name: "",
        section: "",
        academic_year: "",
        admission_date: "",
        enrollment_status: ""
    });

    const [enrollments, setEnrollments] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const [students, setStudents] = useState([]);

    const URL = "http://127.0.0.1:8000/api/enrollment";
    const STUDENT_URL = "http://127.0.0.1:8000/api/student";

    const handleChange = (e) => {
        setEnrollment({
            ...enrollment,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const getAllStudent = async () => {
        const response = await axios.get(STUDENT_URL);
        setStudents(response.data);
    }

    const getAllEnrollment = async () => {
        const response = await axios.get(URL);
        setEnrollments(response.data);
    }

    useEffect(() => {
        getAllEnrollment();
        getAllStudent();
    }, [])

    const getSingleEnrollment = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setEnrollment(response.data);
        setEditId(id);
    }

    const addEnrollment = async () => {
        await axios.post(URL, enrollment);
        alert("Enrollment Added");
    }

    const updateEnrollment = async () => {
        await axios.put(`${URL}/${editId}`, enrollment);
        alert("Enrollment Updated");
    }

    const deleteEnrollment = async (id) => {
        const confirmDelete = window.confirm("Delete Enrollment?");

        if (!confirmDelete) {
            return;
        }

        else {
            await axios.delete(`${URL}/${id}`);
            alert("Enrollment Deleted");
            getAllEnrollment();
        }
    }

    const clearForm = () => {
        setEnrollment({
            student_id: "",
            class_name: "",
            section: "",
            academic_year: "",
            admission_date: "",
            enrollment_status: ""
        });
        setEditId(null);
        setErrors({});
    }

    const validateForm = () => {
        let newErrors = {};

        if (!enrollment.student_id) {
            newErrors.student_id = ["Student ID is required"]
        }

        if (!enrollment.class_name) {
            newErrors.class_name = ["Class Name is required"]
        }

        if (!enrollment.section) {
            newErrors.section = ["Section is required"]
        }

        if (!enrollment.academic_year) {
            newErrors.academic_year = ["academic_year is required"]
        }

        if (!enrollment.admission_date) {
            newErrors.admission_date = ["admission_date is required"]
        }

        if (!enrollment.enrollment_status) {
            newErrors.enrollment_status = ["enrollment_status is required"]
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) { return };

        try {
            if (editId === null) {
                await addEnrollment();
            }

            else {
                await updateEnrollment();
                setEditId(null);
            }
            await getAllEnrollment();
            clearForm();
        }

        catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            else {
                alert("Something Went Wrong");
            }
        }
    }

    return (
        <div style={{ width: "1200px", margin: "30px auto" }}>

            <form onSubmit={handleSubmit}>

                <h1>Enrollment Form</h1>

                <p>
                    <label>Select Student:</label>
                    <select name="student_id" value={enrollment.student_id} onChange={handleChange}>
                        <option value="">Select Student</option>
                        {students.map((item) => {
                            return (
                                <option key={item.student_id} value={item.student_id}>{item.student_id} {"-"} {item.student_name}</option>
                            )
                        })}
                    </select>

                    <span style={{ color: "red" }}>{errors.student_id?.[0]}</span>
                </p>

                <p>
                    <label>Class Name:</label>

                    <input type="text" name="class_name" value={enrollment.class_name} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.class_name?.[0]}</span>
                </p>

                <p>
                    <label>Section:</label>

                    <input type="text" name="section" value={enrollment.section} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.section?.[0]}</span>
                </p>

                <p>
                    <label>Academic Year:</label>

                    <input type="date" name="academic_year" value={enrollment.academic_year} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.academic_year?.[0]}</span>
                </p>

                <p>
                    <label>Admission Date:</label>

                    <input type="text" name="admission_date" value={enrollment.admission_date} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.admission_date?.[0]}</span>
                </p>

                <p>
                    <label>Enrollment Status:</label>

                    <select name="enrollment_status" value={enrollment.enrollment_status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="transferred">Transffered</option>
                    <option value="cancelled">Cancelled</option>
                    </select>
                   

                    <span style={{ color: "red" }}>{errors.enrollment_status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>
            </form>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Enrollment ID</th>
                        <th>Student ID</th>

                        <th>Student Name:</th>

                        <th>Class Name</th>
                        <th>Section</th>
                        <th>Academic Year</th>
                        <th>Admission Date</th>
                        <th>Enrollment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                   {enrollments.map((item)=>{
                   // const stu=students.find((student)=>student.student_id===item.student_id)
                    return(
                        <tr key={item.enrollment_id}>
                            <td>{item.enrollment_id}</td>
                            <td>{item.student_id}</td>

                            <td> {item.students ? item.students.student_name : ""}</td>

                            <td>{item.class_name}</td>
                            <td>{item.section}</td>
                            <td>{item.academic_year}</td>
                            <td>{item.admission_date}</td>
                            <td>{item.enrollment_status}</td>

                            <td>
                                <button type="button" onClick={()=>getSingleEnrollment(item.enrollment_id)}>Edit</button>
                                &nbsp;
                                <button type="button" onClick={()=>deleteEnrollment(item.enrollment_id)}>Delete</button>
                            </td>
                        </tr>
                    )
                   })}
                </tbody>

            </table>

        </div>
    )

}

export default EnrollmentForm;