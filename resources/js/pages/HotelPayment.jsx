import { useState, useEffect } from "react";
import axios from "axios";

function HotelPayment() {

    const [payment, setPayment] = useState({
        booking_id: "",
        payment_mode: "",
        payment_status: "",
        total_amount: ""
    });

    const [payments, setPayments] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const [bookings, setBookings] = useState([]); //here it is not primarily for displaying the booking list.

    const URL = "http://127.0.0.1:8000/api/payment";

    const BOOKING_URL = "http://127.0.0.1:8000/api/booking";


    const handleChange = (e) => {

        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    };


    const getAllPayments = async () => {

        const response = await axios.get(URL);

        setPayments(response.data);
    };

    //HotelBooking
    const getAllBookings = async () => {

        const response =
            await axios.get(BOOKING_URL);// Here we used URL=BOOKING_URL

        setBookings(response.data);
    };


    useEffect(() => {   //It is used when you want React to perform something after the component is rendered.

        getAllPayments();

        getAllBookings();

    }, []);

    const getSinglePayment = async (id) => {

        const response =
            await axios.get(`${URL}/${id}`);

        setPayment(response.data);

        setEditId(id);
    };


    const addPayment = async () => {
        await axios.post(URL, payment);

        alert("Payment Added");
    };


    const updatePayment = async () => {
        await axios.put(`${URL}/${editId}`, payment);

        alert("Payment Updated");
    };


    const deletePayment = async (id) => {

        const confirmDelete =
            window.confirm("Delete payment?");

        if (!confirmDelete) {
            return;
        }

        else {
            await axios.delete(`${URL}/${id}`);

            alert("Payment Deleted");
        }
    };






    const clearForm = () => {

        setPayment({
            booking_id: "",
            payment_mode: "",
            payment_status: "",
            total_amount: ""
        });

        setEditId(null);
        setErrors({});
    };


    const validateForm = () => {

        let newErrors = {};

        if (!payment.booking_id) {

            newErrors.booking_id =
                ["Booking is required"];
        }

        if (!payment.payment_mode) {

            newErrors.payment_mode =
                ["Payment mode is required"];
        }

        if (!payment.payment_status) {

            newErrors.payment_status =
                ["Payment status is required"];
        }

        if (!payment.total_amount) {

            newErrors.total_amount =
                ["Total amount is required"];
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {

            if (editId === null) {

                await addPayment();

            } else {

                await updatePayment();
            }

            clearForm();

            await getAllPayments();

        } catch (error) {

            if (
                error.response &&
                error.response.status === 422
            ) {

                setErrors(
                    error.response.data.errors
                );

            } else {

                alert("Something went wrong");
            }
        }
    };


    return (

        <div style={{
            width: "700px",
            margin: "30px auto"
        }}>

            <form onSubmit={handleSubmit}>

                <h1>Hotel Payment Form</h1>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Booking*:
                    </label>

                    <select
                        name="booking_id"
                        value={payment.booking_id}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Booking
                        </option>

                        {bookings.map((item) => {  //Take every booking from the bookings array and create one <option> for it.

                            return (

                                <option
                                    key={item.booking_id}  //This is for React.React requires a unique key when you create multiple elements using map().
                                    value={item.booking_id}//value={item.booking_id}. This is for the HTML <select></select>
                                >
                                    {item.booking_id}
                                    {" - "}
                                    {item.guest_name}
                                </option>

                            );          //key={item.booking_id}-
                            //React needs a unique key to identify each <option> when you create multiple options using map().
                        })}


                    </select>

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.booking_id?.[0]}
                    </div>

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Payment Mode*:
                    </label>

                    <select
                        name="payment_mode"
                        value={payment.payment_mode}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Payment Mode
                        </option>

                        <option value="Cash">
                            Cash
                        </option>

                        <option value="UPI">
                            UPI
                        </option>

                        <option value="Net Banking">
                            Net Banking
                        </option>

                        <option value="Card">
                            Card
                        </option>

                    </select>

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.payment_mode?.[0]}
                    </div>

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Payment Status*:
                    </label>

                    <select
                        name="payment_status"
                        value={payment.payment_status}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Payment Status
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Paid">
                            Paid
                        </option>

                        <option value="Refunded">
                            Refunded
                        </option>

                    </select>

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.payment_status?.[0]}
                    </div>

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label style={{
                        display: "inline-block",
                        width: "150px"
                    }}>
                        Total Amount*:
                    </label>

                    <input
                        type="text"
                        name="total_amount"
                        value={payment.total_amount}
                        onChange={handleChange}
                    />

                    <div style={{
                        color: "red",
                        marginLeft: "150px"
                    }}>
                        {errors.total_amount?.[0]}
                    </div>

                </div>


                <p>

                    <button type="submit">{editId == null ? "Save" : "Update"}</button>

                    &nbsp;&nbsp;

                    <button type="button" onClick={clearForm}>Clear</button>

                </p>

                <hr />

            </form>


            <h2>Payment List</h2>


            <table border="1" cellPadding="8">

                <thead>

                    <tr>

                        <th>Payment ID</th>
                        <th>Booking ID</th>
                        <th>Guest</th>
                        <th>Mode</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {payments.map((item) => {

                        const booking =
                            bookings.find((b) =>
                                    b.booking_id ==
                                    item.booking_id
                            );

                        return (

                            <tr key={item.payment_id}>

                                <td>
                                    {item.payment_id}
                                </td>

                                <td>
                                    {item.booking_id}
                                </td>

                                <td> {booking ? booking.guest_name : ""}</td>

                                <td>
                                    {item.payment_mode}
                                </td>

                                <td>
                                    {item.payment_status}
                                </td>

                                <td>
                                    {item.total_amount}
                                </td>

                                <td>

                                    <button onClick={() => getSinglePayment(item.payment_id)}>Edit</button>

                                    &nbsp;&nbsp;

                                    <button onClick={() => deletePayment(item.payment_id)}>Delete</button>

                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </div>
    );
}

export default HotelPayment;