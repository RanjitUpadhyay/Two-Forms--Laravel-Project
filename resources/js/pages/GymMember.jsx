import { useState,useEffect } from "react";
import axios from "axios";

function GymMember()
{
    const[gymMember,setGymMember]=useState({
        "memeber_name":"",
        "email":"",
        "Phone":"",
        "DOB":"",
        "gender":"",
        "address":"",
        "member_status":""
    })

    const[gymMembers,setGymMembers]=useState([]);
    const[editId,setEditId]=useState(null);
    const[errors,setErrors]=useState({});
    const[view,setView]=useState(null);

    const URL="http://127.0.0.1:8000/api/gym-member";

    const handleChange=(e)=>{
        setGymMember({
            ...gymMember,
            [e.target.name]:e.target.value
        })

        setErrors({
            ...errors,
           [e.target.name]:null
        })
    }

    const viewGymMember=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setView(response.data);
    }

    const getAllGymMembers=async()=>{
        const response=await axios.get(URL);
        setGymMembers(response.data);
    }

    useEffect(()=>{
        getAllGymMembers()
    },[]);

    const getSingleGymMember=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setGymMember(response.data);
        setEditId(id);
    }

    const addGymMember=async()=>{
        await axios.post(URL,gymMember);
        alert("GymMember Added");
    }

    const updateGymMember=async()=>{
        await axios.put(`${URL}/${editId}`, gymMember);
        alert("GymMember Updated");
    }

    const deleteGymMember=async(id)=>{
        const confirmDelete=window.confirm("Confirm Delete GymMember?");
        if(!confirmDelete)
        {
            return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            alert("GymMember Deleted");
            await getAllGymMembers();
        }
    }

    const clearForm=()=>{
        setGymMember({
        "memeber_name":"",
        "email":"",
        "Phone":"",
        "DOB":"",
        "gender":"",
        "address":"",
        "member_status":""
        })
        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};
        if(!gymMember.memeber_name){
            newErrors.memeber_name=["memeber_name is required"];
        }
        if(!gymMember.email){
            newErrors.email=["email is required"];
        }
        if(!gymMember.Phone){
            newErrors.Phone=["phone is required"];
        }
        if(!gymMember.DOB){
            newErrors.DOB=["DOB is required"];
        }
        if(!gymMember.gender){
            newErrors.gender=["gender is required"];
        }
        if(!gymMember.address){
            newErrors.address=["address is required"];
        }
        if(!gymMember.member_status){
            newErrors.member_status=["member_status is required"];
        }
        setErrors(newErrors);                 // 1st this statement
        return Object.keys(newErrors).length===0;//then this ->if you write in reverse,it will not execute
                                                    //Anything after return never executes.
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
                await addGymMember();
            }
            else{
                await updateGymMember();
                setEditId(null);
            }
            await getAllGymMembers();
            clearForm();
        }
        catch(error){
            if(error.response && error.response.status===422)
            {
                setErrors(error.response.data.errors)
            }
            else{
                alert("Something Went Wrong");
            }
        }
    }
    
    return(
        <div style={{width:"1000px", margin:"50px auto"}}>

            <form onSubmit={handleSubmit}>
                <h1>Gym Member Form</h1>

                <p>
                    <label style={{width:"100px",display:"inline-block"}}>Member Name:</label>
                    <input type="text" name="memeber_name" value={gymMember.memeber_name} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.memeber_name?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px",display:"inline-block"}}>Member Email:</label>
                    <input type="email" name="email" value={gymMember.email} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.email?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px",display:"inline-block"}}>Member Phone:</label>
                    <input type="text" name="Phone" value={gymMember.Phone} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.Phone?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px",display:"inline-block"}}>Member DOB:</label>
                    <input type="date" name="DOB" value={gymMember.DOB} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.DOB?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Member Gender:</label>
                    <label htmlFor="male">
                        <input type="radio" name="gender" id="male"  value="male" checked={gymMember.gender==="male"} onChange={handleChange}/>
                    Male</label> &nbsp; &nbsp;
                    <label htmlFor="female">
                        <input type="radio" name="gender" id="female" value="female" checked={gymMember.gender==="female"} onChange={handleChange} />
                    Female</label>
                    <span style={{color:"red"}}>{errors.gender?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px",display:"inline-block"}}>Member Address:</label>
                    <input type="text" name="address" value={gymMember.address} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.address?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px",display:"inline-block"}}>Member Status:</label>
                    <select name="member_status" value={gymMember.member_status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                    <span style={{color:"red"}}>{errors.member_status?.[0]}</span>
                </p>

                <button type="submit">{editId===null?"Save":"Update"}</button>
                &nbsp;
                <button type="button" onClick={clearForm}>Clear</button>
            </form>

            <table border="1" cellPadding="2">

                <thead>
                    <tr>
                        <th>Member ID</th>
                        <th>Member Name</th>
                        <th>Member Email</th>
                        <th>Member Phone</th>
                        <th>Member DOB</th>
                        <th>Member Gender</th>
                        <th>Member Address</th>
                        <th>Member Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {gymMembers.map((item)=>{
                        return(
                            <tr key={item.member_id}>
                                <td>{item.member_id}</td>
                                <td>{item.memeber_name}</td>
                                <td>{item.email}</td>
                                <td>{item.Phone}</td>
                                <td>{item.DOB}</td>
                                <td>{item.gender}</td>
                                <td>{item.address}</td>
                                <td>{item.member_status}</td>

                                <td>
                                    <button type="button" onClick={()=>getSingleGymMember(item.member_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button"onClick={()=>{deleteGymMember(item.member_id)}}>Delete</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>viewGymMember(item.member_id)}>View</button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>

            </table>

            {view && (
                <div>
                    <p>
                        Member ID:{view.member_id}

                    </p>
                    <p>
                        Member Name:{view.memeber_name}
                        
                    </p>
                    <p>
                        Member Email:{view.email}
                        
                    </p>
                    <p>
                        Member Phone:{view.Phone}
                        
                    </p>
                    <p>
                        Member DOB:{view.DOB}
                        
                    </p>
                    <p>
                        Member Gender:{view.gender}
                        
                    </p>
                    <p>
                        Member Address:{view.address}
                        
                    </p>
                    <p>
                        Member Status:{view.member_status}
                        
                    </p>

                    <button type="button" onClick={()=>setView(null)}>Close</button>

                </div>
            )}

        </div>
    )

}

export default GymMember;