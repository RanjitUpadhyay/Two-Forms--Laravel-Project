import { useState, useEffect } from "react";
import axios from "axios";

function HostelPayment() {
    const [payment, setPayment] = useState({
        booking_id: "",
        payment_status: "",
        payment_mode: "",
        total_bill: ""
    })

    const [payments, setPayments] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const [bookings, setBookings] = useState([]);

    const URL = "http://127.0.0.1:8000/api/hostel/payment";
    const BOOKING_URL = "http://127.0.0.1:8000/api/hostel/booking";

    const handleChange = (e) => {
        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const getAllBookings = async () => {
        const response = await axios.get(BOOKING_URL);
        setBookings(response.data);
    }

    const getAllPayments = async () => {
        const response = await axios.get(URL);
        setPayments(response.data);
    }

    useEffect(()=>{
        getAllBookings();
        getAllPayments();
    },[])

    const getSinglePayment = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setPayment(response.data);
        setEditId(id);
    }

    const addPayment = async () => {
        await axios.post(URL, payment);
        alert("Payment Added");
    }

    const updatePayment = async () => {
        await axios.put(`${URL}/${editId}`, payment);
        alert("Payment Updated");
    }

    const deletePayment = async (id) => {
        const confirmDelete = window.confirm("Delete Booking?");

        if (!confirmDelete) { return; }
        else {
            await axios.delete(`${URL}/${id}`);
            alert("Payment Deleted");
            getAllPayments();
        }
    }

    const validateForm = () => {
        let newErrors = {};

        if (!payment.booking_id) {
            newErrors.booking_id = ["Booking ID is required"];
        }

        if (!payment.payment_status) {
            newErrors.payment_status = ["Payment Status is required"];
        }

        if (!payment.payment_mode) {
            newErrors.payment_mode = ["Payment Mode is required"];
        }

        if (!payment.total_bill) {
            newErrors.total_bill = ["Total is required"];
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length == 0;
    }

    const clearForm = () => {
        setPayment({
            booking_id: "",
            payment_status: "",
            payment_mode: "",
            total_bill: ""
        });
        setEditId(null);
        setErrors({});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (editId === null) {
            await addPayment();
        }

        else {
            await updatePayment();
            setEditId(null);
        }

        await getAllPayments();
        clearForm();
    }

    return (
        <div style={{ width: "1000px", margin: "30px auto" }}>

            <form onSubmit={handleSubmit}>
                <h1>Payment Form</h1>

                <p>
                    <label>Booking ID:</label>
                    <select name="booking_id" value={payment.booking_id} onChange={handleChange}>
                        <option value="">Select Booking</option>
                        {bookings.map((item) => {
                            return (
                                <option key={item.booking_id} value={item.booking_id}>{item.booking_id} {"-"} {item.name}</option>
                            )
                        })}
                       
                    </select>

                     <span style={{ color: "red" }}>{errors.booking_id?.[0]}</span>

                </p>

                <p>
                    <label>Payment Status:</label>
                    <select name="payment_status" value={payment.payment_status} onChange={handleChange}>
                        <option value="">Select Payment Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                    </select>

                    <span style={{ color: "red" }}>{errors.payment_status?.[0]}</span>
                </p>

                <p>
                    <label>Payment Mode:</label>
                    <select name="payment_mode" value={payment.payment_mode} onChange={handleChange}>
                        <option value="">Select Payment Mode</option>
                        <option value="upi">UPI</option>
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                        <option value="net_banking">Net Banking</option>
                    </select>

                    <span style={{ color: "red" }}>{errors.payment_mode?.[0]}</span>
                </p>

                <p>
                    <label >Total Bill:</label>
                    <input type="text" name="total_bill" value={payment.total_bill} onChange={handleChange} />

                    <span style={{ color:"red" }}>{errors.total_bill?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId == null ? "Save" : "Update"}</button>
                    &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>

                <hr />

                <table border="1" cellPadding="8">

                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Booking ID</th>
                            <th>Guest Name</th>
                            <th>Payment Status</th>
                            <th>Payment Mode</th>
                            <th>Total Bill</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((item) => {
                            const booking = bookings.find((b) =>
                                b.booking_id == item.booking_id)

                            return (
                                <tr key={item.payment_id}>
                                    <td>{item.payment_id}</td>
                                    <td>{item.booking_id}</td>

                                    <td>{booking ? booking.name : ""}</td>

                                    <td>{item.payment_status}</td>
                                    <td>{item.payment_mode}</td>
                                    <td>{item.total_bill}</td>

                                    <td>
                                        <button type="button" onClick={() => getSinglePayment(item.payment_id)}>Edit</button>
                                        &nbsp;
                                        <button type="button" onClick={() => deletePayment(item.payment_id)}>Delete</button>
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

export default HostelPayment;