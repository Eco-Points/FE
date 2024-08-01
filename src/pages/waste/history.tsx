import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout";

import { IGetDeposit } from "@/utils/types/admin-waste-deposit";
import { getDeposit } from "@/utils/apis/admin-waste-deposit";
import { getExcelUser } from "@/utils/apis/excel";

export default function WasteHistory() {
  const [wasteHistory, setWasteHistory] = useState<IGetDeposit[]>([]);

  useEffect(() => {
    getWasteHistory();
  }, []);

  async function getWasteHistory() {
    try {
      const response = await getDeposit();
      setWasteHistory(response.data || []);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const handleDownload = async () => {
    try {
      const response = await getExcelUser();
      const { tanggal, link } = response.data;
      const a = document.createElement("a");
      a.href = link;
      a.download = `laporan-penyetoran-sampah-${tanggal}.xlsx`;
      a.click();
      toast.success("Laporan berhasil diunduh.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8" data-testid="waste-history-container">
        <div className="space-y-4">
          <div className="flex items-center justify-between" data-testid="waste-history-header">
            <div className="">
              <h1 className="text-2xl font-bold text-green-700" data-testid="page-title">
                Riwayat Penyetoran Sampah
              </h1>
            </div>
            <Button variant={"outline"} onClick={handleDownload} data-testid="btn-submit">
              Download Excel
            </Button>
          </div>
          <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm" data-testid="waste-history-table-container">
            <Table className="min-w-full" data-testid="waste-history-table">
              <TableHeader className="bg-green-50">
                <TableRow data-testid="table-header">
                  <TableHead data-testid="table-header-index">#</TableHead>
                  <TableHead data-testid="table-header-date">Tanggal</TableHead>
                  <TableHead data-testid="table-header-username">Nama Pengguna</TableHead>
                  <TableHead data-testid="table-header-trash-category">Kategori Sampah</TableHead>
                  <TableHead data-testid="table-header-quantity">Jumlah</TableHead>
                  <TableHead data-testid="table-header-verification-status">Status Verifikasi</TableHead>
                  <TableHead data-testid="table-header-points">Poin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wasteHistory.map((history, index) => (
                  <TableRow key={history.id} data-testid={`table-row-${index}`}>
                    <TableCell data-testid={`table-cell-index-${index}`}>{index + 1}</TableCell>
                    <TableCell data-testid={`table-cell-date-${index}`}>{history.depotime}</TableCell>
                    <TableCell data-testid={`table-cell-username-${index}`}>{history.fullname}</TableCell>
                    <TableCell data-testid={`table-cell-trash-category-${index}`}>{history.type}</TableCell>
                    <TableCell data-testid={`table-cell-quantity-${index}`}>{history.quantity}</TableCell>
                    <TableCell data-testid={`table-cell-verification-status-${index}`}>
                      <Badge
                        variant={
                          history.status.toLowerCase() === "pending" ? "secondary" : history.status.toLowerCase() === "verified" ? "default" : "destructive"
                        }
                        data-testid={`badge-status-${index}`}
                      >
                        {history.status}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`table-cell-points-${index}`}>{history.point} poin</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
