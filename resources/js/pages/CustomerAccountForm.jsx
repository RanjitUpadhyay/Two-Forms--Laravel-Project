import { useState, useEffect } from "react";
import axios from "axios";

function CustomerAccountForm() {
    const [customerAccount, setCustomerAccount] = useState({
        "customer_id": "",
        "account_number": "",
        "account_type": "",
        "balance": "",
        "opening_date": ""
    })

    const [customers, setCustomers] = useState([])
    const [customerAccounts, setCustomerAccounts] = useState([]);
    const [editId, setEditId] = useState(null);
    const [view, setView] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/account";
    const CUSTOMER_URL = "http://127.0.0.1:8000/api/customer";

    const handleChange = (e) => {
        setCustomerAccount({
            ...customerAccount,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        })
    }

    const getAllCustomerAccounts = async () => {
        const response = await axios.get(URL);
        setCustomerAccounts(response.data);
    };

    const getAllCustomer = async () => {
        const response = await axios.get(CUSTOMER_URL);
        setCustomers(response.data);
    };

    useEffect(() => {
        getAllCustomer();
        getAllCustomerAccounts();
    }, []);

    const getSingleCustomerAccount = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setCustomerAccount(response.data);
        setEditId(id);
    };

    const addCustomerAccount = async () => {
        const response = await axios.post(URL, customerAccount);
        alert("Account Added");
    }

    const updateCustomerAccount = async () => {
        const response = await axios.put(`${URL}/${editId}`, customerAccount);
        alert("Account Updated");
    };

    const deleteCustomerAccount = async (id) => {
        const confirmDelete = window.confirm("Delete Account?");

        if (!confirmDelete) {
            return;
        }
        else {
            await axios.delete(`${URL}/${id}`);
            alert("Account Deleted");
            await getAllCustomerAccounts();
        }
    }

    const clearForm = () => {
        setCustomerAccount({
            "customer_id": "",
            "account_number": "",
            "account_type": "",
            "balance": "",
            "opening_date": ""
        })

        setEditId(null);
        setErrors({});
    }

    const validateForm = () => {
        let newErrors = {};

        if (!customerAccount.customer_id) {
            newErrors.customer_id = ["customer_id is required"];
        }

        if (!customerAccount.account_number) {
            newErrors.account_number = ["account_number is required"];
        }

        if (!customerAccount.account_type) {
            newErrors.account_type = ["account_type is required"];
        }

        if (!customerAccount.balance) {
            newErrors.balance = ["balance is required"];
        }

        if (!customerAccount.opening_date) {
            newErrors.opening_date = ["opening_date is required"];
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
                await addCustomerAccount();
            }
            else {
                await updateCustomerAccount();
                setEditId(null);
            }

            await getAllCustomerAccounts();
            clearForm();
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
        <div style={{ width: "1000px", margin: "100px auto" }}>
            <form onSubmit={handleSubmit}>
                <h1>Customer Account Form</h1>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Select Customer:</label>
                    <select name="customer_id" value={customerAccount.customer_id} onChange={handleChange}>
                        <option value="">Select Customer</option>
                        {customers.map((item) => {
                            return (
                                <option key={item.customer_id} value={item.customer_id}>{item.customer_name}</option>
                            )
                        })}
                    </select>
                    <span style={{ color: "red" }}>{errors.customer_id?.[0]}</span>
                </p>
                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Account Number:</label>
                    <input type="text" name="account_number" value={customerAccount.account_number} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.account_number?.[0]}</span>
                </p>

                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Account Type:</label>
                    <select name="account_type" value={customerAccount.account_type} onChange={handleChange}>
                        <option value="">Select Account Type</option>
                        <option value="Saving">Saving</option>
                        <option value="Curent">Current</option>
                        <option value="Salary">Salary</option>

                    </select>

                    <span style={{ color: "red" }}>{errors.account_type?.[0]}</span>
                </p>
                <label style={{ width: "110px", display: "inline-block" }}>Account Balance:</label>
                <input type="number" name="balance" value={customerAccount.balance} onChange={handleChange} />
                <span style={{ color: "red" }}>{errors.balance?.[0]}</span>


                <p>
                    <label style={{ width: "110px", display: "inline-block" }}>Account Opening Date:</label>
                    <input type="date" name="opening_date" value={customerAccount.opening_date} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.opening_date?.[0]}</span>
                </p>

                <p>
                    <button type="submit">{editId === null ? "Save" : "Update"}</button>
                    <button type="button" onClick={clearForm}>Clear</button>
                </p>
            </form>

            <table border="1" cellPadding="5">
                <thead>
                    <tr>

                        <th>Account ID</th>
                        <th>Customer ID</th>

                        <th>Customer Name</th>

                        <th>Account Number</th>
                        <th>Account Type</th>
                        <th>Account Balance</th>
                        <th>Account Opening Date</th>
                        <th>Actions</th>

                    </tr>
                </thead>

                <tbody>
                    {customerAccounts.map((item) => {
                        return (
                            <tr key={item.account_id}>
                                <td>{item.account_id}</td>
                                <td>{item.customer_id}</td>

                                <td>{item.customer ? item.customer.customer_name : ""}</td>

                                <td>{item.account_number}</td>
                                <td>{item.account_type}</td>
                                <td>{item.balance}</td>
                                <td>{item.opening_date}</td>

                                <td>
                                    <button type="button" onClick={() => getSingleCustomerAccount(item.account_id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={() => deleteCustomerAccount(item.account_id)}>Delete</button>

                                </td>

                            </tr>
                        )
                    })}
                </tbody>


            </table>


        </div>
    )
}

export default CustomerAccountForm;