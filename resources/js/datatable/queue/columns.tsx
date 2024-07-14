"use client";

import { Badge } from "@/components/ui/badge";
import Inventaris from "@/lib/interface/Inventaris";
import { ColumnDef } from "@tanstack/react-table";

export const queueTableColumns: ColumnDef<Inventaris>[] = [
    {
        accessorKey: "name",
        header: "Nama Barang",
    },
    {
        accessorKey: "stock",
        header: "Stok",
    },
    {
        accessorKey: "price",
        header: "Harga Satuan",
        cell: ({ row }) => {
            return 'Rp. ' + (row.getValue("price") as number)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
    {
        accessorKey: "expired_date",
        header: "Keterangan Kadaluarsa",
        cell: ({ row }) => {
            const expiredDate = new Date(row.getValue('expired_date')).getTime();
            const now = new Date().getTime();

            const isExpired = (expiredDate - now) <= 0;

            return isExpired ? (
                <Badge variant="destructive">Expired</Badge>
            ) : (
                <Badge variant="default">Belum Expired</Badge>
            );
        }
    },
];
