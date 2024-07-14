"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PanelTopOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Batch from "@/lib/interface/Batch";

type Props = {
    batches: Batch[];
}

const QueueManagement = ({ batches }: Props) => {
    const handleDownload = async () => {
        const a = document.createElement("a");
        a.href = '/storage/template-inventaris.xlsx';
        a.download = "template-inventaris.xlsx"; // Specify the file name here
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="fixed bottom-4 right-4 z-10">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon">
                        <PanelTopOpen />
                    </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                            <span>⚙</span>
                            <span>Queue Manager</span>
                        </SheetTitle>
                        <SheetDescription>
                            List job yang ada di Queue Server
                        </SheetDescription>
                        <div className="mt-4 space-y-2 overflow-y-auto">
                            {batches.slice(-3).map((batch: any, idx) => {
                                return (
                                    <Card key={idx}>
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-start">
                                                <span>{batch.name}</span>
                                                {batch.finished_at && (
                                                    <>
                                                        {batch.failed_jobs >
                                                            0 ? (
                                                            <Badge variant="destructive">
                                                                Gagal
                                                            </Badge>
                                                        ) : (
                                                            <Badge className="bg-green-600 text-white">
                                                                Berhasil
                                                            </Badge>
                                                        )}
                                                    </>
                                                )}
                                            </CardTitle>
                                            <CardDescription className="space-y-2 flex flex-col">
                                                {!batch.finished_at ? (
                                                    "Bentar, lagi di proses..."
                                                ) : (
                                                    <>
                                                        <span>
                                                            Export sudah selesai
                                                        </span>
                                                        {batch.failed_jobs ===
                                                            0 && (
                                                                <Button
                                                                    size="sm"
                                                                    className="w-max"
                                                                    onClick={
                                                                        handleDownload
                                                                    }
                                                                >
                                                                    Download
                                                                </Button>
                                                            )}
                                                    </>
                                                )}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                );
                            })}
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default QueueManagement;
