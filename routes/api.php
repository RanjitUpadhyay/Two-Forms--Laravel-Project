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