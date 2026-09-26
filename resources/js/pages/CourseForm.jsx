import { useState, useEffect } from "react";
import axios from "axios";

function CourseForm() {
    const [course, setCourse] = useState({
        "course_name": "",
        "duration": "",
        "fee": "",
        "status": ""
    })

    const [courses, setCourses] = useState([]);
    const [editId, setEditId] = useState(null);
    const [view, setView] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/course";

    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const viewCourse = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setView(response.data);
    }

    const getAllCourses = async () => {
        const response = await axios.get(URL);
        setCourses(response.data);
    }

    useEffect(() => {
        getAllCourses();
    }, [])

    const getSingleCourse = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setCourse(response.data);
        setEditId(id);
    }

    const addCourse = async () => {
        await axios.post(URL, course);
        alert("Course Added");
    }

    const updateCourse = async () => {
        await axios.put(`${URL}/${editId}`, course);
        alert("Course Updated");
    }

    const deleteCourse = async (id) => {
        const confirmDelete = window.confirm("Delete Course?");

        if (!confirmDelete) {
            return;
        }

        else {
            await axios.delete(`${URL}/${id}`);
            alert("Course Deleted");
            getAllCourses();
        }
    }

    const clearForm = () => {
        setCourse({
            "course_name": "",
            "duration": "",
            "fee": "",
            "status": ""
        })

        setEditId(null);
        setErrors({});
    }

    const validateForm = () => {
        let newWrrors = {};
        if (!course.course_name) {
            newWrrors.course_name = ["course_name is required"];
        }

        if (!course.duration) {
            newWrrors.duration = ["duration is required"];
        }

        if (!course.fee) {
            newWrrors.fee = ["fee is required"];
        }

        if (!course.status) {
            newWrrors.status = ["status is required"];
        }

        setErrors(newWrrors);
        return Object.keys(newWrrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            if (editId === null) {
                await addCourse();
            }
            else {
                await updateCourse();
                setEditId(null);
            }
            await getAllCourses();
            clearForm();
        }

        catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            else {
                alert("Something Went Wrong")
            }
        }
    }

    return (
        <div style={{ width: "1000px", margin: "50px auto" }}>

            <form onSubmit={handleSubmit}>
                <h1>Course Form</h1>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Course Name:</label>
                    <input type="text" value={course.course_name} name="course_name" onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.course_name?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Course Duration:</label>
                    <input type="text" value={course.duration} name="duration" onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.duration?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Course Fee:</label>
                    <input type="text" value={course.fee} name="fee" onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.fee?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Course Status:</label>
                    <select name="status" value={course.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <span style={{ color: "red" }}>{errors.status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId === null ? "Save" : "Update"}</button>
                    &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>

                <table border="1" cellPadding="2">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Course Duration</th>
                            <th>Course Fee</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>


                    </thead>

                    <tbody>
                        {courses.map((item) => {
                            return (
                                <tr key={item.course_id}>
                                    <td>{item.course_id}</td>
                                    <td>{item.course_name}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.fee}</td>
                                    <td>{item.status}</td>


                                    <td>
                                        <button type="button" onClick={()=>getSingleCourse(item.course_id)}>Edit</button>
                                        &nbsp;
                                        <button type="button" onClick={()=>deleteCourse(item.course_id)}>Delete</button>
                                        &nbsp;
                                        <button type="button" onClick={()=>viewCourse(item.course_id)}>View</button>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </form>

            {view && (
                <div>
                    <h2>Course Details</h2>
                    <p>
                        Course ID:{view.course_id}

                    </p>

                    <p>
                        Course Name:{view.course_name}

                    </p>

                    <p>
                        Duration:{view.duration}

                    </p>

                    <p>
                        Fee:{view.fee}

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

export default CourseForm;