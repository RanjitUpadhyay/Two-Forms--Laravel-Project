import { useState, useEffect } from "react";
import axios from "axios";

function CustomerForm() {
    const [customer, setCustomer] = useState({
        "customer_name": "",
        "email": "",
        "phone": "",
        "gender": "",
        "DOB": "",
        "address": "",
        "status": ""
    })

    const [customers, setCustomers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [view, setView] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/customer";

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        })
    }

    const viewCustomer = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setView(response.data);
    };

    const getAllCustomer = async () => {
        const response = await axios.get(URL);
        setCustomers(response.data);
    };

    useEffect(()=>{
        getAllCustomer();
    },[]);

    const getSingleCustomer = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setCustomer(response.data);
        setEditId(id);
    };

    const addCustomer=async()=>{
        const response=await axios.post(URL,customer);
        alert("Customer Added");
    }

    const updateCustomer=async()=>{
        const response=await axios.put(`${URL}/${editId}`,customer);
        alert("Customer Updated");
    };

    const deleteCustomer=async(id)=>{
        const confirmDelete=window.confirm("Delete Customer?");

        if(!confirmDelete)
        {
           return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            alert("Customer Deleted");
            await getAllCustomer();
        }
    }

    const clearForm=()=>{
        setCustomer({
        "customer_name": "",
        "email": "",
        "phone": "",
        "gender": "",
        "DOB": "",
        "address": "",
        "status": ""
        })

        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};

        if(!customer.customer_name)
        {
            newErrors.customer_name=["customer_name is required"];
        }

         if(!customer.email)
        {
            newErrors.email=["email is required"];
        }

         if(!customer.phone)
        {
            newErrors.phone=["phone is required"];
        }

         if(!customer.gender)
        {
            newErrors.gender=["gender is required"];
        }

         if(!customer.DOB)
        {
            newErrors.DOB=["DOB is required"];
        }

         if(!customer.address)
        {
            newErrors.address=["address is required"];
        }

         if(!customer.status)
        {
            newErrors.status=["status is required"];
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
                await addCustomer();
            }
            else{
                await updateCustomer();
                setEditId(null);
            }

            await getAllCustomer();
            clearForm();
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
        <div style={{width:"1000px", margin:"100px auto"}}>
            <form onSubmit={handleSubmit}>
                <h1>Customer Form</h1>
                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Customer Name:</label>
                    <input type="text" name="customer_name" value={customer.customer_name} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.customer_name?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Email:</label>
                    <input type="text" name="email" value={customer.email} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.email?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Phone:</label>
                    <input type="text" name="phone" value={customer.phone} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.phone?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Gender:</label>
                    <label htmlFor="male">
                    <input type="radio" name="gender" id="male" value="male" checked={customer.gender==="male"} onChange={handleChange} />
                    Male</label>   &nbsp;
                    <label htmlFor="female">
                        <input type="radio" name="gender" id="female" value="female" checked={customer.gender==="female"} onChange={handleChange} />
                        Female</label>
                    
                    <span style={{color:"red"}}>{errors.gender?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>DOB:</label>
                    <input type="date" name="DOB" value={customer.DOB} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.DOB?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Address:</label>
                    <input type="text" name="address" value={customer.address} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.address?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Status:</label>
                    <select name="status" value={customer.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                    <span style={{color:"red"}}>{errors.status?.[0]}</span>
                </p>

               <p>
                <button type="submit">{editId===null?"Save":"Update"}</button>
                <button type="button" onClick={clearForm}>Clear</button>
               </p>
            </form>

            <table border="1" cellPadding="10"> 
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((item)=>{
                        return(
                            <tr key={item.customer_id}>
                                <td>{item.customer_id}</td>
                                <td>{item.customer_name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.gender}</td>
                                <td>{item.DOB}</td>
                                <td>{item.address}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button type="button" onClick={()=>getSingleCustomer(item.customer_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteCustomer(item.customer_id)}>Delete</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>viewCustomer(item.customer_id)}>View</button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>


            </table>

            {view && <div>
                <h2>Customer Details</h2>
                <p>
                    Customer ID:{view.customer_id}
                </p>

                <p>
                    Customer Name:{view.customer_name}
                </p>

                <p>
                    Customer Email:{view.email}
                </p>

                <p>
                    Customer Phone:{view.phone}
                </p>

                <p>
                    Customer Gender:{view.gender}
                </p>

                <p>
                    Customer DOB:{view.DOB}
                </p>

                <p>
                    Customer Address:{view.address}
                </p>

                <p>
                    Customer Status:{view.status}
                </p>
                
                <p>
                    <button type="button" onClick={()=>setView(null)}>Close</button>
                </p>
            </div>
            }
        </div>
    )
}

export default CustomerForm;