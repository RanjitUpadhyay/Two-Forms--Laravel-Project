import React from "react";
import { createRoot } from "react-dom/client";

//import HotelPayment from "./pages/HotelPayment";
//import LodgeBooking from "./pages/LodgeBooking";
//import LodgePayment from "./pages/LodgePayment";

import StudentForm from "./pages/StudentForm";
import EnrollmentForm from "./pages/EnrollmentForm";


createRoot(document.getElementById("app")).render(
    <>
        <h1>App.jsx is working</h1>

        <StudentForm />
        <EnrollmentForm/>

        

       
    </>
);