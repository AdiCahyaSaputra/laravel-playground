<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;

class GetBatchJobs extends Controller
{
    public function __invoke()
    {
        $batches = DB::table('job_batches')->get();

        foreach($batches as $batch) {
            $batchById = Bus::findBatch($batch->id);

            $batch->isFinished = $batchById->finished();
        }

        return $batches;
    }
}
