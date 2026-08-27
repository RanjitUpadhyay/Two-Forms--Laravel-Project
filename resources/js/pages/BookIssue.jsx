import { useState, useEffect } from "react";
import axios from "axios";

function BookIssueForm() {
    const [bookIssue, setBookIssue] = useState({
        'book_id': '',
        'student_name': '',
        'gender': '',
        'student_phone': '',
        'issue_date': '',
        'return_date': '',
        'issue_status': ''
    });

    const [bookIssues, setBookIssues] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const [books, setBooks] = useState([]);
    //'books' is used in:{books.map((item)=>{  --->line:170

    const URL = "http://127.0.0.1:8000/api/book-issue";
    const BOOK_URL = "http://127.0.0.1:8000/api/book";

    const handleChange = (e) => {
        setBookIssue({
            ...bookIssue,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const getAllBookIssues = async () => {
        const response = await axios.get(URL);
        setBookIssues(response.data);
    }

    const getAllBooks = async () => {
        const response = await axios.get(BOOK_URL);
        setBooks(response.data);
    }

    useEffect(() => {
        getAllBooks();
        getAllBookIssues();
    }, [])

    const getSingleBookIssue = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setBookIssue(response.data);
        setEditId(id);
    }

    const addBookIssue = async () => {
        await axios.post(URL, bookIssue);
        alert("BookIssue Added");
    }

    const updateBookIssue = async () => {
        await axios.put(`${URL}/${editId}`, bookIssue);
        alert("BookIssue Updated");
    }

    const deleteBookIssue = async (id) => {
        const confirmDelete = window.confirm("Delete BookIssue?");

        if (!confirmDelete) {
            return;
        }

        else {
            await axios.delete(`${URL}/${id}`);
            alert("BookIssue Deleted");
            await getAllBookIssues();
        }
    }

    const clearForm = () => {
        setBookIssue({
            'book_id': '',
            'student_name': '',
            'gender': '',
            'student_phone': '',
            'issue_date': '',
            'return_date': '',
            'issue_status': ''
        });
        setEditId(null);
        setErrors({});
    }

    const validateForm = () => {
        let newErrors = {};

        if (!bookIssue.book_id) {
            newErrors.book_id = ["book_id not found"];
        }

        if (!bookIssue.student_name) {
            newErrors.student_name = ["student_name not found"];
        }

        if (!bookIssue.gender) {
            newErrors.gender = ["gender not found"];
        }

        if (!bookIssue.student_phone) {
            newErrors.student_phone = ["student_phone not found"];
        }

        if (!bookIssue.issue_date) {
            newErrors.issue_date = ["issue_date is required"];
        }

        if (!bookIssue.return_date) {
            newErrors.return_date = ["return_date is required"];
        }

        if (!bookIssue.issue_status) {
            newErrors.issue_status = ["issue_date is required"];
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
                await addBookIssue();
            }

            else {
                await updateBookIssue();
            }
            clearForm();
            await getAllBookIssues();
        }

        catch (error) {
            if (error.response && error.response.status === 422) {

                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } 
                
                
                
                else {
                    setErrors({
                        general: [error.response.data.message]//'message' comes from BookIssueController , store function
                    });
                }

            } 
            
            else {
                alert("Something Went Wrong");
            }
        }
    }

    return (
        <div style={{ width: "1000px", margin: "50px auto" }}>


            {errors.general && (
                <p style={{ color: "red" }}>{errors.general[0]}</p>
            )}


            <form onSubmit={handleSubmit}>

                <h1>BookIssue Form</h1>

                <p>
                    <label style={{ width: "100px", display: "inline-block" }}>Select Book:</label>
                    <select name="book_id" value={bookIssue.book_id} onChange={handleChange}>
                        <option value="">Select Book</option>
                        {books.map((item) => {
                            return (
                                <option key={item.book_id} value={item.book_id}>{item.book_id} {"-"} {item.book_name}</option>
                            )
                        })}
                    </select>

                    <span style={{ color: "red" }}>{errors.book_id?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "100px", display: "inline-block" }}>Student Name:</label>
                    <input type="text" name="student_name" value={bookIssue.student_name} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.student_name?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "100px", display: "inline-block" }}>Gender:</label>
                    <label htmlFor="male">
                        <input type="radio" name="gender" id="male" value="male" checked={bookIssue.gender === "male"} onChange={handleChange} />Male
                    </label> &nbsp;

                    <label htmlFor="female">
                        <input type="radio" name="gender" id="female" value="female" checked={bookIssue.gender === "female"} onChange={handleChange} />Female
                    </label>
                    <span style={{ color: "red" }}>{errors.gender?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "100px", display: "inline-block" }}>Student Phone:</label>
                    <input type="text" name="student_phone" value={bookIssue.student_phone} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.student_phone?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "100px", display: "inline-block" }}>Issue Date:</label>
                    <input type="date" name="issue_date" value={bookIssue.issue_date} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.issue_date?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "100px", display: "inline-block" }}>Return Date :</label>
                    <input type="date" name="return_date" value={bookIssue.return_date} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.return_date?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "100px", display: "inline-block" }}>Issue Status:</label>
                    <input type="text" name="issue_status" value={bookIssue.issue_status} onChange={handleChange} />

                    <span style={{ color: "red" }}>{errors.issue_status?.[0]}</span>
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
                        <th>Issue ID</th>
                        <th>Book ID</th>

                        <th>Book Name</th>

                        <th>Student Name</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Issue Date</th>
                        <th>Return Date</th>
                        <th>Issue Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>
                    {bookIssues.map((item) => {
                        return (
                            <tr key={item.issue_id}>
                                <td>{item.issue_id}</td>
                                <td>{item.book_id}</td>

                                <td>{item.book ? item.book.book_name : ""}</td>

                                <td>{item.student_name}</td>
                                <td>{item.gender}</td>
                                <td>{item.student_phone}</td>
                                <td>{item.issue_date}</td>
                                <td>{item.return_date}</td>
                                <td>{item.issue_status}</td>

                                <td>
                                    <button type="button" onClick={() => getSingleBookIssue(item.issue_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={() => deleteBookIssue(item.issue_id)}>Delete</button>

                                </td>

                            </tr>
                        )     //<td>{item.book?item.book.book_name:""}</td>  :here 'book' is a MOdel Function in BookIssue
                    })}
                </tbody>
            </table>


        </div>
    )
}

export default BookIssueForm;