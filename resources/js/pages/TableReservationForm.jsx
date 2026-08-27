import { useState, useEffect } from "react";
import axios from "axios";

function TableReservationForm() {
    const [tableReservation, setTableReservation] = useState({
        "table_id": "",
        "customer_name": "",
        "phone": "",
        "reservation_date": "",
        "number_of_guests": "",
        "reservation_status": ""
    })

    const [tableReservations, setTableReservations] = useState([]);
    const [editId, setEditId] = useState(null);
    const [tables, setTables] = useState([]);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/table-reservation";
    const URL_TABLE = "http://127.0.0.1:8000/api/table";

    const handleChange = (e) => {
        setTableReservation({
            ...tableReservation,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const getAllTables = async () => {
        const response = await axios.get(URL_TABLE);
        setTables(response.data);
    }

    const getAllTableReservations = async () => {
        const response = await axios.get(URL);
        setTableReservations(response.data);
    }

    useEffect(() => {
        getAllTableReservations();
        getAllTables();
    }, []);

    const getSingleTableReservation = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setTableReservation(response.data);
        setEditId(id);
    }

    const addTableReservation = async () => {
        await axios.post(URL, tableReservation);
        alert("Table Reservation Added");
    }

    const updateTableReservation = async () => {
        await axios.put(`${URL}/${editId}`, tableReservation);
        alert("Table Reservation Updated");
    }

    const deleteTableReservation = async (id) => {
        const confirmDelete = window.confirm("Delete Table Reservation?");
        if (!tableReservation) {
            return;
        }

        else {
            await axios.delete(`${URL}/${id}`);
            alert("Table Reservation Deleted");
            getAllTableReservations();
        }
    }

    const clearForm = () => {
        setTableReservation({
            "table_id": "",
            "customer_name": "",
            "phone": "",
            "reservation_date": "",
            "number_of_guests": "",
            "reservation_status": ""
        });

        setEditId(null);
        setErrors({});
    }

    const validateForm = () => {
        let newErrors = {};

        if (!tableReservation.table_id) {
            newErrors.table_id = ["table_id is required"];
        }

        if (!tableReservation.customer_name) {
            newErrors.customer_name = ["customer_name is required"]
        }

        if (!tableReservation.phone) {
            newErrors.phone = ["phone is required"]
        }

        if (!tableReservation.reservation_date) {
            newErrors.reservation_date = ["reservation_date is required"]
        }

        if (!tableReservation.number_of_guests) {
            newErrors.number_of_guests = ["number_of_guests is required"]
        }

        if (!tableReservation.reservation_status) {
            newErrors.reservation_status = ["reservation_status is required"]
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
                await addTableReservation();
            }
            else {
                await updateTableReservation();
                setEditId(null);
            }
            await getAllTableReservations();
            clearForm();
        }
        catch (error) {
            if (error.response && error.response.status === 422)
                setErrors(error.response.data.errors);
            else {
                alert("Something Went Wrong");
            }
        }
    }


    return (
        <div style={{ width: "1000px", margin: "30px auto" }}>
            <form onSubmit={handleSubmit}>
                <h1>Table Reservation Form</h1>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Select Table Number:</label>
                    <select name="table_id" value={tableReservation.table_id} onChange={handleChange}>
                        <option value="">Select Table Number</option>
                        {tables.map((item) => {
                            return (
                                <option key={item.table_id} value={item.table_id}>{item.table_number}</option>
                            )
                        })}
                    </select>
                    <span style={{ color: "red" }}>{errors.table_id?.[0]}</span>

                </p>
                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Customer Name:</label>
                    <input type="text" value={tableReservation.customer_name} name="customer_name" onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.customer_name?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Phone:</label>
                    <input type="text" value={tableReservation.phone} name="phone" onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.phone?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Reservation Date:</label>
                    <input type="date" value={tableReservation.reservation_date} name="reservation_date" onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.reservation_date?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Number Of Guests:</label>
                    <input type="number" value={tableReservation.number_of_guests} name="number_of_guests" onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.number_of_guests?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Reservation Status:</label>
                    <select name="reservation_status" value={tableReservation.reservation_status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <span style={{ color: "red" }}>{errors.reservation_status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    <button type="button" onClick={()=>clearForm()}>Clear</button>
                </p>

                <table border="1" cellPadding="5">
                    <thead>
                        <tr>
                             <th>Reservation ID</th>
                            <th>Table ID:</th>
                            <th>Table Number</th>

                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Reservation Date</th>
                            <th>Number Of Guests</th>
                            <th>Reservation Status</th>
                            <th>Actions</th>

                           
                        </tr>
                    </thead>

                    <tbody>
                        {tableReservations.map((item)=>{
                            return(
                                <tr key={item.reservation_id}>
                                    <td>{item.reservation_id}</td>
                                    <td>{item.table_id}</td>

                                    <td>{item.table?item.table.table_number:""}</td>

                                    <td>{item.customer_name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.reservation_date}</td>
                                    <td>{item.number_of_guests}</td>
                                    <td>{item.reservation_status}</td>

                                     <td>
                                        <button type="button" onClick={()=>getSingleTableReservation(item.reservation_id)}>Edit</button>
                                        &nbsp;
                                        <button type="button" onClick={()=>deleteTableReservation(item.reservation_id)}>Delete</button>
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
  export default TableReservationForm;