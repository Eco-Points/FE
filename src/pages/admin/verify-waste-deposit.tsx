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
import { getExcelAdmin } from "@/utils/apis/excel";

export default function VerifyWasteDeposit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deposits, setDeposits] = useState<IGetDeposit[]>([]);

  useEffect(() => {
    fetchDeposits();
  }, []);

  async function fetchDeposits() {
    try {
      const response = await getDepositAdmin();
      setDeposits(response.data || []);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterStatus = (status: string) => {
    setFilterStatus(status);
  };

  const handleVerify = async (waste_id: number) => {
    try {
      await updateDepositStatus(waste_id, "verified");
      setDeposits(deposits.map((deposit) => (deposit.id === waste_id ? { ...deposit, status: "verified" } : deposit)));
      toast.success("Penyetoran sampah berhasil diverifikasi.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleReject = async (waste_id: number) => {
    try {
      await updateDepositStatus(waste_id, "rejected");
      setDeposits(deposits.map((deposit) => (deposit.id === waste_id ? { ...deposit, status: "rejected" } : deposit)));
      toast.success("Penyetoran sampah berhasil ditolak.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const filteredDeposits = deposits.filter((deposit) => {
    if (filterStatus === "all") {
      return deposit.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || deposit.type.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        deposit.status.toLowerCase() === filterStatus.toLowerCase() &&
        (deposit.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || deposit.type.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  });

  const handleDownload = async () => {
    try {
      const response = await getExcelAdmin();
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
      <div className="bg-white dark:bg-gray-950 text-gray-950 dark:text-white p-6 mx-4 md:mx-6 md:py-12">
        <div className="flex flex-col gap-6 mb-4">
          <h1 className="text-2xl font-bold text-green-900" data-testid="header-title">
            Verifikasi Penyetoran Sampah
          </h1>
          <div className="flex justify-between">
            <div className="flex gap-2 max-w-md">
              <Input
                placeholder="Cari penyetoran..."
                value={searchTerm}
                onChange={handleSearch}
                className="bg-gray-100 dark:bg-gray-800 text-gray-950 dark:text-white"
                data-testid="input-search"
              />
              <Select value={filterStatus} onValueChange={handleFilterStatus} data-testid="select-status">
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
            <Button variant={"outline"} onClick={handleDownload} data-testid="btn-download">
              Download Excel
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
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
                    <Link to={`/admin/deposit/${deposit.id}`}>{deposit.fullname}</Link>
                  </TableCell>
                  <TableCell data-testid={`deposit-type-${deposit.id}`}>{deposit.type}</TableCell>
                  <TableCell data-testid={`deposit-quantity-${deposit.id}`}>{deposit.quantity}</TableCell>
                  <TableCell data-testid={`deposit-date-${deposit.id}`}>{deposit.depotime}</TableCell>
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
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleVerify(deposit.id)} data-testid={`btn-verify-${deposit.id}`}>
                          <CheckIcon className="w-4 h-4" />
                          <span className="sr-only">Verifikasi</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleReject(deposit.id)} data-testid={`btn-reject-${deposit.id}`}>
                          <XIcon className="w-4 h-4" />
                          <span className="sr-only">Tolak</span>
                        </Button>
                      </>
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
