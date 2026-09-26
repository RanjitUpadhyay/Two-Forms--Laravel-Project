import { useState,useEffect } from "react";
import axios from "axios";

function VehicleForm()
{
    const[vehicle,setVehicle]=useState({
        "vehicle_number":"",
        "vehicle_type":"",
        "brand":"",
        "model":"",
        "status":""
    })

    const[vehicles,setVehicles]=useState([]);
    const[editId,setEditId]=useState(null);
    const[errors,setErrors]=useState({});
    const[view,setView]=useState(null);

    const URL="http://127.0.0.1:8000/api/vehicle";

    const handleChange=(e)=>{
        setVehicle({
            ...vehicle,
            [e.target.name]:e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name]:null
        })
    }

    const viewVehicle=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setView(response.data);
    }

    const getAllVehicles=async()=>{
        const response=await axios.get(URL);
        setVehicles(response.data);
    }

    useEffect(()=>{
        getAllVehicles();
    },[])

    const getSingleVehicle=async(id)=>{
        const response=await axios(`${URL}/${id}`);
        setVehicle(response.data);
        setEditId(id);
    }

    const addVehicle=async()=>{
        await axios.post(URL,vehicle);
        alert("Vehicle Added");
    }

    const updateVehicle=async()=>{
        await axios.put(`${URL}/${editId}`,vehicle);
        alert("Vehicle Updated");
    }

    const deleteVehicle=async(id)=>{
        const confirmDelete=window.confirm("Delete Vehicle?");
        if(!confirmDelete)
        {
            return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            getAllVehicles();
        }
    }

    const clearForm=()=>{
        setVehicle({
        "vehicle_number":"",
        "vehicle_type":"",
        "brand":"",
        "model":"",
        "status":""
        })
        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};

        if(!vehicle.vehicle_number){
            newErrors.vehicle_number=["vehicle_number is required"]
        }

        if(!vehicle.vehicle_type){
            newErrors.vehicle_type=["vehicle_type is required"]
        }

        if(!vehicle.brand){
            newErrors.brand=["brand is required"]
        }

        if(!vehicle.model){
            newErrors.model=["model is required"]
        }

        if(!vehicle.status){
            newErrors.status=["status is required"]
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
                await addVehicle();
            }
            else{
                await updateVehicle();
                setEditId(null)
            }
            await getAllVehicles();
            clearForm()
        }
        catch(error)
        {
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
        <div style={{width:"1000px", margin:"50px auto"}}>

            <form onSubmit={handleSubmit}>
                <h1>Vehicle Form</h1>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Vehicle Number:</label>
                    <input type="text" name="vehicle_number" value={vehicle.vehicle_number} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.vehicle_number?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Vehicle Type:</label>
                    <label htmlFor="two_wheeler">
                       <input type="radio" name="vehicle_type" id="two_wheeler" value="two_wheeler" checked={vehicle.vehicle_type==="two_wheeler"} onChange={handleChange}/>
                    Two Wheerler</label> &nbsp; &nbsp;

                   <label htmlFor="four_wheeler">
                     <input type="radio" name="vehicle_type" id="four_wheeler" value="four_wheeler" checked={vehicle.vehicle_type==="four_wheeler"} onChange={handleChange} /> 
                   Four Wheeler</label>
                  
                    <span style={{color:"red"}}>{errors.vehicle_type?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Vehicle Brand:</label>
                    <input type="text" name="brand" value={vehicle.brand} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.brand?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Vehicle Model:</label>
                    <input type="text" name="model" value={vehicle.model} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.model?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"110px", display:"inline-block"}}>Vehicle Status:</label>
                    <label htmlFor="available">
                        <input type="radio" name="status" id="available" value="available" checked={vehicle.status=="available"} onChange={handleChange} />
                    Available</label> &nbsp; &nbsp;

                     <label htmlFor="unavailable">
                        <input type="radio" name="status" id="unavailable" value="unavailable" checked={vehicle.status=="unavailable"} onChange={handleChange} />
                    Unavailable</label>
                    <span style={{color:"red"}}>{errors.status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>
            </form>

            <table border="1" cellPadding="3">

                <thead>
                    <tr>
                        <th>Vehicle ID</th>
                        <th>Vehicle Number</th>
                        <th>Vehicle Type</th>
                        <th>Vehicle Brand</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {vehicles.map((item)=>{
                        return(
                            <tr key={item.vehicle_id}>
                                <td>{item.vehicle_id}</td>
                                <td>{item.vehicle_number}</td>
                                <td>{item.vehicle_type}</td>
                                <td>{item.brand}</td>
                                <td>{item.model}</td>
                                <td>{item.status}</td>

                                <td>
                                    <button type="button" onClick={()=>{getSingleVehicle(item.vehicle_id)}}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteVehicle(item.vehicle_id)}>Delete</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>viewVehicle(item.vehicle_id)}>View</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

            {view && (
                <div>
                    <p>
                        Vehicle ID:{view.vehicle_id}

                    </p>

                     <p>
                        Vehicle Number:{view.vehicle_number}
                        
                    </p>

                     <p>
                        Vehicle Type:{view.vehicle_type}
                        
                    </p>

                     <p>
                        Vehicle Brand:{view.brand}
                        
                    </p>

                     <p>
                        Vehicle Model:{view.model}
                        
                    </p>

                     <p>
                        Vehicle Status:{view.status}
                        
                    </p>

                    <p>
                        <button type="button" onClick={()=>setView(null)}>Close</button>
                    </p>
                </div>
            )}

        </div>
    )


}

export default VehicleForm;