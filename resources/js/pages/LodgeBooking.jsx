import { useState, useEffect } from "react";
import axios from "axios";

function LodgeBooking() {
    const [booking, setBooking] = useState({
        name: "",
        phone: "",
        room_no: "",
        check_in: "",
        check_out: "",
        booking_status: ""
    });

    const [bookings, setBookings] = useState([]);
    const [editId, setEditId] = useState(null);
    const [viewBooking, setViewBooking] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/lodge/booking";

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    };

    const getAllBookings = async () => {
        const response = await axios.get(URL);
        setBookings(response.data);
    };

    useEffect(() => {
        getAllBookings();
    }, []);

    const getSingleBooking = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setBooking(response.data);
        setEditId(id);
    };

    const addBooking = async () => {
        await axios.post(URL, booking);
        alert("Booking Added");
    };

    const updateBooking = async () => {
        await axios.put(`${URL}/${editId}`, booking);
        alert("Booking Updated");
    };

    const deleteBooking = async (id) => {
        const confirmDelete = window.confirm("Delete Booking?");

        if (!confirmDelete) {
            return;
        }

        else {
            await axios.delete(`${URL}/${id}`);
            alert("Booking Deleted");
            await getAllBookings();
        }
    }

    const viewSingleBooking = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setViewBooking(response.data);
    }

    const clearForm = () => {
        setBooking({
            name: "",
            phone: "",
            room_no: "",
            check_in: "",
            check_out: "",
            booking_status: ""
        });
        setEditId(null);
        setErrors({});
    }

    const validateForm = () => {
        const newErrors = {};// initially empty

        if (!booking.name) {
            newErrors.name = ["Name is required"];
        }

        if (!booking.phone) {
            newErrors.phone = ["Phone is required"];
        }

        if (!booking.room_no) {
            newErrors.room_no = ["Room No is required"];
        }

        if (!booking.check_in) {
            newErrors.check_in = ["Check In is required"];
        }

        if (!booking.check_out) {
            newErrors.check_out = ["Check Out is required"];
        }

        if (!booking.booking_status) {
            newErrors.booking_status = ["Booking Status is required"];
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
                await addBooking();
            }
            else {
                await updateBooking();
                setEditId(null);
            }
            await getAllBookings();
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
        <div style={{ width: "1000px", margin: "30px auto" }}>
            <form onSubmit={handleSubmit}>
                
                <h1>Lodge Booking Form</h1>

                <div style={{ marginBottom: "15px" }}>

                    <label style={{ width: "110px", display: "inline-block" }}>Guest Name:</label>
                    <input type="text" value={booking.name} name="name" onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.name?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>

                    <label style={{ width: "110px", display: "inline-block" }}>Phone:</label>
                    <input type="text" value={booking.phone} name="phone" onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.phone?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>

                    <label style={{ width: "110px", display: "inline-block" }}>Room No:</label>
                    <input type="number" value={booking.room_no} name="room_no" onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.room_no?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>

                    <label style={{ width: "110px", display: "inline-block" }}>Check In:</label>
                    <input type="date" value={booking.check_in} name="check_in" onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.check_in?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>

                    <label style={{ width: "110px", display: "inline-block" }}>Check Out:</label>
                    <input type="date" value={booking.check_out} name="check_out" onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.check_out?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>

                    <label style={{ width: "110px", display: "inline-block" }}>Booking Status:</label>
                    <select name="booking_status" value={booking.booking_status} onChange={handleChange}>
                        <option value="">select status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.booking_status?.[0]}</div>
                </div>

                <p>
                    <button type="submit" >{editId === null ? "Save" : "Update"}</button>
                    &nbsp; &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>

                <hr />

            </form>

            <h1>Booking List</h1>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Guest Name</th>
                        <th>Phone</th>
                        <th>Room No</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Booking Status</th>
                        <th>Action</th>

                    </tr>
                </thead>

                <tbody>

                    {bookings.map((item) => {
                        return (<tr key={item.booking_id}>
                            <td>{item.booking_id}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.room_no}</td>
                            <td>{item.check_in}</td>
                            <td>{item.check_out}</td>
                            <td>{item.booking_status}</td>

                            <td>
                                <button type="button" onClick={() => getSingleBooking(item.booking_id)}>Edit</button>
                                &nbsp;&nbsp;

                                <button type="button" onClick={() => deleteBooking(item.booking_id)}>Delete</button>

                                &nbsp;&nbsp;

                                <button type="submit" onClick={() => viewSingleBooking(item.booking_id)}>View</button>
                            </td>
                        </tr>

                        )
                    })}

                </tbody>
            </table>

            {viewBooking && (<div>

            <h2>Booking Details</h2>
                <p>
                    ID:{viewBooking.booking_id}
                </p>


                <p>
                    Guest Name:{viewBooking.name}
                </p>


                <p>
                    Phone:{viewBooking.phone}
                </p>

                <p>
                    Check IN:{viewBooking.check_in}
                </p>

                <p>
                    Check Out:{viewBooking.check_out}
                </p>

                <p>
                    Booking Status:{viewBooking.booking_status}
                </p>

                <button type="button" onClick={() => setViewBooking(null)}>Close</button>

            </div>
)}
</div>
    )
}
export default LodgeBooking;