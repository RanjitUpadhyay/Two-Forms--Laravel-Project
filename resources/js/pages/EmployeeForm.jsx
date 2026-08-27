import { useState, useEffect } from "react";
import axios from "axios";

function EmployeeForm() {
    const [employee, setEmployee] = useState({
        "employee_name": "",
        "email": "",
        "phone": "",
        "gender": "",
        "department": "",
        "joining_date": "",
        "status": ""
    })

    const [employees, setEmployees] = useState([]);
    const [editId, setEditId] = useState(null);
    const [view, setView] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/employee";

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const viewEmployee = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setView(response.data);
    }

    const getAllEmployees = async () => {
        const response = await axios.get(URL);
        setEmployees(response.data);
    }

    const getSingleEmployee = async (id) => {

        const response = await axios.get(`${URL}/${id}`);
        setEmployee(response.data);
        setEditId(id);

    }

    useEffect(()=>{
        getAllEmployees();
    },[])

    const addEmployee = async () => {
        await axios.post(URL, employee);
        alert("Employee Added");
    }

    const updateEmployee = async () => {
        await axios.put(`${URL}/${editId}`, employee);
        alert("Employee Updated")
    }

    const deleteEmployee = async (id) => {
        const confirmDelete = window.confirm("Delete Employee?");

        if (!confirmDelete) {
            return;
        }
        else {
            await axios.delete(`${URL}/${id}`);
            alert("Employee Deleted");
            await getAllEmployees();
        }
    }

    const clearForm = () => {
        setEmployee({
            "employee_name": "",
            "email": "",
            "phone": "",
            "gender": "",
            "department": "",
            "joining_date": "",
            "status": ""
        })
        setEditId(null);
        setErrors({});
    }

    const validateForm = () => {
        let newErrors = {};

        if (!employee.employee_name) {
            newErrors.employee_name = ["employee_name is required"];
        }

        if (!employee.email) {
            newErrors.email = ["email is required"];
        }

        if (!employee.phone) {
            newErrors.phone = ["phone is required"];
        }

        if (!employee.gender) {
            newErrors.gender = ["gender is required"];
        }

        if (!employee.department) {
            newErrors.department = ["department is required"];
        }

         if (!employee.joining_date) {
            newErrors.joining_date = ["joining_date is required"];
        }

        if (!employee.status) {
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

        try {
            if (editId === null) {
                await addEmployee();
            }
            else {
                await updateEmployee();
                setEditId(null);
            }
            await getAllEmployees();
            clearForm();
        }

        catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }

            else {
                alert("Something went Wrong")
            }
        }
    }

    return (
        <div style={{ width: "1000px", margin: "30px auto" }}>

            <form onSubmit={handleSubmit}>
                <h1>Employee Form</h1>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Employee Name:</label>
                    <input type="text" name="employee_name" value={employee.employee_name} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.employee_name?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Email:</label>
                    <input type="email" name="email" value={employee.email} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.email?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Phone:</label>
                    <input type="text" name="phone" value={employee.phone} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.phone?.[0]}</span>
                </p>
                <p>

                    <label style={{ width: "110px", display: "inline-block" }}>Gender:</label>
                    <label htmlFor="male">
                        <input type="radio" name="gender" id="male" value="male" checked={employee.gender == "male"} onChange={handleChange} />Male
                    </label> &nbsp;

                    <label htmlFor="female">
                        <input type="radio" name="gender" id="female" value="female" checked={employee.gender == "female"} onChange={handleChange} />Female
                    </label>

                    <span style={{ color: "red" }}>{errors.gender?.[0]}</span>
                </p>

                <p>

                    <label style={{ width: "110px", display: "inline-block" }}>Department:</label>
                    <select name="department" value={employee.department} onChange={handleChange}>
                        <option value="">Select Department</option>
                        <option value="hr">HR</option>
                        <option value="accounts">Accounts</option>
                        <option value="technical">Technical</option>
                        <option value="support">Support</option>
                    </select>
                    <span style={{ color: "red" }}>{errors.department?.[0]}</span>
                </p>

                 <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Joining Date:</label>
                    <input type="date" name="joining_date" value={employee.joining_date} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.joining_date?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Status:</label>
                    <select name="status" value={employee.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="resigned">Resigned</option>
                        <option value="terminated">Terminated</option>
                    </select>
                    <span style={{ color: "red" }}>{errors.status?.[0]}</span>

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
                        <th>ID</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Deparment</th>
                        <th>Joining Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((item)=>{
                        return(
                            <tr key={item.employee_id}>
                                <td>{item.employee_id}</td>
                                <td>{item.employee_name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.gender}</td>
                                <td>{item.department}</td>
                                <td>{item.joining_date}</td>
                                <td>{item.status}</td>

                                <td>
                                    <button type="button" onClick={()=>getSingleEmployee(item.employee_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteEmployee(item.employee_id)}>Delete</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>viewEmployee(item.employee_id)}>View</button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {view && (
                <div>
                    <h2>Employee Details</h2>

                    <p>
                        ID:{view.employee_id}
                    </p>

                    <p>
                        Employee Name:{view.employee_name}
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
                        Joining Date:{view.joining_date}
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

export default EmployeeForm;