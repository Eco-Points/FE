import { useEffect, useState } from "react";
import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

import { getExcelRewardtUser } from "@/utils/apis/excel";
import { getExchangeUser } from "@/utils/apis/exchange";
import { IExchange } from "@/utils/types/exchange";
import { formatDate } from "@/utils/function";

export default function RedeemHistory() {
  const [redeemHistory, setRedeemHistory] = useState<IExchange[]>([]);

  useEffect(() => {
    fetchExchangeHistory();
  }, []);

  const fetchExchangeHistory = async () => {
    try {
      const response = await getExchangeUser();
      setRedeemHistory(response.data || []);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await getExcelRewardtUser();
      const { tanggal, link } = response.data;
      const fileResponse = await fetch(link);
      const blob = await fileResponse.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `laporan-penukaran-point-${tanggal}.xlsx`;
      a.click();
      URL.revokeObjectURL(a.href);
      toast.success("Laporan berhasil diunduh.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-3xl font-semibold text-green-800" data-testid="page-title">
              Riwayat Tukar Poin
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
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-300">
            <Table className="min-w-full" data-testid="redeem-history-table">
              <TableHeader className="bg-green-100 border-b border-gray-200">
                <TableRow data-testid="table-header">
                  <TableHead data-testid="table-header-index">#</TableHead>
                  <TableHead data-testid="table-header-date">Tanggal Penukaran</TableHead>
                  <TableHead data-testid="table-header-reward">Hadiah</TableHead>
                  <TableHead data-testid="table-header-quantity">Jumlah Poin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {redeemHistory.map((history, index) => (
                  <TableRow key={history.id} className="hover:bg-gray-50" data-testid={`table-row-${index}`}>
                    <TableCell data-testid={`table-cell-index-${index}`}>{index + 1}</TableCell>
                    <TableCell data-testid={`table-cell-date-${index}`}>{formatDate(history.exchange_time)}</TableCell>
                    <TableCell data-testid={`table-cell-reward-${index}`}>{history.reward}</TableCell>
                    <TableCell data-testid={`table-cell-quantity-${index}`}>{history.point_used}</TableCell>
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
