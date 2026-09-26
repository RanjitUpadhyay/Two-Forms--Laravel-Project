import { useState,useEffect } from "react";
import axios from "axios";

function GymMembership()
{
    const[gymMembership,setGymMembership]=useState({
       "member_id":"",
       "memebership_type":"",
       "start_date":"",
       "end_date":"",
       "fee":"",
       "memebership_status":""
    })

    const[gymMemberships,setGymMemberships]=useState([]);
    const[editId,setEditId]=useState(null);
    const[errors,setErrors]=useState({});
    const[gymMembers,setGymMembers]=useState([]);

    const GURL="http://127.0.0.1:8000/api/gym-member";
    const URL="http://127.0.0.1:8000/api/membership";

    const handleChange=(e)=>{
         setGymMembership({
            ...gymMembership,
            [e.target.name]:e.target.value
         })

         setErrors({
            ...errors,
            [e.target.name]:null
         })
    }

    const getAllGymMembers=async()=>{
        const response=await axios.get(GURL);
        setGymMembers(response.data);
    }

    const getAllGymMemberships=async()=>{
        const response=await axios.get(URL);
        setGymMemberships(response.data);
    }

    useEffect(()=>{
        getAllGymMembers();
        getAllGymMemberships();
    },[]);

    const getSingleGymMembership=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setGymMembership(response.data);
        setEditId(id);
    }

    const addGymMembership=async()=>{
        await axios.post(URL,gymMembership);
        alert("GymMembership added");
    }

    const updateGymMembership=async()=>{
        await axios.put(`${URL}/${editId}`,gymMembership);
        alert("GymMembership updated");
    }

    const deleteGymMembership=async(id)=>{
        const confirmDelete=window.confirm("Delete GymMembership?");
        if(!confirmDelete)
        {
            return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            getAllGymMemberships();
            alert("GymMembership Deleted");
        }
    }

    const clearForm=()=>{
        setGymMembership({
       "member_id":"",
       "memebership_type":"",
       "start_date":"",
       "end_date":"",
       "fee":"",
       "memebership_status":""
        })
        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};
        if(!gymMembership.member_id){
            newErrors.member_id=["member_id is required"]
        }

         if(!gymMembership.memebership_type){
            newErrors.memebership_type=["memebership_type is required"]
        }

         if(!gymMembership.start_date){
            newErrors.start_date=["start_date is required"]
        }

         if(!gymMembership.end_date){
            newErrors.end_date=["end_date is required"]
        }

         if(!gymMembership.fee){
            newErrors.fee=["fee is required"]
        }

         if(!gymMembership.memebership_status){
            newErrors.memebership_status=["memebership_status is required"]
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
                await addGymMembership();
            }
            else{
                await updateGymMembership();
                setEditId(null);
            }
            await getAllGymMemberships();
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
        <div style={{width:"1000px", margin:"50px auto"}}>

            <form onSubmit={handleSubmit}>
                <h1>Gym Membership Form</h1>

                <p>
                    <label style={{width:"110px",display:"inline-block"}}>Select Member:</label>
                    <select name="member_id" value={gymMembership.member_id} onChange={handleChange}>
                        <option value="">Select Member</option>
                        {gymMembers.map((item)=>{
                            return(
                                <option key={item.member_id} value={item.member_id}>{item.memeber_name}</option>
                            )
                        })}
                    </select>
                    <span style={{color:"red"}}>{errors.member_id?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>MemberShip Type:</label>
                    <select name="memebership_type" value={gymMembership.memebership_type} onChange={handleChange}>
                        <option value="">Select Membership Type</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Half-Yearly">Half-Yearly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                    <span style={{color:"red"}}>{errors.memebership_type?.[0]}</span>
                </p>

                <p>
                   <label style={{width:"110px", display:"inline-block"}}>Start Date:</label>
                   <input type="date" name="start_date" value={gymMembership.start_date} onChange={handleChange}/>
                   <span style={{color:"red"}}>{errors.start_date?.[0]}</span>
                </p>

                 <p>
                   <label style={{width:"110px", display:"inline-block"}}>End Date:</label>
                   <input type="date" name="end_date" value={gymMembership.end_date} onChange={handleChange}/>
                   <span style={{color:"red"}}>{errors.end_date?.[0]}</span>
                </p>

                
                 <p>
                   <label style={{width:"110px", display:"inline-block"}}>Fee:</label>
                   <input type="text" name="fee" value={gymMembership.fee} onChange={handleChange}/>
                   <span style={{color:"red"}}>{errors.fee?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>MemberShip Status:</label>
                    <select name="memebership_status" value={gymMembership.memebership_status} onChange={handleChange}>
                        <option value="">Select Membership Status</option>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                        <option value="Expired">Expired</option>
                       
                    </select>
                    <span style={{color:"red"}}>{errors.memebership_status?.[0]}</span>
                </p>
                 
                 <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                 </p>

                 <table border="1" cellPadding="2">
                  <thead>
                    <tr>
                        <th>Membership ID</th>
                        <th>Member ID</th>
                        <th>Member Name</th>
                        <th>Membership Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Membership Status</th>
                         <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {gymMemberships.map((item)=>{
                        return(
                            <tr key={item.membership_id}>
                                <td>{item.membership_id}</td>
                                <td>{item.member_id}</td>
                                <td>{item.member?item.member.memeber_name:""}</td>
                                <td>{item.memebership_type}</td>
                                <td>{item.start_date}</td>
                                <td>{item.end_date}</td>
                                <td>{item.memebership_status}</td>

                                <td>
                                    <button type="button" onClick={()=>getSingleGymMembership(item.member_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteGymMembership(item.member_id)}>Delete</button>
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

export default GymMembership;