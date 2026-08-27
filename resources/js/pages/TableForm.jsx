import { useState,useEffect } from "react";
import axios from "axios";

function TableForm()
{
    const[table,setTable]=useState({
         "table_number":"",
        "capacity":"",
        "table_status":""
    });

    const[tables,setTables]=useState([]);
    const[editId,setEditId]=useState(null);
    const[view,setView]=useState(null);
    const[errors,setErrors]=useState({});

    const URL="http://127.0.0.1:8000/api/table";

    const handleChange=(e)=>{
        setTable({
            ...table,
            [e.target.name]:e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]:null
        });
    };

    const viewTable=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setView(response.data);
    };

    const getAllTables=async()=>{
        const response=await axios.get(URL);
        setTables(response.data);
    };

    useEffect(()=>{
        getAllTables();
    },[]);

    const getSingleTable=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setTable(response.data);
        setEditId(id);
    };

    const addTable=async()=>{
        await axios.post(URL,table);
        alert("Table Added");
    };

    const updateTable=async()=>{
        await axios.put(`${URL}/${editId}`, table);
        alert("Table Updated");
    };

    const deleteTable=async(id)=>{
        const confirmDelete=window.confirm("Delete Table?");

        if(!confirmDelete)
        {
            return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            alert("Table Deleted");
            getAllTables();
        }
    };

    const clearForm=()=>{
        setTable({
        "table_number":"",
        "capacity":"",
        "table_status":"" 
        });
        setEditId(null);
        setErrors({});
    };

    const validateForm=()=>{
        let newErrors={};

        if(!table.table_number)
        {
            newErrors.table_number=["table_number is required"];
        }

         if(!table.capacity)
        {
            newErrors.capacity=["capacity is required"];
        }

         if(!table.table_status)
        {
            newErrors.table_status=["table_status is required"];
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
                await addTable();
            }
            else{
                await updateTable();
                setEditId(null);
            }
            await getAllTables();
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
        <div style={{width:"1000px", margin:"30px auto"}}>

            <form onSubmit={handleSubmit}>
                <h1>Table Form</h1>
                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Table Number:</label>
                    <input type="text" name="table_number" value={table.table_number} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.table_number?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Capacity:</label>
                    <input type="text" name="capacity" value={table.capacity} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.capacity?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Table Status:</label>
                   <select name="table_status" value={table.table_status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Unavailable">Unavailable</option>
                   </select>
                    <span style={{color:"red"}}>{errors.table_status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    &nbsp;
                    <button type="button" onClick={()=>clearForm}>Clear</button>
                </p>

                <table border="1" cellPadding="5">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Table Number</th>
                            <th>Capacity</th>
                            <th>Table Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tables.map((item)=>{
                            return(
                                <tr key={item.table_id}>
                                    <td>{item.table_id}</td>
                                    <td>{item.table_number}</td>
                                    <td>{item.capacity}</td>
                                    <td>{item.table_status}</td>

                                    <td>
                                        <button type="button" onClick={()=>getSingleTable(item.table_id)}>Edit</button>
                                        &nbsp;
                                        <button type="button" onClick={()=>deleteTable(item.table_id)}>Delete</button>
                                        &nbsp;
                                        <button type="button" onClick={()=>viewTable(item.table_id)}>View</button>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </form>

            {view && <div>
                <h2>Table Details</h2>
               <p>
                 ID:{view.table_id}
               </p>

               <p>
                Table Number:{view.table_number}
               </p>

               <p>
                Capacity:{view.capacity};
               </p>

               <p>
                Table Status:{view.table_status}               
                
                </p>

                <p>
                    <button type="button" onClick={()=>setView(null)}>Close</button>
                </p>

            </div>
            }

        </div>
    )
}

export default TableForm;