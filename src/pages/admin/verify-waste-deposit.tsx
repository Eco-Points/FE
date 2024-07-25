import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import Layout from "@/components/layout";

export default function VerifyWasteDeposit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deposits, setDeposits] = useState([
    {
      id: 1,
      user: "John Doe",
      type: "Plastic",
      amount: 10,
      date: "2023-05-01",
      status: "Pending",
    },
    {
      id: 2,
      user: "Jane Smith",
      type: "Paper",
      amount: 5,
      date: "2023-05-02",
      status: "Verified",
    },
    {
      id: 3,
      user: "Bob Johnson",
      type: "Metal",
      amount: 3,
      date: "2023-05-03",
      status: "Rejected",
    },
    {
      id: 4,
      user: "Alice Williams",
      type: "Glass",
      amount: 8,
      date: "2023-05-04",
      status: "Pending",
    },
    {
      id: 5,
      user: "Tom Davis",
      type: "Plastic",
      amount: 12,
      date: "2023-05-05",
      status: "Verified",
    },
  ]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };
  const handleVerify = (id) => {
    setDeposits(deposits.map((deposit) => (deposit.id === id ? { ...deposit, status: "Verified" } : deposit)));
  };
  const handleReject = (id) => {
    setDeposits(deposits.map((deposit) => (deposit.id === id ? { ...deposit, status: "Rejected" } : deposit)));
  };
  const filteredDeposits = deposits.filter((deposit) => {
    if (filterStatus === "all") {
      return deposit.user.toLowerCase().includes(searchTerm.toLowerCase()) || deposit.type.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        deposit.status.toLowerCase() === filterStatus.toLowerCase() &&
        (deposit.user.toLowerCase().includes(searchTerm.toLowerCase()) || deposit.type.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  });
  return (
    <Layout>
      <div className="bg-white dark:bg-gray-950 text-gray-950 dark:text-white p-6 mx-4 md:mx-6 md:py-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-green-900">Verifikasi Penyetoran Sampah</h1>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Cari penyetoran..."
              value={searchTerm}
              onChange={handleSearch}
              className="bg-gray-100 dark:bg-gray-800 text-gray-950 dark:text-white"
            />
            <Select value={filterStatus} onValueChange={handleFilterStatus}>
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
                <TableRow key={deposit.id}>
                  <TableCell>{index + 1}</TableCell>
                  <a href="/admin/detail-waste-deposit">
                    <TableCell>{deposit.user}</TableCell>
                  </a>
                  <TableCell>{deposit.type}</TableCell>
                  <TableCell>{deposit.amount}</TableCell>
                  <TableCell>{deposit.date}</TableCell>
                  <TableCell>
                    <Badge variant={deposit.status === "Pending" ? "secondary" : deposit.status === "Verified" ? "default" : "destructive"}>
                      {deposit.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {deposit.status === "Pending" && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleVerify(deposit.id)}>
                          <CheckIcon className="w-4 h-4" />
                          <span className="sr-only">Verifikasi</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleReject(deposit.id)}>
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
