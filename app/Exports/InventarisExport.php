<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class InventarisExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    use Exportable;

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1:D' . 20001)->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);

        return [
            1 => [
                'font' => [
                    'bold' => true,
                ],
                'fill' => [
                    'fillType'   => Fill::FILL_SOLID,
                    'startColor' => [
                        'argb' => 'DCDCDC'
                    ],
                ],
            ]
        ];
    }

    public function map($row): array
    {
        return [
            $row->name,
            $row->stock,
            'Rp. ' . number_format($row->price, 0, ',', ','),
            $row->expired_date,
        ];
    }

    public function headings(): array
    {
        return [
            'Nama Barang',
            'Stok',
            'Harga Satuan',
            'Tanggal Kadaluarsa',
        ];
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        sleep(10);

        $inventaris = DB::table('inventaris')
            ->select('name', 'stock', 'price', 'expired_date')
            ->get();

        return $inventaris;
    }
}
