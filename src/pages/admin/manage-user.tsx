import { useEffect, useState } from "react";
import { FilePenIcon, MoveVerticalIcon, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout";
import { Link } from "react-router-dom";
import { getUsers } from "@/utils/apis/admin-user";
import { getUsersType } from "@/utils/types/users";
import { toast } from "sonner";

export default function ManageUser() {
  const [users, setUsers] = useState<getUsersType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        console.log("Data received from API:", data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="bg-white p-6 md:py-12 mx-4 md:mx-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-green-900 font-bold">Kelola Pengguna</h1>
          <div className="flex items-center gap-4">
            <Input type="text" placeholder="Cari pengguna..." className="text-green-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tanggal Registrasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.register_datetime || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "secondary" : user.status === "suspended" ? "outline" : "default"}>{user.status || "Unknown"}</Badge>
                  </TableCell>
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
                          <Link to={`/admin/edit-user/${user.id}`}>Edit</Link>
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
