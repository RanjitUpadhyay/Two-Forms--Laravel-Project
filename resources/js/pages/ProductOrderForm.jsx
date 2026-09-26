import { useEffect,useState } from "react";
import axios from "axios";

function ProductOrderForm()
{
    const[productOrder,setProductOrder]=useState({
       "product_id":"",
       "order_number":"",
       "order_quantity":"",
       "unit_price":"",
       "total_amount":""
    })

    const[productOrders,setProductOrders]=useState([]);
    const[editId,setEditId]=useState(null);
    const[errors,setErrors]=useState({});
    const[products,setProducts]=useState([]);

    const P_URL="http://127.0.0.1:8000/api/product";
    const URL="http://127.0.0.1:8000/api/product-order";

    const handleChange=(e)=>{
        setProductOrder({
            ...productOrder,
            [e.target.name]:e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name]:null
        })
    }

    const getAllProducts=async()=>{
        const response=await axios.get(P_URL);
        setProducts(response.data);
    }

    const getAllProductOrders=async()=>{
        const response=await axios.get(URL);
        setProductOrders(response.data);
    }

    useState(()=>{
        getAllProducts();
        getAllProductOrders();
    },[]);

    const getSingleProductOrder=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setProductOrder(response.data);
        setEditId(id);
    }

    const addProductOrder=async()=>{
        await axios.post(URL,productOrder);
        alert("Product Order Added");
    }

    const updateProductOrder=async()=>{
        await axios.put(`${URL}/${editId}`, productOrder);
        alert("Product Order Updated");
    }

    const deleteProductOrder=async(id)=>{
        const confirmDelete=window.confirm("Delete Product Order?");

        if(!confirmDelete)
        {
            return;
        }
        else{
           await axios.delete(`${URL}/${id}`);
           alert("Product Order Deleted");
           getAllProductOrders();
        }
        
    }

    const clearForm=()=>{
        setProductOrder({
        "product_id":"",
       "order_number":"",
       "order_quantity":"",
       "unit_price":"",
       "total_amount":""
        })
        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};
        if(!productOrder.product_id)
        {
            newErrors.product_id=["product_id is required"];
        }

        if(!productOrder.order_number)
        {
            newErrors.order_number=["order_number is required"];
        }

        if(!productOrder.order_quantity)
        {
            newErrors.order_quantity=["order_quantity is required"];
        }

        if(!productOrder.unit_price)
        {
            newErrors.unit_price=["unit_price is required"];
        }

        if(!productOrder.total_amount)
        {
            newErrors.total_amount=["total_amount is required"];
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
                await addProductOrder();
            }
            else{
                await updateProductOrder();
                setEditId(null);
            }
            await getAllProductOrders();
            validateForm();
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
        <div style={{width:"1000px",margin:"50px auto"}}>

             <form onSubmit={handleSubmit}>
                <h1>Product Order Form</h1>
                <p>
                    <label style={{width:"110px", display:"inline-block"}}>Select Product:</label>
                    <select name="product_id" value={productOrder.product_id} onChange={handleChange}>
                        <option value="">Select Product:</option>
                        {products.map((item)=>{
                            return(
                                <option key={item.product_id} value={item.product_id}>{item.product_name}</option>
                            )
                        })}
                    </select>

                    <span style={{color:"red"}}>{errors.product_id?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px" , display:"inline-block"}}>Order Number:</label>
                    <input type="text" name="order_number" value={productOrder.order_number} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.order_number?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px" , display:"inline-block"}}>Order Quantity:</label>
                    <input type="text" name="order_quantity" value={productOrder.order_quantity} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.order_quantity?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px" , display:"inline-block"}}>Unit Price:</label>
                    <input type="text" name="unit_price" value={productOrder.unit_price} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.unit_price?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"110px" , display:"inline-block"}}>Total Amount:</label>
                    <input type="text" name="total_amount" value={productOrder.total_amount} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.total_amount?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>

             </form>
            <table border="1" cellPadding="2">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Order ID</th>
                        <th>Product Name</th>
                        <th>Order Number</th>
                        <th>Order Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {productOrders.map((item)=>{
                        return(
                            <tr key={item.order_id}>
                                <td>{item.product_id}</td>
                                <td>{item.order_id}</td>
                                <td>{item.product?item.product.product_name:""}</td>
                                <td>{item.order_number}</td>
                                <td>{item.order_quantity}</td>
                                <td>{item.unit_price}</td>
                                <td>{item.total_amount}</td>
                                <td>
                                    <button type="button" onClick={()=>getSingleProductOrder(item.order_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteProductOrder(item.order_id)}>Delete</button>
                                </td>             
                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </div>
    )
}

export default ProductOrderForm;