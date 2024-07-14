<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api as Ctrl;

Route::get('/hello', function() {
    return response()->json([
        'message' => 'Hello World'
    ]);
});

Route::get('/batch-jobs', Ctrl\GetBatchJobs::class);
Route::get('/batch-jobs/{id}', Ctrl\GetBatchJobStatus::class);

// Route::apiResource(Ctrl\InventraisController::class);
