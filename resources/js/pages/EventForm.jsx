import { useState,useEffect } from "react";
import axios from "axios";

function EventForm()
{
    const[event,setEvent]=useState({
        "event_name":"",
        "event_date":"",
        "venue_organizer":"",
        "event_status":""
    })

    const[events,setEvents]=useState([]);
    const[editId,setEditId]=useState(null);
    const[view,setView]=useState(null);
    const[errors,setErrors]=useState({});

    const URL="http://127.0.0.1:8000/api/event";

    const handleChange=(e)=>{

        setEvent({
            ...event,
            [e.target.name]:e.target.value
        })
        setErrors({
           ...errors,
           [e.target.name]:null
        })
    }

    const viewEvent=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setView(response.data);
    }

    const getAllEvents=async()=>{
        const response=await axios.get(URL);
        setEvents(response.data);
    }

    const getSingleEvent=async(id)=>{
        const response= await axios.get(`${URL}/${id}`);
        setEvent(response.data);
        setEditId(id);

    }

    useEffect(()=>{
        getAllEvents();
    },[]);

    const addEvent=async()=>{
        await axios.post(URL,event);
        alert("Event Added");
    }

    const updateEvent=async()=>{
        await axios.put(`${URL}/${editId}`,event);
        alert("Event Updated");
    }

    const deleteEvent=async(id)=>{
        const confirmDelete=window.confirm("Delete Confirm?");

        if(!confirmDelete)
        {
            return;
        }

        else{
            await axios.delete(`${URL}/${id}`);
            alert("Event Deleted");
            await getAllEvents();
        }
    }

    const clearForm=()=>{
        setEvent({
        "event_name":"",
        "event_date":"",
        "venue_organizer":"",
        "event_status":""
        });

        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};

        if(!event.event_name)
        {
            newErrors.event_name=["event_name is required"];
        }

          if(!event.event_date)
        {
            newErrors.event_date=["event_date is required"];
        }

          if(!event.venue_organizer)
        {
            newErrors.venue_organizer=["venue_organizer is required"];
        }

          if(!event.event_status)
        {
            newErrors.event_status=["event_status is required"];
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
            await addEvent();
        }

        else{
            await updateEvent();
        }

        await getAllEvents();
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

                <h1>Event Form</h1>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Event Name:</label>
                    <input type="text" name="event_name" value={event.event_name} onChange={handleChange} />

                    <span style={{color:"red"}}>{errors.event_name?.[0]}</span>

                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Event Date:</label>
                    <input type="date" name="event_date" value={event.event_date} onChange={handleChange} />

                    <span style={{color:"red"}}>{errors.event_date?.[0]}</span>

                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Venue Organizer:</label>
                    <input type="text" name="venue_organizer" value={event.venue_organizer} onChange={handleChange} />

                    <span style={{color:"red"}}>{errors.venue_organizer?.[0]}</span>

                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Event Name:</label>
                   <select name="event_status" value={event.event_status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="compeleted">Completed</option>
                    <option value="cancelled">Cancelled</option>
                   </select>

                    <span style={{color:"red"}}>{errors.event_status?.[0]}</span>

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
                        <th>ID</th>
                        <th>Event Name</th>
                        <th>Event Date</th>
                        <th>Venue Organizer</th>
                        <th>Event Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {events.map((item)=>{
                        return(
                            <tr key={item.event_id}>
                                <td>{item.event_id}</td>
                                <td>{item.event_name}</td>
                                <td>{item.event_date}</td>
                                <td>{item.venue_organizer}</td>
                                <td>{item.event_status}</td>

                                <td>
                                    <button type="button" onClick={()=>{getSingleEvent(item.event_id)}}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>{deleteEvent(item.event_id)}}>Delete</button>
                                     &nbsp;
                                    <button type="button" onClick={()=>{viewEvent(item.event_id)}}>View</button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {view && ( <div>

                <h2>Event Details</h2>
                <p>
                    ID:{" "}{view.event_id}
                </p>

                <p>
                    event_name:{" "}{view.event_name}
                </p>

                <p>
                    event_date:{" "}{view.event_date}
                </p>

                <p>
                    venue_organizer:{" "}{view.venue_organizer}
                </p>

                <p>
                    event_status:{" "}{view.event_status}
                </p>

                <p>
                    <button type="button" onClick={()=>setView(null)}>Close</button>
                </p>
            </div>

            )}

        </div>
    )

}

export default EventForm;