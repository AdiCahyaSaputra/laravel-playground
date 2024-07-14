<?php

namespace App\Http\Controllers;

use App\Exports\InventarisExport;
use App\Jobs\ExportInventarisJob;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class QueueController extends Controller
{
    public function index()
    {
        $inventaris = DB::table('inventaris')->paginate(20);

        return Inertia::render('Queue', [
            'inventaris' => $inventaris
        ]);
    }

    public function export()
    {
        Bus::batch([
            new ExportInventarisJob
        ])->name('Export Inventaris')->dispatch();

        return response()->json([
            'message' => 'Start to exporting the file..'
        ]);
    }

    public function download()
    {
        return response()->download('/storage/template-inventaris.xlsx');
    }
}
