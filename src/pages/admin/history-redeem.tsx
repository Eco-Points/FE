import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

import { getExcelRewardAdmin } from "@/utils/apis/excel";
import { getExchangeAdmin } from "@/utils/apis/exchange";
import { IExchange } from "@/utils/types/exchange";

export default function RedeemHistory() {
  const [redeemHistory, setRedeemHistory] = useState<IExchange[]>([]);

  useEffect(() => {
    getExchangeHistory();
  }, []);

  async function getExchangeHistory() {
    try {
      const response = await getExchangeAdmin();
      setRedeemHistory(response.data || []);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const handleDownload = async () => {
    try {
      const response = await getExcelRewardAdmin();
      const { tanggal, link } = response.data;
      const a = document.createElement("a");
      a.href = link;
      a.download = `Laporan-penukaran-poin-${tanggal}.xlsx`;
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
                Riwayat Tukar Poin
              </h1>
            </div>
            <Button variant={"link"} className="text-green-700" onClick={handleDownload} data-testid="btn-submit">
              Download Excel
            </Button>
          </div>
          <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm" data-testid="waste-history-table-container">
            <Table className="min-w-full" data-testid="waste-history-table">
              <TableHeader className="bg-green-50">
                <TableRow data-testid="table-header">
                  <TableHead data-testid="table-header-index">#</TableHead>
                  <TableHead data-testid="table-header-date">Tanggal Penukaran</TableHead>
                  <TableHead data-testid="table-header-username">Nama Pengguna</TableHead>
                  <TableHead data-testid="table-header-trash-category">Hadiah</TableHead>
                  <TableHead data-testid="table-header-quantity">Jumlah Poin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {redeemHistory.map((history, index) => (
                  <TableRow key={history.id} data-testid={`table-row-${index}`}>
                    <TableCell data-testid={`table-cell-index-${index}`}>{index + 1}</TableCell>
                    <TableCell data-testid={`table-cell-date-${index}`}>{history.exchange_time}</TableCell>
                    <TableCell data-testid={`table-cell-username-${index}`}>{history.fullname}</TableCell>
                    <TableCell data-testid={`table-cell-trash-category-${index}`}>{history.reward}</TableCell>
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
