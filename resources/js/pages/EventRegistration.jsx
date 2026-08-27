import { useState,useEffect } from "react";
import axios from "axios";

function EventRegistrationForm()
{
    const[eventRegistration,SetEventRegistration]=useState({
        "event_id":"",
        "participant_name":"",
        "email":"",
        "phone":"",
        "registration_date":"",
        "registration_status":""
    })

    const[eventRegistrations,SetEventRegistrations]=useState([]);
    const[editId,setEditId]=useState(null);
    const[events,setEvents]=useState([]);
    const[errors,setErrors]=useState({});

    const EVENT_URL="http://127.0.0.1:8000/api/event";
    const URL="http://127.0.0.1:8000/api/event-registration";

    const handleChange=(e)=>{

        SetEventRegistration({
            ...eventRegistration,
            [e.target.name]:e.target.value
        })
        setErrors({
           ...errors,
           [e.target.name]:null
        })
    }

    const getAllEvents=async()=>{
        const response=await axios.get(EVENT_URL);
        setEvents(response.data);
    }

    const getAllEventRegistrations=async()=>{
        const response=await axios.get(URL);
        SetEventRegistrations(response.data);
    }

    const getSingleEventRegistration=async(id)=>{
        const response= await axios.get(`${URL}/${id}`);
        SetEventRegistration(response.data);
        setEditId(id);

    }

    useEffect(()=>{
        getAllEvents();
        getAllEventRegistrations();
    },[]);

    const addEventRegistration=async()=>{
        await axios.post(URL,eventRegistration);
        alert("Event Registration Added");
    }

    const updateEventRegistration=async()=>{
        await axios.put(`${URL}/${editId}`,eventRegistration);
        alert("Event Registration Updated");
    }

    const deleteEventRegistration=async(id)=>{
        const confirmDelete=window.confirm("Delete Confirm?");

        if(!confirmDelete)
        {
            return;
        }

        else{
            await axios.delete(`${URL}/${id}`);
            alert("Event Registration Deleted");
            await getAllEventRegistrations();
        }
    }

    const clearForm=()=>{
        SetEventRegistration({
        "event_id":"",
        "participant_name":"",
        "email":"",
        "phone":"",
        "registration_date":"",
        "registration_status":""
        });

        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};

        if(!eventRegistration.event_id)
        {
            newErrors.event_id=["event_id is required"];
        }

          if(!eventRegistration.participant_name)
        {
            newErrors.participant_name=["participant_name is required"];
        }

          if(!eventRegistration.email)
        {
            newErrors.email=["email is required"];
        }

          if(!eventRegistration.phone)
        {
            newErrors.phone=["phone is required"];
        }

          if(!eventRegistration.registration_date)
        {
            newErrors.registration_date=["registration_date is required"];
        }

          if(!eventRegistration.registration_status)
        {
            newErrors.registration_status=["registration_status is required"];
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
            await addEventRegistration();
        }

        else{
            await updateEventRegistration();
        }

        await getAllEventRegistrations();
        clearForm();
        }

        catch(error)
        {
            if(error.response && error.response.status===422)
                setErrors(error.response.data.errors);

            else{
                alert("Something Went Wrong");
            }
        }
    }

    return(
        <div style={{width:"1000px", margin:"30px auto"}}>

            <form onSubmit={handleSubmit}>

                <h1>Event Registration Form</h1>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}> Select Event:</label>
                    <select name="event_id" value={eventRegistration.event_id} onChange={handleChange}>
                        <option value="">Select Event</option>
                       {events.map((item)=>{
                        return(
                            <option key={item.event_id} value={item.event_id}>{item.event_name}</option>
                        )
                       })}
                    </select>

                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Event ID:</label>
                    <input type="number" name="event_id" value={eventRegistration.event_id} onChange={handleChange} />

                    <span style={{color:"red"}}>{errors.event_id?.[0]}</span>

                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Participant Name:</label>
                    <input type="text" name="participant_name" value={eventRegistration.participant_name} onChange={handleChange} />

                    <span style={{color:"red"}}>{errors.participant_name?.[0]}</span>

                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Email:</label>
                    <input type="email" name="email" value={eventRegistration.email} onChange={handleChange} />

                    <span style={{color:"red"}}>{errors.email?.[0]}</span>

                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Phone:</label>
                    <input type="text" name="phone" value={eventRegistration.phone} onChange={handleChange} />

                    <span style={{color:"red"}}>{errors.phone?.[0]}</span>

                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Registation Date:</label>
                    <input type="date" name="registration_date" value={eventRegistration.registration_date} onChange={handleChange} />

                    <span style={{color:"red"}}>{errors.registration_date?.[0]}</span>

                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Registarion Status:</label>
                    <select name="registration_status" value={eventRegistration.registration_status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <span style={{color:"red"}}>{errors.registration_status?.[0]}</span>

                </p>

                

                
                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    &nbsp;
                    <button type="button"onClick={clearForm}>Clear</button>
                </p>
            </form>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>

                        <th>Registration ID</th>
                        <th>Event ID</th>
                         <th>Event Name</th>
                    
                        <th>Participitant Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Registration Date</th>
                        <th>Registration Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {eventRegistrations.map((item)=>{
                        return(
                            <tr key={item.registration_id}>
                                <td>{item.registration_id}</td>
                                <td>{item.event_id}</td>

                                <td>{item.events?item.events.event_name:""}</td>


                                <td>{item.participant_name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.registration_date}</td>
                                <td>{item.registration_status}</td>

                                <td>
                                    <button type="button" onClick={()=>{getSingleEventRegistration(item.registration_id)}}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>{deleteEventRegistration(item.registration_id)}}>Delete</button>
                                    
                                </td>

                            </tr>
                        ) //<td>{item.events?item.events.event_name:""}</td> -->'events' coming from EventRegistration Model
                    })}
                </tbody>
            </table>

          

        </div>
    )

}

export default EventRegistrationForm;