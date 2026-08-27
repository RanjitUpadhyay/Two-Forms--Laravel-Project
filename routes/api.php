<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HotelBookingController;
use App\Http\Controllers\HotelPaymentController;

use App\Http\Controllers\LodgePaymentController;
use App\Http\Controllers\LodgeBookingController;

use App\Http\Controllers\HotselBoookingController;
use App\Http\Controllers\HotselPaymentController;

use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentEnrollmentController;

use App\Http\Controllers\BookController;
use App\Http\Controllers\BookIssueController;

use App\Http\Controllers\EventController;
use App\Http\Controllers\EventRegistrationController;

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeLeaveController;

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CustomerController;

use App\Http\Controllers\TableController;
use App\Http\Controllers\TableReservationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Hotel
Route::get('/booking',[HotelBookingController::class,'index']);
Route::post('/booking',[HotelBookingController::class,'store']);
Route::get('/booking/{booking_id}',[HotelBookingController::class,'show']);
Route::put('/booking/{booking_id}',[HotelBookingController::class,'update']);
Route::delete('/booking/{booking_id}',[HotelBookingController::class,'destroy']);

Route::get('/payment',[HotelPaymentController::class,'index']);
Route::post('/payment',[HotelPaymentController::class,'store']);
Route::get('/payment/{payment_id}',[HotelPaymentController::class,'show']);
Route::put('/payment/{payment_id}',[HotelPaymentController::class,'update']);
Route::delete('/payment/{payment_id}',[HotelPaymentController::class,'destroy']);

// Lodge
Route::get('/lodge/booking', [LodgeBookingController::class, 'index']);
Route::post('/lodge/booking', [LodgeBookingController::class, 'store']);
Route::get('/lodge/booking/{id}', [LodgeBookingController::class, 'show']);
Route::put('/lodge/booking/{id}', [LodgeBookingController::class, 'update']);
Route::delete('/lodge/booking/{id}', [LodgeBookingController::class, 'destroy']);

Route::get('/lodge/payment', [LodgePaymentController::class, 'index']);
Route::post('/lodge/payment', [LodgePaymentController::class, 'store']);
Route::get('/lodge/payment/{id}', [LodgePaymentController::class, 'show']);
Route::put('/lodge/payment/{id}', [LodgePaymentController::class, 'update']);
Route::delete('/lodge/payment/{id}', [LodgePaymentController::class, 'destroy']);

//Hostel
Route::get('/hostel/booking',[HotselBoookingController::class,'index']);
Route::get('/hostel/booking/{id}',[HotselBoookingController::class,'show']);
Route::post('/hostel/booking',[HotselBoookingController::class,'store']);
Route::put('/hostel/booking/{id}',[HotselBoookingController::class,'update']);
Route::delete('/hostel/booking/{id}',[HotselBoookingController::class,'destroy']);

Route::get('/hostel/payment',[HotselPaymentController::class,'index']);
Route::get('/hostel/payment/{id}',[HotselPaymentController::class,'show']);
Route::post('/hostel/payment',[HotselPaymentController::class,'store']);
Route::put('/hostel/payment/{id}',[HotselPaymentController::class,'update']);
Route::delete('/hostel/payment/{id}',[HotselPaymentController::class,'destroy']);

//Student

Route::get('/student',[StudentController::class,'index']);
Route::post('/student',[StudentController::class,'store']);
Route::get('/student/{id}',[StudentController::class,'show']);
Route::put('/student/{id}',[StudentController::class,'update']);
Route::delete('/student/{id}',[StudentController::class,'destroy']);

Route::get('/enrollment',[StudentEnrollmentController::class,'index']);
Route::post('/enrollment',[StudentEnrollmentController::class,'store']);
Route::get('/enrollment/{id}',[StudentEnrollmentController::class,'show']);
Route::put('/enrollment/{id}',[StudentEnrollmentController::class,'update']);
Route::delete('/enrollment/{id}',[StudentEnrollmentController::class,'destroy']);

//Book

Route::get('/book',[BookController::class,'index']);
Route::post('/book',[BookController::class,'store']);
Route::get('/book/{id}',[BookController::class,'show']);
Route::put('/book/{id}',[BookController::class,'update']);
Route::delete('/book/{id}',[BookController::class,'destroy']);

Route::get('/book-issue',[BookIssueController::class,'index']);
Route::post('/book-issue',[BookIssueController::class,'store']);
Route::get('/book-issue/{id}',[BookIssueController::class,'show']);
Route::put('/book-issue/{id}',[BookIssueController::class,'update']);
Route::delete('/book-issue/{id}',[BookIssueController::class,'destroy']);

//Events

Route::get('/event',[EventController::class,'index']);
Route::post('/event',[EventController::class,'store']);
Route::get('/event/{id}',[EventController::class,'show']);
Route::put('/event/{id}',[EventController::class,'update']);
Route::delete('/event/{id}',[EventController::class,'destroy']);

Route::get('/event-registration',[EventRegistrationController::class,'index']);
Route::post('/event-registration',[EventRegistrationController::class,'store']);
Route::get('/event-registration/{id}',[EventRegistrationController::class,'show']);
Route::put('/event-registration/{id}',[EventRegistrationController::class,'update']);
Route::delete('/event-registration/{id}',[EventRegistrationController::class,'destroy']);

//Employee
Route::get('/employee',[EmployeeController::class,'index']);
Route::post('/employee',[EmployeeController::class,'store']);
Route::get('/employee/{id}',[EmployeeController::class,'show']);
Route::put('/employee/{id}',[EmployeeController::class,'update']);
Route::delete('/employee/{id}',[EmployeeController::class,'destroy']);

Route::get('/employee-leave',[EmployeeLeaveController::class,'index']);
Route::post('/employee-leave',[EmployeeLeaveController::class,'store']);
Route::get('/employee-leave/{id}',[EmployeeLeaveController::class,'show']);
Route::put('/employee-leave/{id}',[EmployeeLeaveController::class,'update']);
Route::delete('/employee-leave/{id}',[EmployeeLeaveController::class,'destroy']);

//Customer_Account
Route::get('/customer',[CustomerController::class,'index']);
Route::post('/customer',[CustomerController::class,'store']);
Route::get('/customer/{id}',[CustomerController::class,'show']);
Route::put('/customer/{id}',[CustomerController::class,'update']);
Route::delete('/customer/{id}',[CustomerController::class,'destroy']);

Route::get('/account',[AccountController::class,'index']);
Route::post('/account',[AccountController::class,'store']);
Route::get('/account/{id}',[AccountController::class,'show']);
Route::put('/account/{id}',[AccountController::class,'update']);
Route::delete('/account/{id}',[AccountController::class,'destroy']);

//Table
Route::get('/table',[TableController::class,'index']);
Route::post('/table',[TableController::class,'store']);
Route::get('/table/{id}',[TableController::class,'show']);
Route::put('/table/{id}',[TableController::class,'update']);
Route::delete('/table/{id}',[TableController::class,'destroy']);

Route::get('/table-reservation',[TableReservationController::class,'index']);
Route::post('/table-reservation',[TableReservationController::class,'store']);
Route::get('/table-reservation/{id}',[TableReservationController::class,'show']);
Route::put('/table-reservation/{id}',[TableReservationController::class,'update']);
Route::delete('/table-reservation/{id}',[TableReservationController::class,'destroy']);