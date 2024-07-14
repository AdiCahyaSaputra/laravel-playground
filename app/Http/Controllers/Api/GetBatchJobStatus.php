<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Bus;

class GetBatchJobStatus extends Controller
{
    public function __invoke($id)
    {
        return Bus::findBatch($id);
    }
}
