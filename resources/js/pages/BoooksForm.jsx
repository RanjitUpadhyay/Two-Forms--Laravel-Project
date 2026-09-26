import { useState,useEffect } from "react";
import axios from "axios";

function BoooksForm()
{
    const[book,setBook]=useState({
       "author_id":"",
       "book_title":"",
       "publication_date":"",
       "price":"",
       "quantity":""
    })

    const[books,setBooks]=useState([]);
    const[authors,setAuthors]=useState([]);
    const[editId,setEditId]=useState(null);
    const[errors,setErrors]=useState({});

    const A_URL="http://127.0.0.1:8000/api/author";
    const URL="http://127.0.0.1:8000/api/boook";

    const handleChange=(e)=>{
        setBook({
            ...book,
            [e.target.name]:e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]:null
        })
    }

    const getAllAuthors=async()=>{
        const response=await axios.get(A_URL);
        setAuthors(response.data);
    }

    const getAllBooks=async()=>{
        const response=await axios.get(URL);
        setBooks(response.data);
    }

    useEffect(()=>{
        getAllAuthors();
        getAllBooks();
    },[]);

    const getSingleBook=async(id)=>{
        const response=await axios.get(`${URL}/${id}`);
        setBook(response.data);
        setEditId(id);
    }

    const addBook=async()=>{
        await axios.post(URL,book);
        alert("Book Added");
    }

    const updateBook=async()=>{
        await axios.put(`${URL}/${editId}`,book);
        alert("Book Updated");
    }

    const deleteBook=async(id)=>{
        const confirmDelete=window.confirm("Delete Book?");
        if(!confirmDelete)
        {
            return;
        }
        else{
            await axios.delete(`${URL}/${id}`);
            alert("Book Deleted");
            getAllBooks();
        }
    }

    const clearForm=()=>{
        setBook({
        "author_id":"",
       "book_title":"",
       "publication_date":"",
       "price":"",
       "quantity":""
        })

        setEditId(null);
        setErrors({});
    }

    const validateForm=()=>{
        let newErorrs={};

        if(!book.author_id)
        {
            newErorrs.author_id=["author_id is required"]
        }
          if(!book.book_title)
        {
            newErorrs.book_title=["book_title is required"]
        }
          if(!book.publication_date)
        {
            newErorrs.publication_date=["publication_date is required"]
        }
           if(!book.price)
        {
            newErorrs.price=["price is required"]
        }
           if(!book.quantity)
        {
            newErorrs.quantity=["quantity is required"]
        }
        setErrors(newErorrs);
        return Object.keys(newErorrs).length===0;
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
                await addBook();
            }
            else{
                await updateBook();
                setEditId(null);
            }
            await getAllBooks();
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
        <div style={{width:"1000px", margin:"100px auto"}}>
            <form onSubmit={handleSubmit}>
                <h1>Book Form</h1>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Select Author:</label>
                    <select name="author_id" value={book.author_id} onChange={handleChange}>
                        <option value="">Select Author</option>
                        {authors.map((item)=>{
                            return(
                                <option key={item.author_id} value={item.author_id}>{item.author_name}</option>
                            )
                        })}
                    </select>
                    <span style={{color:"red"}}>{errors.author_id?.[0]}</span>
                </p>

                <p>
                    <label style={{width:"100px", display:"inline-block"}}>Book Title:</label>
                    <input type="text" name="book_title" value={book.book_title} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.book_title?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px", display:"inline-block"}}>Publication Date:</label>
                    <input type="date" name="publication_date" value={book.publication_date} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.publication_date?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px", display:"inline-block"}}>Price:</label>
                    <input type="text" name="price" value={book.price} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.price?.[0]}</span>
                </p>

                 <p>
                    <label style={{width:"100px", display:"inline-block"}}>Quantity:</label>
                    <input type="number" name="quantity" value={book.quantity} onChange={handleChange} />
                    <span style={{color:"red"}}>{errors.quantity?.[0]}</span>
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
                        <th>Book ID</th>
                        <th>Author ID</th>
                        <th>Author Name</th>
                        <th>Book Title</th>
                        <th>Publication Date</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {books.map((item)=>{
                        return(
                            <tr key={item.boooks_id}>
                                <th>{item.boooks_id}</th>
                                <th>{item.author_id}</th>

                                <th>{item.author?item.author.author_name:""}</th>

                                <th>{item.book_title}</th>
                                <th>{item.publication_date}</th>
                                <th>{item.price}</th>
                                <th>{item.quantity}</th>
                                
                                <td>
                                    <button type="button" onClick={()=>getSingleBook(item.boooks_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteBook(item.boooks_id)}>Delete</button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </div>
    )

}
export default BoooksForm;