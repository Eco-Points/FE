import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FilePenIcon, MoveVerticalIcon, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Layout from "@/components/layout";

export default function ManageRewards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory] = useState("all");
  const [selectedPoints, setSelectedPoints] = useState("all");
  const rewards = [
    {
      id: 1,
      name: "Bibit Pohon",
      points: 500,
      description: "Dapatkan bibit pohon untuk ditanam di lingkungan Anda.",
      createdAt: "2023-05-01",
      category: "Organik",
    },
    {
      id: 2,
      name: "Tumbler Eksklusif",
      points: 300,
      description: "Dapatkan tumbler eksklusif dengan desain ramah lingkungan.",
      category: "Fashion",
    },
    {
      id: 3,
      name: "Komposter Komersial",
      points: 800,
      description: "Komposter komersial untuk mengolah sampah organik Anda.",
      category: "Peralatan",
    },
    {
      id: 4,
      name: "Buku Panduan Daur Ulang",
      points: 200,
      description: "Buku panduan lengkap tentang cara mendaur ulang berbagai jenis sampah.",
      category: "Edukasi",
    },
    {
      id: 5,
      name: "Tas Belanja Ramah Lingkungan",
      points: 150,
      description: "Tas belanja yang terbuat dari bahan ramah lingkungan.",
      category: "Fashion",
    },
    {
      id: 6,
      name: "Peralatan Kebun Organik",
      points: 400,
      description: "Peralatan kebun yang terbuat dari bahan organik.",
      category: "Peralatan Dapur",
    },
  ];
  const filteredRewards = useMemo(() => {
    return rewards.filter((reward) => {
      const nameMatch = reward.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = selectedCategory === "all" || reward.category === selectedCategory;
      const pointsMatch = selectedPoints === "all" || reward.points <= parseInt(selectedPoints);
      return nameMatch && categoryMatch && pointsMatch;
    });
  }, [searchTerm, selectedCategory, selectedPoints]);

  return (
    <Layout>
      <div className="bg-white p-6 md:py-12 mx-4 md:mx-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">Kelola Hadiah</h1>
          <Button size="sm" className="bg-green-600">
            <a href="/admin/add-reward">Tambah Hadiah</a>
          </Button>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Input type="text" placeholder="Cari hadiah..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-gray-100 border-none focus:ring-0 focus:border-none" />
            <Select value={selectedPoints} onValueChange={(value) => setSelectedPoints(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Semua Poin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="200">200 Poin</SelectItem>
                <SelectItem value="400">400 Poin</SelectItem>
                <SelectItem value="600">600 Poin</SelectItem>
                <SelectItem value="800">800 Poin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Hadiah</TableHead>
                <TableHead>Poin Diperlukan</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRewards.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell className="font-medium">{reward.name}</TableCell>
                  <TableCell>{reward.points}</TableCell>
                  <TableCell>{reward.description}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                          <MoveVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FilePenIcon className="h-4 w-4 mr-2" />
                          <a href="/admin/edit-reward">Edit</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
