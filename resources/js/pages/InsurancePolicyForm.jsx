import { useState,useEffect } from "react";
import axios from "axios";

function InsurancePolicyForm()
{
    const[policy,setPolicy]=useState({
        "customer_id":"",
        "policy_number":"",
        "policy_type":"",
        "premium_amount":"",
        "start_date":"",
        "end_date":"",
        "policy_status":""
    })

    const[policies,setPolicies]=useState([]);
    const[customers,setCustomers]=useState([]);
    const[editId,setEditId]=useState(null);
    const[errors,setErrors]=useState({});

    const URL="http://127.0.0.1:8000/api/insurance/policy";
    const CURL="http://127.0.0.1:8000/api/insurance/customer";

    const handleChange=(e)=>{
          setPolicy({
            ...policy,
            [e.target.name]:e.target.value
          })

          setErrors({
            ...errors,
            [e.target.name]:null
          })
    }

    const getAllInsuranceCustomer=async()=>{
        const response=await axios.get(CURL);
        setCustomers(response.data);
    }

    const getAllInsurancePoolicies=async()=>{
        const response=await axios.get(URL);
        setPolicies(response.data);    
    }

    useEffect(()=>{
        getAllInsuranceCustomer();
        getAllInsurancePoolicies();
    },[]);

    const getSingleInsurancePolicy=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setPolicy(response.data);
        setEditId(id);
    }

    const addInsurancePolicy=async()=>{
        await axios.post(URL,policy);
        alert("Policy Added");
    }

    const updateInsurancePolicy=async()=>{
        await axios.put(`${URL}/${editId}`,policy);
        alert("Policy Updated");
    }

    const deleteInsurancePolicy=async(id)=>{
        const confirmDelete=window.confirm("Delete Policy?");
        if(!confirmDelete){
            return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            alert("Policy Deleted");
            getAllInsurancePoolicies();
        }
    }

    const clearForm=()=>{
        setPolicy({
        "customer_id":"",
        "policy_number":"",
        "policy_type":"",
        "premium_amount":"",
        "start_date":"",
        "end_date":"",
        "policy_status":""
        })
        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};

        if(!policy.customer_id)
        {
            newErrors.customer_id=["customer_id is required"];
        }

         if(!policy.policy_number)
        {
            newErrors.policy_number=["policy_number is required"];
        }

         if(!policy.policy_type)
        {
            newErrors.policy_type=["policy_type is required"];
        }

         if(!policy.premium_amount)
        {
            newErrors.premium_amount=["premium_amount is required"];
        }

         if(!policy.start_date)
        {
            newErrors.start_date=["start_date is required"];
        }

         if(!policy.end_date)
        {
            newErrors.end_date=["end_date is required"];
        }

         if(!policy.policy_status)
        {
            newErrors.policy_status=["policy_status is required"];
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
                await addInsurancePolicy();
            }
            else{
                await updateInsurancePolicy();
                setEditId(null);
            }
            await getAllInsurancePoolicies();
            clearForm();
        }
        catch(error)
        {
            if(error.response && error.response.status===422)
            {
                setErrors(error.response.data.errors);
            }
            else{
                alert("Something went wrong");
            }
        }
    }

    return(
        <div style={{width:"1000px", margin:"50px auto"}}>
            <form onSubmit={handleSubmit}>
                <h1>Policy Form</h1>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Select Customer:</label>
                    <select name="customer_id" value={policy.customer_id} onChange={handleChange}>
                         <option value="">Select Customer</option>
                        {customers.map((item)=>{
                           return(
                                 <option key={item.customer_id} value={item.customer_id}>{item.customer_name}</option>
                            )
                        })}
                    </select>
                    <span style={{color:"red"}}>{errors.customer_id?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Policy Number:</label>
                    <input type="text" name="policy_number" value={policy.policy_number} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.policy_number?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Policy Type:</label>
                    <input type="text" name="policy_type" value={policy.policy_type} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.policy_type?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Policy Amount:</label>
                    <input type="text" name="premium_amount" value={policy.premium_amount} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.premium_amount?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Start Date:</label>
                    <input type="date" name="start_date" value={policy.start_date} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.start_date?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>End Date:</label>
                    <input type="date" name="end_date" value={policy.end_date} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.end_date?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Policy Status:</label>
                    <select name="policy_status" value={policy.policy_status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Expired">Expired</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <span style={{color:"red"}}>{errors.policy_status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    &nbsp;
                    <button onClick={clearForm}>Clear</button>
                </p>
            </form>

            <table border="1" cellPadding="2">

                <thead>
                    <tr>
                        <th>Policy ID</th>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Policy Number</th>
                        <th>Policy Type</th>
                        <th>Policy Amount</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Policy Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {policies.map((item)=>{
                        return(
                            <tr key={item.policy_id}>
                                <td>{item.policy_id}</td>
                                <td>{item.customer_id}</td>
                                <td>{item.policiess?item.policiess.customer_name:""}</td>
                                <td>{item.policy_number}</td>
                                <td>{item.policy_type}</td>
                                <td>{item.premium_amount}</td>
                                <td>{item.start_date}</td>
                                <td>{item.end_date}</td>
                                <td>{item.policy_status}</td>

                                <td>
                                    <button onClick={()=>getSingleInsurancePolicy(item.policy_id)}>Edit</button>
                                    &nbsp;
                                    <button onClick={()=>deleteInsurancePolicy(item.policy_id)}>Delete</button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </div>
    )
}

export default InsurancePolicyForm;