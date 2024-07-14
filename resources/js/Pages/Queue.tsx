"use client";

import Container from "@/components/reusable/global/Container";
import HeadingForPage from "@/components/reusable/global/HeadingForPage";
import QueueManagement from "@/components/reusable/queue/QueueManagement";
import { DataTable } from "@/components/ui/data-table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { queueTableColumns } from "@/datatable/queue/columns";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Inventaris from "@/lib/interface/Inventaris";
import PaginationLinks from "@/lib/interface/PaginationLinks";
import { PageProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";
import { csrfToken } from "@/lib/helper";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import Batch from "@/lib/interface/Batch";
import { parse } from "path";

type Props = PageProps & {
    inventaris: {
        data: Inventaris[];
        links: PaginationLinks[];
    };
};

const QueuePages = ({ auth, inventaris }: Props) => {
    const { toast } = useToast();
    const [batches, setBatches] = useState<Batch[]>([]);

    const getLatestBatches = async () => {
        const res = await fetch("/api/batch-jobs", {
            method: "GET",
        });

        const batchData = await res.json();

        setBatches(batchData);
    };

    const handleExport = async () => {
        const headers = new Headers();

        headers.append("Accept", "application/json");
        headers.append("X-CSRF-TOKEN", csrfToken ?? "");

        try {
            const res = await fetch("/queue/export", {
                method: "POST",
                headers,
            });

            if (res.ok) {
                const data = (await res.json()) as { message: string };

                toast({
                    title: "Notification",
                    description: data.message,
                });

                await getLatestBatches();
            }
        } catch (e) {
            toast({
                title: "Notification",
                description: "Error generating excel file..",
            });
        }
    };

    useEffect(() => {
        (async function() {
            await getLatestBatches();
        })();
    }, []);

    useEffect(() => {
        const unfinishedBatches = batches.find(
            (batches) => batches.finished_at === null,
        );

        if (unfinishedBatches) {
            const refetchUnfinishedBatch = async () => {
                if (unfinishedBatches) {
                    await getLatestBatches();
                }
            }

            refetchUnfinishedBatch();
        }
    }, [batches]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeadingForPage text="Queue Dan Jobs" />}
        >
            <Head title="Queue Dan Jobs" />

            <Container className="py-10">
                <QueueManagement batches={batches} />

                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">
                            Data Inventaris
                        </h1>
                        <p className="leading-7">
                            Barang yang ada di gudang saat ini
                        </p>
                    </div>
                    <div className="space-x-2">
                        <Button onClick={handleExport}>Export</Button>
                        <Button variant="outline">Import</Button>
                    </div>
                </div>

                <div className="mt-4 bg-background">
                    <DataTable
                        columns={queueTableColumns}
                        data={inventaris.data}
                    />
                </div>

                <div className="flex justify-start mt-4 w-full">
                    <Pagination className="w-max mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={inventaris.links[0].url ?? ""}
                                    className={`${!inventaris.links[0].url && "cursor-not-allowed text-black/50 hover:text-black/50"}`}
                                />
                            </PaginationItem>
                            {inventaris.links.slice(1, -1).map((link, idx) => {
                                if (!link.url) {
                                    return (
                                        <PaginationItem key={idx}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                }

                                return (
                                    <PaginationItem key={idx}>
                                        <PaginationLink
                                            href={link.url}
                                            isActive={link.active}
                                        >
                                            {link.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}
                            <PaginationItem>
                                <PaginationNext
                                    href={
                                        inventaris.links[
                                            inventaris.links.length - 1
                                        ].url ?? ""
                                    }
                                    className={`${!inventaris.links[inventaris.links.length - 1].url && "cursor-not-allowed text-black/50 hover:text-black/50"}`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </Container>
        </AuthenticatedLayout>
    );
};

export default QueuePages;
