import { useState, useEffect } from "react";
import axios from "axios";

function LodgePayment() {
    const [payment, setPayment] = useState({
        booking_id: "",
        payment_mode: "",
        payment_status: "",
        total_amount: ""
    });

    const [payments, setPayments] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const [bookings, setBookings] = useState([]);

    const URL = "http://127.0.0.1:8000/api/lodge/payment";
    const Booking_URL = "http://127.0.0.1:8000/api/lodge/booking";

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

    const getAllBookings = async () => {
        const response = await axios.get(Booking_URL);
        setBookings(response.data);
    };

    useEffect(() => {
        getAllBookings();
        getAllPayments();
    }, []);

    const getSinglePayment = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setPayment(response.data);
        setEditId(id)
    };

    const addPayment = async () => {
        await axios.post(URL, payment);
        alert("Payment Added");
    }

    const updatePayment = async () => {
        await axios.put(`${URL}/${editId}`,payment);
        alert("Payment Updated")
    };

    const deletePayment = async (id) => {
        const confirmDelete = window.confirm("Delete Payment");
        if (!confirmDelete) { return; }
        else {
            await axios.delete(`${URL}/${id}`);
            alert("Payment Deleted");
            await getAllPayments();
        }
    }

    const clearForm = () => {
        setPayment({
            booking_id: "",
            payment_mode: "",
            payment_status: "",
            total_amount: ""
        })

        setEditId(null);
        setErrors({});
    }

    const ValidateForm = () => {
        let newErrors = {};

        if (!payment.booking_id) {
            newErrors.booking_id = ["Booking ID is required"];
        }
        if (!payment.payment_mode) {
            newErrors.payment_mode = ["Payment Mode is required"];
        }
        if (!payment.payment_status) {
            newErrors.payment_status = ["Payment Status is required"];
        }
        if (!payment.total_amount) {
            newErrors.total_amount = ["Total Bill is required"];
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ValidateForm()) {
            return;
        }

        try {
            if (editId === null) {
                await addPayment();
            }
            else {
                await updatePayment();
                
            }

            await getAllPayments();
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
                <h1>Payment Form</h1>

                <div style={{marginBottom:"15px"}}>
                    <label style={{width:"100px", display:"inline-block"}}>Bookings:</label>
                    <select name="booking_id"  value={payment.booking_id} onChange={handleChange}>
                        <option value="">Select Booking</option>
                        {bookings.map((item)=>{
                            return(
                <option  key={item.booking_id}  value={item.booking_id}> {item.booking_id} {"-"} {item.name}  </option>
                            );
                        })}
                    </select>

                    <div style={{color:"red", marginLeft:"110px"}}>{errors.booking_id?.[0]}</div>

                </div>

                <div style={{marginBottom:"15px"}}>
                    <label style={{width:"110px", display:"inline-block"}}>Payment Mode:</label>
                    <select name="payment_mode" value={payment.payment_mode} onChange={handleChange}>
                        <option value="">select payment mode</option>
                        <option value="cash">Cash</option>
                        <option value="upi">UPI</option>
                        <option value="card">Card</option>
                        <option value="net_banking">Net Banking</option>
                    </select>

                    <div style={{color:"red",marginLeft:"110px"}}>{errors.payment_mode?.[0]}</div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <label style={{width:"110px", display:"inline-block"}}>Payment Status:</label>
                    <select name="payment_status" value={payment.payment_status} onChange={handleChange}>
                        <option value="">select payment status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                    </select>

                    <div style={{color:"red", marginLeft:"110px"}}>{errors.payment_status?.[0]}</div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <label style={{width:"110px", display:"inline-block"}}>Total Amount:</label>
                    <input type="number" name="total_amount" value={payment.total_amount} onChange={handleChange} />
                </div>

                <div style={{color:"red", marginLeft:"110px"}}>{errors.total_amount?.[0]}</div>

                <p>
                    <button type="submit">{editId===null? "Save" : "Update"}</button>
                    &nbsp; &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>

            </form>

            <hr />

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Booking ID</th>
                        <th>Guest Name</th>
                        <th>Payment Mode</th>
                        <th>Payment Status</th>
                        <th>Total Bill</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map((item)=>{
                        const booking=bookings.find((b)=>
                        b.booking_id==item.booking_id
                    );

                    return(
                            <tr key={item.payment_id}>
                                <td>{item.payment_id}</td>
                                <td>{item.booking_id}</td>

                                <td>{booking ? booking.name : ""}</td>

                                <td>{item.payment_mode}</td>
                                <td>{item.payment_status}</td>
                                <td>{item.total_amount}</td>

                                <td>
                                    <button type="button" onClick={()=>getSinglePayment(item.payment_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deletePayment(item.payment_id)}>Delete</button>
                                </td>

                            </tr>
                    )
                    })}
                </tbody>

            </table>

        </div>
    )
}

export default LodgePayment;