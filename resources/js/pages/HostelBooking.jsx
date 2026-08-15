import { useState, useEffect, } from "react";
import axios from "axios";

function HostelBooking() {
    const [booking, setBooking] = useState({
        name: "",
        gender: "",
        phone: "",
        email: "",
        room_no: "",
        check_in: "",
        check_out: ""
    });

    const [bookings, setBookings] = useState([]);
    const [editId, setEditId] = useState(null);
    const [viewBooking, setViewBooking] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/hostel/booking";

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const getAllBookings = async () => {
        const response = await axios.get(URL);
        setBookings(response.data);
    }

    useEffect(() => {
        getAllBookings();
    }, []);

    const getSingleBooking = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setBooking(response.data);
        setEditId(id);
    }

    const addBooking = async () => {
        await axios.post(URL, booking);
        alert("Booking Added");
    }

    const updateBooking = async () => {
        await axios.put(`${URL}/${editId}`,booking);
        alert("Booking Updated");
    }

    const deleteBooking = async (id) => {
        const confirmDelete = window.confirm("Delete Booking?");

        if (!confirmDelete) {
            return;
        }
        else {
            await axios.delete(`${URL}/${id}`);
            getAllBookings();
        }

        alert("Booking Deleted");

    }

    const viewSingleBooking = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setViewBooking(response.data);
    }

    const clearForm = () => {
        setBooking({
            name: "",
            gender: "",
            phone: "",
            email: "",
            room_no: "",
            check_in: "",
            check_out: ""
        });
        setEditId(null);
        setErrors({});
    }

    const validateForm = () => {
        let newErrors = {};

        if (!booking.name) {
            newErrors.name = ["Name is required"];
        }

        if (!booking.gender) {
            newErrors.gender = ["Gender is required"];
        }

        if (!booking.phone) {
            newErrors.phone = ["Phone is required"];
        }

        if (!booking.email) {
            newErrors.email = ["Email is required"];
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

        setErrors(newErrors);
        return Object.keys(newErrors).length == 0;


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
                <h1>Hostel Booking</h1>

                <p>
                    <label>Guest Name:</label>
                    <input type="text" name="name" value={booking.name} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.name?.[0]}</span>

                </p>


                <p>
                    <label>Gender:</label>
                    <label htmlFor="male">
                        <input type="radio" name="gender" id="male" value="male" checked={booking.gender === "male"} onChange={handleChange} />Male
                    </label>  &nbsp;
                    <label htmlFor="female">
                        <input type="radio" name="gender" id="female" value="female" checked={booking.gender === "female"} onChange={handleChange} />Female
                    </label>
                    <span style={{ color: "red" }}>{errors.gender?.[0]}</span>

                </p>


                <p>
                    <label>Phone:</label>
                    <input type="text" name="phone" value={booking.phone} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.phone?.[0]}</span>

                </p>


                <p>
                    <label>Email:</label>
                    <input type="text" name="email" value={booking.email} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.email?.[0]}</span>

                </p>


                <p>
                    <label>Room No:</label>
                    <input type="number" name="room_no" value={booking.room_no} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.room_no?.[0]}</span>

                </p>


                <p>
                    <label>Check In:</label>
                    <input type="date" name="check_in" value={booking.check_in} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.check_in?.[0]}</span>

                </p>


                <p>
                    <label>Check Out:</label>
                    <input type="date" name="check_out" value={booking.check_out} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.check_out?.[0]}</span>

                </p>

                <p>
                    <button type="submit">{editId === null ? "Save" : "Update"}</button>
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>
            </form>

            <hr />

            <table border="1" cellPadding="8">

                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Guest Name</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Room No</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Action</th>
                    </tr>
                </thead>


                <tbody>
                    {bookings.map((item) => {
                        return (
                            <tr key={item.booking_id}>
                                <td>{item.booking_id}</td>
                                <td>{item.name}</td>
                                <td>{item.gender}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>{item.room_no}</td>
                                <td>{item.check_in}</td>
                                <td>{item.check_out}</td>

                                <td>
                                    <button type="button" onClick={() => getSingleBooking(item.booking_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={() => deleteBooking(item.booking_id)}>Delete</button>
                                    &nbsp;
                                    <button type="button" onClick={() => viewSingleBooking(item.booking_id)}>View</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

                {viewBooking && (
                    <div>
                        <h2>Booking Details</h2>
                        <p>
                            ID:{viewBooking.booking_id}
                        </p>

                        <p>
                            Guest Name:{viewBooking.name}
                        </p>

                        <p>
                            Gender:{viewBooking.gender}
                        </p>

                        <p>
                            Phone:{viewBooking.phone}
                        </p>
                        <p>
                            Email:{viewBooking.email}
                        </p>

                        <p>
                            Room No:{viewBooking.room_no}
                        </p>

                        <p>
                            Check In:{viewBooking.check_in}
                        </p>

                        <p>
                            Check Out:{viewBooking.check_out}
                        </p>

                        <button type="button" onClick={()=>setViewBooking(null)}>Close</button>
                    </div>
                )}


            </table>

        </div>
    )

}

export default HostelBooking;