import { useState, useEffect } from "react";
import axios from "axios";

function EmployeeLeaveForm() {
    const [employeeLeave, setEmployeeLeave] = useState({
       "employee_id":"",
       "leave_type":"",
       "from_date":"",
       "to_date":"",
       "reason":"",
       "leave_status":""
    })

    const [employeeLeaves, setEmployeeLeaves] = useState([]);
    const [editId, setEditId] = useState(null);
    const [employees, setEmployees]=useState([]);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/employee-leave";
     const EMP_URL = "http://127.0.0.1:8000/api/employee";

    const handleChange = (e) => {
        setEmployeeLeave({
            ...employeeLeave,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const getAllEmployeeLeaves=async()=>{
        const response=await axios.get(URL);
        setEmployeeLeaves(response.data);
    }
    

    const getAllEmployees = async () => {
        const response = await axios.get(EMP_URL);
        setEmployees(response.data);
    }

    const getSingleEmployeeLeave = async (id) => {

        const response = await axios.get(`${URL}/${id}`);
        setEmployeeLeave(response.data);
        setEditId(id);

    }

    useEffect(()=>{
        getAllEmployees();
        getAllEmployeeLeaves();
    },[])

    const addEmployeeLeave = async () => {
        await axios.post(URL, employeeLeave);
        alert("Employee Leave Added");
    }

    const updateEmployeeLeave = async () => {
        await axios.put(`${URL}/${editId}`, employeeLeave);
        alert("Employee Leave Updated")
    }

    const deleteEmployeeLeave = async (id) => {
        const confirmDelete = window.confirm("Delete Employee Leave?");

        if (!confirmDelete) {
            return;
        }
        else {
            await axios.delete(`${URL}/${id}`);
            alert("Employee Leave Deleted");
            await getAllEmployeeLeaves();
        }
    }

    const clearForm = () => {
        setEmployeeLeave({
       "employee_id":"",
       "leave_type":"",
       "from_date":"",
       "to_date":"",
       "reason":"",
       "leave_status":""
        })
        setEditId(null);
        setErrors({});
    }

    const validateForm = () => {
        let newErrors = {};

        if (!employeeLeave.employee_id) {
            newErrors.employee_id = ["employee_id is required"];
        }

         if (!employeeLeave.leave_type) {
            newErrors.leave_type = ["leave_type is required"];
        }

         if (!employeeLeave.from_date) {
            newErrors.from_date = ["from_date is required"];
        }

         if (!employeeLeave.to_date) {
            newErrors.to_date = ["to_date is required"];
        }

         if (!employeeLeave.reason) {
            newErrors.reason = ["reason is required"];
        }

         if (!employeeLeave.leave_status) {
            newErrors.leave_status = ["leave_status is required"];
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
                await addEmployeeLeave();
            }
            else {
                await updateEmployeeLeave();
                setEditId(null);
            }
            await getAllEmployeeLeaves();
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
                <h1>Employee Leave Form</h1>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Select Employee:</label>
                    <select name="employee_id" value={employeeLeave.employee_id} onChange={handleChange}>
                        <option value="">Select Employee</option>
                        {employees.map((item)=>{
                            return(
                                <option key={item.employee_id} value={item.employee_id}>{item.employee_name}</option>
                            )
                        })}
                    </select>
                    <span style={{color:"red"}}>{errors.employee_id?.[0]}</span>
                </p>

                
                 <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Leave Type:</label>
                    <input type="text" name="leave_type" value={employeeLeave.leave_type} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.leave_type?.[0]}</span>
                </p>

                 <p>
                    <label style={{ width: "110px", display: "inline-block" }}>From Date::</label>
                    <input type="date" name="from_date" value={employeeLeave.from_date} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.from_date?.[0]}</span>
                </p>

                 <p>
                    <label style={{ width: "110px", display: "inline-block" }}>To Date:</label>
                    <input type="date" name="to_date" value={employeeLeave.to_date} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.to_date?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Reason:</label>
                    <input type="text" name="reason" value={employeeLeave.reason} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.reason?.[0]}</span>
                </p>



                 <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Leave Status:</label>
                    <select name="leave_status" value={employeeLeave.leave_status} onChange={handleChange}>
                    <option value="">Select Leave Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Cancelled">Cancelled</option>

                    </select>
                   
                    <span style={{ color: "red" }}>{errors.leave_status?.[0]}</span>
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
                         <th>Leave ID</th>
                        <th>Employee ID</th>

                        <th>Select Employee</th>
                        
                       <th>Leave Type</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Reason</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employeeLeaves.map((item)=>{
                        return(
                            <tr key={item.leave_id}>
                                <td>{item.leave_id}</td>
                                <td>{item.employee_id}</td>

                                <td>{item.employee ? item.employee.employee_name : ""}</td>

                                <td>{item.leave_type}</td>
                                <td>{item.from_date}</td>
                                <td>{item.to_date}</td>
                                <td>{item.reason}</td>
                                

                                <td>
                                    <button type="button" onClick={()=>getSingleEmployeeLeave(item.leave_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteEmployeeLeave(item.leave_id)}>Delete</button>
                                
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeLeaveForm;