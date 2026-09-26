import { useState,useEffect } from "react";
import axios from "axios";

function VehicleBooking()
{
    const[vehicleBooking,setVehicleBooking]=useState({
        "vehicle_id":"",
        "customer_name":"",
        "phone":"",
        "booking_date":"",
        "booking_status":"",
    })

    const[vehicleBookings,setVehicleBookings]=useState([]);
    const[editId,setEditId]=useState(null);
    const[errors,setErrors]=useState({});
    const[vehicles,setVehicles]=useState([]);

    const V_URL="http://127.0.0.1:8000/api/vehicle";
    const URL="http://127.0.0.1:8000/api/vehicle-booking";

    const handleChange=(e)=>{
        setVehicleBooking({
            ...vehicleBooking,
            [e.target.name]:e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name]:null
        })
    }

    const getAllVehicles=async()=>{
        const response=await axios.get(V_URL);
        setVehicles(response.data);
    }

    const getAllVehicleBookings=async()=>{
        const response=await axios.get(URL);
        setVehicleBookings(response.data);
    }

    useEffect(()=>{
        getAllVehicleBookings();
        getAllVehicles();
    },[]);

    const getSingleVehicleBooking=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setVehicleBooking(response.data);
        setEditId(id);
    }

    const addVehicleBooking=async()=>{
        await axios.post(URL,vehicleBooking);
        alert("VehicleBooking is added");
    }

    const updateVehicleBooking=async()=>{
        await axios.put(`${URL}/${editId}`,vehicleBooking);
        alert("VehicleBooking Updated");
    }

    const deleteVehicleBooking=async(id)=>{
        const confirmDelete=window.confirm("Delete Booking?");
        if(!confirmDelete)
        {
            return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            getAllVehicleBookings();
            alert("Booking deleted");
        }
    }

    const clearForm=()=>{
        setVehicleBooking({
        "vehicle_id":"",
        "customer_name":"",
        "phone":"",
        "booking_date":"",
        "booking_status":"",
        })
        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};
        if(!vehicleBooking.vehicle_id)
        {
            newErrors.vehicle_id=["vehicle_id is required"];
        }

         if(!vehicleBooking.customer_name)
        {
            newErrors.customer_name=["customer_name is required"];
        }

         if(!vehicleBooking.phone)
        {
            newErrors.phone=["phone is required"];
        }

         if(!vehicleBooking.booking_date)
        {
            newErrors.booking_date=["booking_date is required"];
        }

         if(!vehicleBooking.booking_status)
        {
            newErrors.booking_status=["booking_status is required"];
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length===0;
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!validateForm())
        {
            return;
        }

        try{
            if(editId===null)
            {
                await addVehicleBooking();
            }
            else{
                await updateVehicleBooking();
                setEditId(null)
            }
            await getAllVehicleBookings();
            clearForm();
        }
        catch(error){
            if(error.response && error.response.status===422)
            {
               setErrors(error.response.data.errors);
            }
            else{
                alert("Something Went Wrong");
            }
        }
    }

    return(
        <div style={{width:"1000px", margin:"110px auto"}}>

            <form onSubmit={handleSubmit}>
                <h1>Vehicle Booking Form</h1>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Select Vehicle Number</label>
                   <select name="vehicle_id" value={vehicleBooking.vehicle_id} onChange={handleChange}>
                    <option value="">Select Vehicle Number</option>
                    {vehicles.map((item)=>{
                        return(
                            <option key={item.vehicle_id} value={item.vehicle_id}>{item.vehicle_number}</option>
                        )
                    })}
                   </select>
                        <span style={{color:"red"}}>{errors.vehicle_id?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Customer Name:</label>
                    <input type="text" name="customer_name" value={vehicleBooking.customer_name} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.customer_name?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Phone</label>
                    <input type="text" name="phone" value={vehicleBooking.phone} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.phone?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Booking Date:</label>
                    <input type="date" name="booking_date" value={vehicleBooking.booking_date} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.booking_date?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Booking Status:</label>
                    <select name="booking_status" value={vehicleBooking.booking_status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <span style={{color:"red"}}>{errors.booking_status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>

                <table border="1" cellPadding="2">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Vehicle ID</th>
                            <th>Vehicle Number</th>
                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Booking Date</th>
                            <th>Booking Status</th>
                            <th>Action</th>
                        </tr>

                      
                    </thead>

                      <tbody>
                            {vehicleBookings.map((item)=>{
                              return(
                                  <tr key={item.booking_id}>
                                    <td>{item.booking_id}</td>
                                    <td>{item.vehicle_id}</td>
                                    <td>{item.vehicle?item.vehicle.vehicle_number:""}</td>
                                    <td>{item.customer_name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.booking_date}</td>
                                    <td>{item.booking_status}</td>
                                    <td>
                                        <button type="button" onClick={()=>getSingleVehicleBooking(item.booking_id)}>Edit</button>
                                        <button type="button" onClick={()=>{deleteVehicleBooking(item.booking_id)}}>Delete</button>
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

export default VehicleBooking;