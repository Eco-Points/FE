import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

import { getExcelRewardAdmin } from "@/utils/apis/excel";
import { getExchangeAdmin } from "@/utils/apis/exchange";
import { IExchange } from "@/utils/types/exchange";
import { formatDate } from "@/utils/function";

export default function RedeemHistory() {
  const [redeemHistory, setRedeemHistory] = useState<IExchange[]>([]);

  useEffect(() => {
    fetchExchangeHistory();
  }, []);

  const fetchExchangeHistory = async () => {
    try {
      const response = await getExchangeAdmin();
      setRedeemHistory(response.data || []);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await getExcelRewardAdmin();
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
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8" data-testid="redeem-history-container">
        <div className="space-y-4">
          <div className="flex items-center justify-between" data-testid="redeem-history-header">
            <h1 className="text-2xl font-bold text-green-700" data-testid="page-title">
              Riwayat Tukar Poin
            </h1>
            <Button variant="link" className="text-green-700" onClick={handleDownload} data-testid="btn-download-excel">
              Download Excel
            </Button>
          </div>
          <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm" data-testid="redeem-history-table-container">
            <Table className="min-w-full" data-testid="redeem-history-table">
              <TableHeader className="bg-green-50">
                <TableRow data-testid="table-header-row">
                  <TableHead data-testid="table-header-index">#</TableHead>
                  <TableHead data-testid="table-header-date">Tanggal Penukaran</TableHead>
                  <TableHead data-testid="table-header-username">Nama Pengguna</TableHead>
                  <TableHead data-testid="table-header-reward">Hadiah</TableHead>
                  <TableHead data-testid="table-header-quantity">Jumlah Poin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {redeemHistory.map((history, index) => (
                  <TableRow key={history.id} data-testid={`table-row-${index}`}>
                    <TableCell data-testid={`table-cell-index-${index}`}>{index + 1}</TableCell>
                    <TableCell data-testid={`table-cell-date-${index}`}>{formatDate(history.exchange_time)}</TableCell>
                    <TableCell data-testid={`table-cell-username-${index}`}>{history.fullname}</TableCell>
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
