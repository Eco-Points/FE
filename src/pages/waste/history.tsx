import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout";

import { IGetDeposit } from "@/utils/types/admin-waste-deposit";
import { getDeposit } from "@/utils/apis/admin-waste-deposit";

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

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-2xl font-bold text-green-700">Riwayat Penyetoran Sampah</h1>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-green-700 hover:underline hover:text-green-500">
              <ArrowLeftIcon className="w-4 h-4" />
              Kembali
            </a>
          </div>
          <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
            <Table className="min-w-full">
              <TableHeader className="bg-green-50">
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Nama Pengguna</TableHead>
                  <TableHead>Kategori Sampah</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Status Verifikasi</TableHead>
                  <TableHead>Poin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wasteHistory.map((history, index) => (
                  <TableRow key={history.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{history.depotime}</TableCell>
                    <TableCell>{history.fullname}</TableCell>
                    <TableCell>{history.type}</TableCell>
                    <TableCell>{history.quantity}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-yellow-600 bg-yellow-100 border-yellow-600">
                        {history.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{history.point} poin</TableCell>
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
