import React from "react";
import { createRoot } from "react-dom/client";
//import EmployeeForm from "./pages/EmployeeForm";
//import EmployeeLeaveForm from "./pages/EmployeeLeaveForm";

//import HotelPayment from "./pages/HotelPayment";
//import LodgeBooking from "./pages/LodgeBooking";
//import LodgePayment from "./pages/LodgePayment";

//import StudentForm from "./pages/StudentForm";
//import EnrollmentForm from "./pages/EnrollmentForm";

//import BookForm from "./pages/BookForm";
//import BookIssueForm from "./pages/BookIssue";

//import EventForm from "./pages/EventForm";
//import EventRegistrationForm from "./pages/EventRegistration";

//import CustomerForm from "./pages/CustomerForm";
//import CustomerAccountForm from "./pages/CustomerAccountForm";

import TableForm from "./pages/TableForm";

import TableReservationForm from "./pages/TableReservationForm";


createRoot(document.getElementById("app")).render(
    <>
        <h1>App.jsx is working</h1>

        <TableForm/>
         <TableReservationForm/>
        
        
    
        
        

        

       
    </>
);