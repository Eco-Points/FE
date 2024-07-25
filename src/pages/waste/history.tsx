import { ArrowLeftIcon } from "lucide-react";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout";

export default function WasteHistory() {
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
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>2023-05-01</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Plastik</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-yellow-600 bg-yellow-100 border-yellow-600">Tertunda</Badge>
                  </TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>2023-04-15</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>Kertas</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>
                    <Badge variant="default" className="text-green-700 bg-green-100 border-green-700">Terverifikasi</Badge>
                  </TableCell>
                  <TableCell>50 poin</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>2023-03-20</TableCell>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>Kaleng</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>
                    <Badge variant="destructive" className="text-red-600 bg-red-100 border-red-600">Ditolak</Badge>
                  </TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
