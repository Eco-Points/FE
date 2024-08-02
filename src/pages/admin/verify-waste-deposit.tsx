import { CheckIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout";

import { getDepositAdmin, updateDepositStatus } from "@/utils/apis/admin-waste-deposit";
import { IGetDeposit } from "@/utils/types/admin-waste-deposit";
import { getExcelDepositAdmin } from "@/utils/apis/excel";
import { formatDate } from "@/utils/function";

export default function VerifyWasteDeposit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deposits, setDeposits] = useState<IGetDeposit[]>([]);

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      const response = await getDepositAdmin();
      setDeposits(response.data || []);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterStatus = (status: string) => {
    setFilterStatus(status);
  };

  const handleStatusUpdate = async (wasteId: number, status: "verified" | "rejected") => {
    try {
      await updateDepositStatus(wasteId, status);
      setDeposits(deposits.map((deposit) => (deposit.id === wasteId ? { ...deposit, status } : deposit)));
      toast.success(`Penyetoran sampah berhasil ${status === "verified" ? "diverifikasi" : "ditolak"}.`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const filteredDeposits = deposits.filter((deposit) => {
    const searchMatch = deposit.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || deposit.type.toLowerCase().includes(searchTerm.toLowerCase());
    return filterStatus === "all" ? searchMatch : deposit.status.toLowerCase() === filterStatus.toLowerCase() && searchMatch;
  });

  const handleDownload = async () => {
    try {
      const response = await getExcelDepositAdmin();
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

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-950 text-gray-950 dark:text-white p-4 md:p-6">
        <div className="flex flex-col gap-4 md:gap-6 mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-green-900" data-testid="header-title">
            Verifikasi Penyetoran Sampah
          </h1>
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Cari penyetoran..."
                value={searchTerm}
                onChange={handleSearch}
                className="bg-gray-100 dark:bg-gray-800 text-gray-950 dark:text-white w-full md:w-auto"
                data-testid="search-input"
              />
              <div className="w-full md:w-auto">
                <Select value={filterStatus} onValueChange={handleFilterStatus} data-testid="status-filter">
                  <SelectTrigger>
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="verified">Terverifikasi</SelectItem>
                    <SelectItem value="rejected">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="outline" onClick={handleDownload} data-testid="download-excel" className="w-full md:w-auto">
              Download Excel
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Nama Pengguna</TableHead>
                <TableHead>Kategori Sampah</TableHead>
                <TableHead>Jumlah Satuan</TableHead>
                <TableHead>Tanggal Penyetoran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeposits.map((deposit, index) => (
                <TableRow key={deposit.id} className="hover:bg-gray-100 dark:hover:bg-gray-900" data-testid={`deposit-row-${deposit.id}`}>
                  <TableCell data-testid={`deposit-number-${deposit.id}`}>
                    <Link to={`/admin/deposit/${deposit.id}`}>{index + 1}</Link>
                  </TableCell>
                  <TableCell data-testid={`deposit-name-${deposit.id}`}>
                    <Link to={`/admin/deposit/${deposit.id}`} className="text-blue-500 hover:underline">
                      {deposit.fullname}
                    </Link>
                  </TableCell>
                  <TableCell data-testid={`deposit-type-${deposit.id}`}>{deposit.type}</TableCell>
                  <TableCell data-testid={`deposit-quantity-${deposit.id}`}>{deposit.quantity}</TableCell>
                  <TableCell data-testid={`deposit-date-${deposit.id}`}>{formatDate(deposit.depotime)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        deposit.status.toLowerCase() === "pending" ? "secondary" : deposit.status.toLowerCase() === "verified" ? "default" : "destructive"
                      }
                      data-testid={`deposit-status-${deposit.id}`}
                    >
                      {deposit.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {deposit.status.toLowerCase() === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusUpdate(deposit.id, "verified")}
                          data-testid={`verify-button-${deposit.id}`}
                        >
                          <CheckIcon className="w-4 h-4" />
                          <span className="sr-only">Verifikasi</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusUpdate(deposit.id, "rejected")}
                          data-testid={`reject-button-${deposit.id}`}
                        >
                          <XIcon className="w-4 h-4" />
                          <span className="sr-only">Tolak</span>
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
