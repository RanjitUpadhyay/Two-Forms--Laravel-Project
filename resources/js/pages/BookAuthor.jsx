import { useState,useEffect } from "react";
import axios from "axios";

function BookAuthor()
{
    const[author,setAuthor]=useState({
        "author_name":"",
        "gender":"",
        "email":"",
        "phone":"",
        "country":""
    })

    const[authors,setAuthors]=useState([]);
    const[editId,setEditId]=useState(null);
    const[errors,setErrors]=useState({});
    const[view,setView]=useState(null);

    const URL="http://127.0.0.1:8000/api/author";

    const handleChange=(e)=>{
        setAuthor({
            ...author,
            [e.target.name]:e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name]:null
        })
    }

    const viewAuthor=async(id)=>{
        const response=await axios.get(`${URL}/${id}`)
        setView(response.data);
    }

    const getAllAuthors=async()=>{
        const response=await axios.get(URL)
        setAuthors(response.data);
    }

    useEffect(()=>{
        getAllAuthors()
    },[]);

    const getSingleAuthor=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setAuthor(response.data);
        setEditId(id);
    }

    const addAuthor=async()=>{
        await axios.post(URL,author);
        alert("Author Added");
    }

    const updateAuthor=async()=>{
        await axios.put(`${URL}/${editId}`, author);
        alert("Author Updated");
    }

    const deleteAuthor=async(id)=>{
        const confirmDelete=window.confirm("Delete Author?");
        if(!confirmDelete)
        {
            return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            alert("Author Deleted");
            getAllAuthors();
        }
    }

    const clearForm=()=>{
        setAuthor({
        "author_name":"",
        "gender":"",
        "email":"",
        "phone":"",
        "country":""
        })
        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErorrs={};
        if(!author.author_name){
            newErorrs.author_name=["author_name is required"]
        }
         if(!author.gender){
            newErorrs.gender=["gender is required"]
        }
         if(!author.email){
            newErorrs.email=["email is required"]
        }
         if(!author.phone){
            newErorrs.phone=["phone is required"]
        }
         if(!author.country){
            newErorrs.country=["country is required"]
        }
        setErrors(newErorrs);
        return Object.keys(newErorrs).length===0;
    }

    const handleSubmiit=async(e)=>{
        e.preventDefault();
        if(!validateForm())
        {
            return;
        }
        try{
            if(editId===null)
            {
                await addAuthor();
            }
            else{
                await updateAuthor();
                setEditId(null);
            }
            await getAllAuthors();
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

            <form onSubmit={handleSubmiit}>
                <h1>Author Form</h1>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Author Name:</label>
                    <input type="text" name="author_name" value={author.author_name} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.author_name?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Gender:</label>
                   <label htmlFor="male">
                    <input type="radio" name="gender" id="male" value="male" checked={author.gender==="male"} onChange={handleChange} />Male
                   </label> &nbsp;
                   <label htmlFor="female">
                    <input type="radio" name="gender" id="female" value="female" checked={author.gender==="female"} onChange={handleChange} />Female
                   </label>
                    <span style={{color:"red"}}>{errors.gender?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Email:</label>
                    <input type="email" name="email" value={author.email} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.email?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Phone:</label>
                    <input type="text" name="phone" value={author.phone} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.phone?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Country:</label>
                    <input type="text" name="country" value={author.country} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.country?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                    &nbsp;
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>

                <table border="1" cellPadding="3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Author Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Country</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {authors.map((item)=>{
                            return(
                                <tr key={item.author_id}>
                                    <td>{item.author_id}</td>
                                    <td>{item.author_name}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.country}</td>

                                    <td>
                                        <button type="button" onClick={()=>getSingleAuthor(item.author_id)}>Edit</button>
                                        &nbsp;
                                        <button type="button" onClick={()=>deleteAuthor(item.author_id)}>Delete</button>
                                        &nbsp;
                                        <button type="button" onClick={()=>{viewAuthor(item.author_id)}}>View</button>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>

                </table>

                {view && (
                    <div>
                        <h2>Author Details</h2>
                        <p>
                            Author ID:{view.author_id}
                             
                        </p>

                         <p>
                            Author Name:{view.author_name}
                             
                        </p>

                         <p>
                            Author Gender:{view.gender}

                        </p>

                         <p>
                            Author Email:{view.email}

                        </p>

                         <p>
                            Author Phone:{view.phone}

                        </p>

                         <p>
                            Author Country:{view.country}

                        </p>

                        <p>
                            <button type="button" onClick={()=>{setView(null)}}>Close</button>
                        </p>
                    </div>
                )}
            </form>

        </div>
    )
}
export default BookAuthor;