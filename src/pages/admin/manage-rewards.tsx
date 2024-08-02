import { FilePenIcon, MoveVerticalIcon, TrashIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout";

import { deleteReward, getRewards } from "@/utils/apis/rewards";
import { IReward } from "@/utils/types/rewards";

export default function ManageRewards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rewards, setRewards] = useState<IReward[]>([]);
  const [filteredRewards, setFilteredRewards] = useState<IReward[]>([]);

  useEffect(() => {
    fetchRewards();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRewards(rewards);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredRewards(rewards.filter((reward) => reward.name.toLowerCase().includes(term)));
    }
  }, [searchTerm, rewards]);

  const fetchRewards = async () => {
    try {
      const response = await getRewards();
      setRewards(response.data || []);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleDeleteReward = async (rewardId: number) => {
    try {
      const response = await deleteReward(rewardId);
      fetchRewards();
      toast.success(response.message);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Layout>
      <div className="bg-white p-6 md:py-12 mx-4 md:mx-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700" data-testid="header-title">
            Kelola Hadiah
          </h1>
        </div>
        <div className="mb-6 flex items-center gap-4 justify-between">
          <Input
            type="text"
            placeholder="Cari hadiah..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-100 border-none focus:ring-0 max-w-xs focus:border-none"
            data-testid="input-search"
          />
          <Button size="sm" className="bg-green-600" asChild data-testid="btn-add-reward">
            <Link to="/admin/add-reward">Tambah Hadiah</Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Hadiah</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Poin Diperlukan</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRewards.map((reward) => (
                <TableRow key={reward.reward_id} data-testid={`reward-row-${reward.reward_id}`}>
                  <TableCell className="font-medium" data-testid={`reward-name-${reward.reward_id}`}>
                    {reward.name}
                  </TableCell>
                  <TableCell data-testid={`reward-description-${reward.reward_id}`}>{reward.description}</TableCell>
                  <TableCell data-testid={`reward-points-${reward.reward_id}`}>{reward.point_required}</TableCell>
                  <TableCell data-testid={`reward-stock-${reward.reward_id}`}>{reward.stock}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" data-testid={`btn-menu-${reward.reward_id}`}>
                          <MoveVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/edit-reward/${reward.reward_id}`} className="flex" data-testid={`btn-edit-${reward.reward_id}`}>
                            <FilePenIcon className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteReward(reward.reward_id)} data-testid={`btn-delete-${reward.reward_id}`}>
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Hapus
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
