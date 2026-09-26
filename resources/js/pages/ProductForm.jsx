import { useState, useEffect } from "react";
import axios from "axios";

function ProductForm()
{
    const[product,setProduct]=useState({
        "product_name":"",
        "product_code":"",
        "category":"",
        "price":"",
        "quantity":"",
        "status":""
    })

    const[products,setProducts]=useState([]);
    const[editId,setEditId]=useState(null);
    const[view,setView]=useState(null);
    const[errors,setErrors]=useState({});

    const URL="http://127.0.0.1:8000/api/product";

    const viewProduct=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setView(response.data);
    }

    const handleChange=(e)=>{
        setProduct({
            ...product,
            [e.target.name]:e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name]:null
        })
    }

    const getAllProducts=async()=>{
        const response=await axios.get(URL);
        setProducts(response.data);
    }

    useEffect(()=>{
        getAllProducts();
    },[]);

    const getSingleProduct=async(id)=>{
        const response=await axios(`${URL}/${id}`);
        setProduct(response.data);
        setEditId(id);
    }

    const addProduct=async()=>{
        await axios.post(URL,product);
        alert("Product Added");
    }

    const updateProduct=async()=>{
        await axios.put(`${URL}/${editId}`, product);
        alert("Product Updated");
    }

    const deleteProduct=async(id)=>{
        const confirmDelete=window.confirm("Delete Product?");
        if(!confirmDelete)
        {
            return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            alert("Product Deleted");
            getAllProducts();
        }
    }

    const clearForm=()=>{
        setProduct({
        "product_name":"",
        "product_code":"",
        "category":"",
        "price":"",
        "quantity":"",
        "status":"" 
        })

        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErrors={};
        if(!product.product_name){
            newErrors.product_name=["product_name is required"]
        }

         if(!product.product_code){
            newErrors.product_code=["product_code is required"]
        }

         if(!product.category){
            newErrors.category=["category is required"]
        }

         if(!product.price){
            newErrors.price=["price is required"]
        }

         if(!product.quantity){
            newErrors.quantity=["quantity is required"]
        }

         if(!product.status){
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
                await addProduct();
            }
            else{
                await updateProduct();
                setEditId(null)
            }
            await getAllProducts();
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
        <div style={{width:"1000px" ,margin:"100px auto"}}>

            <form onSubmit={handleSubmit}>
                <h1>Product Form</h1>

                <p>
                    <label style={{width:"100px" ,display:"inline-block"}}>Product Name:</label>
                    <input type="text" name="product_name" value={product.product_name} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.product_name?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px" ,display:"inline-block"}}>Product Code:</label>
                    <input type="text" name="product_code" value={product.product_code} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.product_code?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px" ,display:"inline-block"}}>Category:</label>
                    <input type="text" name="category" value={product.category} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.category?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px" ,display:"inline-block"}}>Product Price:</label>
                    <input type="text" name="price" value={product.price} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.price?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px" ,display:"inline-block"}}>Product Quantity:</label>
                    <input type="number" name="quantity" value={product.quantity} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.quantity?.[0]}</span>
                </p>


                 <p>
                    <label style={{width:"100px" ,display:"inline-block"}}>Product Status:</label>
                    <label htmlFor="instock">
                        <input type="radio" name="status" id="instock" value="instock" checked={product.status==="instock"} onChange={handleChange} />InStock
                    </label> &nbsp;

                    <label htmlFor="outstock">
                        <input type="radio" name="status" id="outstock" value="outstock" checked={product.status==="outstock"} onChange={handleChange} />OutStock
                    </label>
                    <span style={{color:"red"}}>{errors.status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>
            </form>

            <table border="1" cellPadding="5">

                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Code</th>
                        <th>Product Category</th>
                        <th>Product Price</th>
                        <th>Product Quantity</th>
                        <th>Product Status</th>
                        <th>Product Action</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((item)=>{
                        return(
                            <tr key={item.product_id}>
                                <td>{item.product_id}</td>
                                <td>{item.product_name}</td>
                                <td>{item.product_code}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.status}</td>

                                <td>
                                    <button type="button" onClick={()=>getSingleProduct(item.product_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteProduct(item.product_id)}>Delete</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>viewProduct(item.product_id)}>View</button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>

            </table>

            {view && (
                <div>
                    <p>
                        Product ID:{view.product_id} 

                    </p>

                     <p>
                        Product Name:{view.product_name}

                    </p>

                     <p>
                        Product Code:{view.product_code}

                    </p>

                     <p>
                        Product cateogory:{view.category}

                    </p>

                     <p>
                        Product Price:{view.price}

                    </p>

                     <p>
                        Product Quantity:{view.quantity}

                    </p>

                     <p>
                        Product Status:{view.status}

                    </p>

                    <p>
                        <button type="button" onClick={()=>setView(null)}>Close</button>
                    </p>
                </div>
            )}

        </div>
    )
}

export default ProductForm;