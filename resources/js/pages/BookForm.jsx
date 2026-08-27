import { useState, useEffect } from "react";
import axios from "axios";

function BookForm() {
    const [book, setBook] = useState({
        'book_name': '',
        'category': '',
        'price': '',
        'status': ''
    });

    const [books, setBooks] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const [view, setView] = useState(null);

    const URL = "http://127.0.0.1:8000/api/book";

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const viewBook = async(id)=>{
        const response = await axios.get(`${URL}/${id}`);
        setView(response.data);
    }

    const getAllBooks = async () => {
        const response = await axios.get(URL);
        setBooks(response.data);
    }

    useEffect(()=>{
        getAllBooks();
    },[])

    const getSingleBook = async (id)=>{
        const response = await axios.get(`${URL}/${id}`);
        setBook(response.data);
        setEditId(id);
    }

    const addBook = async () => {
        await axios.post(URL, book);
        alert("Book Added");
    }

    const updateBook = async () => {
        await axios.put(`${URL}/${editId}`, book);
        alert("Book Updated");
    }

    const deleteBook = async (id) => {
        const confirmDelete = window.confirm("Delete Book?");

        if (!confirmDelete) {
            return;
        }

        else {
            await axios.delete(`${URL}/${id}`);
            alert("Book Deleted");
            await getAllBooks();
        }
    }

    const clearForm = () => {
        setBook({
            'book_name': '',
            'category': '',
            'price': '',
            'status': ''
        });
        setEditId(null);
        setErrors({});
    }

    const validateForm = () => {
        let newErrors = {};

        if (!book.book_name) {
            newErrors.book_name = ["book_name not found"];
        }

        if (!book.category) {
            newErrors.category = ["category not found"];
        }

        if (!book.price) {
            newErrors.price = ["price not found"];
        }

        if (!book.status) {
            newErrors.status = ["status not found"];
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            if (editId === null) {
                await addBook();
            }

            else {
                await updateBook();
            }
            clearForm();
            await getAllBooks();
        }

        catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            else {
                alert("Something Went Wrong");
            }
        }
    }

    return (
        <div style={{ width: "1000px", margin: "50px auto" }}>

            <form onSubmit={handleSubmit}>

                <h1>Book Form</h1>

                <p>
                    <label style={{ width:"100px",display: "inline-block" }}>Book Name:</label>
                    <input type="text" name="book_name" value={book.book_name} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.book_name?.[0]}</span>
                </p>

                <p>
                    <label style={{  width:"100px",display: "inline-block" }}>Category:</label>
                    <input type="text" name="category" value={book.category} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.category?.[0]}</span>
                </p>

                <p>
                    <label style={{ width:"100px", display: "inline-block" }}>Price:</label>
                    <input type="number" name="price" value={book.price} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.price?.[0]}</span>
                </p>

                <p>
                    <label style={{ width:"100px", display: "inline-block" }}>Status:</label>

                    <label htmlFor="available">
                        <input type="radio" id="available" name="status" value="available" onChange={handleChange} checked={book.status === "available"} />

                        Available</label>

                    &nbsp;

                    <label htmlFor="unavailable">
                        <input type="radio" id="unavailable" name="status" value="unavailable" onChange={handleChange} checked={book.status === "unavailable"} />

                        Unavailable</label>



                    <span style={{ color: "red" }}>{errors.status?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId === null ? "Save" : "Update"}</button>
                    &nbsp;
                    <button type="button" onClick={() => clearForm()}>Clear</button>
                </p>
            </form>

            <hr />

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Book Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>
                    {books.map((item)=>{
                        return(
                            <tr key={item.book_id}>
                                <td>{item.book_id}</td>
                                <td>{item.book_name}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>{item.status}</td>

                                <td>
                                    <button type="button" onClick={()=>getSingleBook(item.book_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteBook(item.book_id)}>Delete</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>viewBook(item.book_id)}>View</button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {view && (
                <div>
                    <h2>Book Details</h2>
                    <p>
                        Book ID:{view.book_id}
                    </p>

                    <p>
                        Book Name:{view.book_name}
                    </p>

                    <p>
                        Category:{view.category}
                    </p>

                    <p>
                        Price:{view.price}
                    </p>

                    <p>
                        Status:{view.status}
                    </p>
                    <p>
                        <button type="button" onClick={()=>setView(null)}>Close</button>
                    </p>
                </div>
            )}

        </div>
    )
}

export default BookForm;