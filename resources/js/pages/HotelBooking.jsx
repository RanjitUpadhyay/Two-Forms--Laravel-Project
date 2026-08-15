import { useState, useEffect } from "react";
import axios from "axios";

function HotelBooking() {

    const [booking, setBooking] = useState({
        guest_name: "",
        email: "",
        phone: "",
        room_no: "",
        room_type: "",
        check_in: "",
        check_out: "",
        number_of_guests: "",
        booking_status: ""
    });

    const [bookings, setBookings] = useState([]); //stores the list of all hotel bookings that you display in the Booking table.
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [viewBooking, setViewBooking] = useState(null);

    const URL = "http://127.0.0.1:8000/api/booking";


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


    const addBooking = async () => {

        const response = await axios.post(URL, booking);

        alert("Booking Added");
    };


    const getSingleBooking = async (id) => {

        const response =
            await axios.get(`${URL}/${id}`);

        setBooking(response.data);

        setEditId(id);
    };


    const updateBooking = async () => {

        const response =
            await axios.put(`${URL}/${editId}`, booking);

        alert("Booking Updated");
    };


    const deleteBooking = async (id) => {

        const confirmDelete =
            window.confirm("Delete booking?");

        if (!confirmDelete) {
            return;
        }

        const response =
            await axios.delete(`${URL}/${id}`);

        alert("Booking Deleted");

        await getAllBookings();
    };

     const viewSingleBooking = async (id) => {

        const response =
            await axios.get(`${URL}/${id}`);

        setViewBooking(response.data);
    };

    const clearForm = () => {

        setBooking({
            guest_name: "",
            email: "",
            phone: "",
            room_no: "",
            room_type: "",
            check_in: "",
            check_out: "",
            number_of_guests: "",
            booking_status: ""
        });

        setEditId(null);
        setErrors({});
    };

       //frontend validation in React. It runs before Axios sends the data to Laravel.
    const validateForm = () => {

        let newErrors = {};

        if (!booking.guest_name) {
            newErrors.guest_name = [
                "Guest name is required"
            ];
        }

        if (!booking.email) {
            newErrors.email = [
                "Email is required"
            ];
        }

        if (!booking.phone) {
            newErrors.phone = [
                "Phone is required"
            ];
        }

        if (!booking.room_no) {
            newErrors.room_no = [
                "Room number is required"
            ];
        }

        if (!booking.room_type) {
            newErrors.room_type = [
                "Room type is required"
            ];
        }

        if (!booking.check_in) {
            newErrors.check_in = [
                "Check-in date is required"
            ];
        }

        if (!booking.check_out) {
            newErrors.check_out = [
                "Check-out date is required"
            ];
        }

        if (!booking.number_of_guests) {
            newErrors.number_of_guests = [
                "Number of guests is required"
            ];
        }

        if (!booking.booking_status) {
            newErrors.booking_status = [
                "Booking status is required"
            ];
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };//"Check whether newErrors contains any validation errors. If it contains no errors, return true; otherwise return false."


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {

            if (editId === null) {

                await addBooking();

            } else {

                await updateBooking();
            }

            clearForm();

            await getAllBookings();

        } catch (error) {

            if (
                error.response &&
                error.response.status === 422
            ) {

                setErrors(error.response.data.errors);

            } else {

                alert("Something went wrong");
            }
        }
    };


    return (

        <div style={{
            width: "1000px",
            margin: "30px auto"
        }}>

            <form onSubmit={handleSubmit}>

                <h1>Hotel Booking Form</h1>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Guest Name*:
                    </label>

                    <input
                        type="text"
                        name="guest_name"
                        value={booking.guest_name}
                        onChange={handleChange}
                    />

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.guest_name?.[0]}
                    </div>

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Email*:
                    </label>

                    <input
                        type="text"
                        name="email"
                        value={booking.email}
                        onChange={handleChange}
                    />

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.email?.[0]}
                    </div>

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Phone*:
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={booking.phone}
                        onChange={handleChange}
                    />

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.phone?.[0]}
                    </div>

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Room Number*:
                    </label>

                    <input
                        type="text"
                        name="room_no"
                        value={booking.room_no}
                        onChange={handleChange}
                    />

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.room_no?.[0]}
                    </div>

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Room Type*:
                    </label>

                    <select
                        name="room_type"
                        value={booking.room_type}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Room Type
                        </option>

                        <option value="Single">
                            Single
                        </option>

                        <option value="Double">
                            Double
                        </option>

                        <option value="Deluxe">
                            Deluxe
                        </option>

                        <option value="Suite">
                            Suite
                        </option>

                    </select>

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.room_type?.[0]}
                    </div>

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Check In*:
                    </label>

                    <input
                        type="date"
                        name="check_in"
                        value={booking.check_in}
                        onChange={handleChange}
                    />

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.check_in?.[0]}
                    </div>

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Check Out*:
                    </label>

                    <input
                        type="date"
                        name="check_out"
                        value={booking.check_out}
                        onChange={handleChange}
                    />

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.check_out?.[0]}
                    </div>

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Number Of Guests*:
                    </label>

                    <input
                        type="text"
                        name="number_of_guests"
                        value={booking.number_of_guests}
                        onChange={handleChange}
                    />

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.number_of_guests?.[0]}
                    </div>

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Booking Status*:
                    </label>

                    <select
                        name="booking_status"
                        value={booking.booking_status}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Status
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Confirmed">
                            Confirmed
                        </option>

                        <option value="Checked-In">
                            Checked-In
                        </option>

                        <option value="Checked-Out">
                            Checked-Out
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>

                    </select>

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.booking_status?.[0]}
                    </div>

                </div>


                <p>

        <button type="submit">{editId == null ? "Save" : "Update"}</button>

                    &nbsp;&nbsp;

        <button type="button" onClick={clearForm}>Clear</button>

                </p>

                <hr />

            </form>


            <h2>Booking List</h2>


            <table border="1" cellPadding="8">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Guest</th>
                        <th>Email</th>
                        <th>Room</th>
                        <th>Type</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {bookings.map((item) => {

                        return (

                            <tr key={item.booking_id}>

                                <td>
                                    {item.booking_id}
                                </td>

                                <td>
                                    {item.guest_name}
                                </td>

                                <td>
                                    {item.email}
                                </td>

                                <td>
                                    {item.room_no}
                                </td>

                                <td>
                                    {item.room_type}
                                </td>

                                <td>
                                    {item.check_in}
                                </td>

                                <td>
                                    {item.check_out}
                                </td>

                                <td>
                                    {item.booking_status}
                                </td>

                                <td>

                        <button onClick={() =>viewSingleBooking(item.booking_id)}>View</button>

                                    &nbsp;&nbsp;

                        <button onClick={() =>getSingleBooking( item.booking_id)}>Edit</button>

                                    &nbsp;&nbsp;

                        <button onClick={() =>deleteBooking(item.booking_id)}>Delete</button>

                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>


            {viewBooking && (

                <div>

                    <h2>Booking Details</h2>

                    <p>
                        ID: {viewBooking.booking_id}
                    </p>

                    <p>
                        Guest Name: {viewBooking.guest_name}
                    </p>

                    <p>
                        Email: {viewBooking.email}
                    </p>

                    <p>
                        Phone: {viewBooking.phone}
                    </p>

                    <p>
                        Room Number: {viewBooking.room_no}
                    </p>

                    <p>
                        Room Type: {viewBooking.room_type}
                    </p>

                    <p>
                        Check In: {viewBooking.check_in}
                    </p>

                    <p>
                        Check Out: {viewBooking.check_out}
                    </p>

                    <p>
                        Number Of Guests:
                        {viewBooking.number_of_guests}
                    </p>

                    <p>
                        Booking Status:
                        {viewBooking.booking_status}
                    </p>

                    <button onClick={() => setViewBooking(null)}>Close</button>

                </div>

            )}

        </div>
    );
}

export default HotelBooking;