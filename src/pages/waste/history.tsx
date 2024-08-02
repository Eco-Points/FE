import { useEffect, useState } from "react";
import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout";

import { IGetDeposit } from "@/utils/types/admin-waste-deposit";
import { getDeposit } from "@/utils/apis/admin-waste-deposit";
import { getExcelDepositUser } from "@/utils/apis/excel";
import { formatDate } from "@/utils/function";

export default function WasteHistory() {
  const [wasteHistory, setWasteHistory] = useState<IGetDeposit[]>([]);

  useEffect(() => {
    fetchWasteHistory();
  }, []);

  const fetchWasteHistory = async () => {
    try {
      const response = await getDeposit();
      setWasteHistory(response.data || []);
    } catch (error) {
      toast.error(`Gagal memuat riwayat penyetoran: ${(error as Error).message}`);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await getExcelDepositUser();
      const { tanggal, link } = response.data;
      const fileResponse = await fetch(link);
      const blob = await fileResponse.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `laporan-penyetoran-sampah-${tanggal}.xlsx`;
      a.click();
      URL.revokeObjectURL(a.href);
      toast.success("Laporan berhasil diunduh.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const getBadgeVariant = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "pending") return "secondary";
    if (statusLower === "verified") return "default";
    return "destructive";
  };

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8" data-testid="waste-history-container">
        <header className="flex items-center justify-between mb-6" data-testid="waste-history-header">
          <h1 className="text-2xl font-bold text-green-700" data-testid="page-title">
            Riwayat Penyetoran Sampah
          </h1>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-green-600 border-green-600 hover:bg-green-50"
            onClick={handleDownload}
            data-testid="btn-download"
          >
            <DownloadIcon className="w-5 h-5" />
            Download Excel
          </Button>
        </header>
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm" data-testid="waste-history-table-container">
          <Table className="min-w-full" data-testid="waste-history-table">
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead data-testid="table-header-index">#</TableHead>
                <TableHead data-testid="table-header-date">Tanggal</TableHead>
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
                  <TableCell data-testid={`table-cell-date-${index}`}>{formatDate(history.depotime)}</TableCell>
                  <TableCell data-testid={`table-cell-trash-category-${index}`}>{history.type}</TableCell>
                  <TableCell data-testid={`table-cell-quantity-${index}`}>{history.quantity}</TableCell>
                  <TableCell data-testid={`table-cell-verification-status-${index}`}>
                    <Badge variant={getBadgeVariant(history.status)}>{history.status}</Badge>
                  </TableCell>
                  <TableCell data-testid={`table-cell-points-${index}`}>{history.point} poin</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
