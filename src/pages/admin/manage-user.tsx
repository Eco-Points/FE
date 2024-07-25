import { FilePenIcon, MoveVerticalIcon, TrashIcon } from "lucide-react";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout";
import { Link } from "react-router-dom";

export default function ManageUser() {
  const user = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      registeredAt: "2023-04-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      registeredAt: "2022-11-20",
      status: "Suspended",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      registeredAt: "2021-07-01",
      status: "Active",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      registeredAt: "2020-02-28",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Tom Davis",
      email: "tom@example.com",
      registeredAt: "2019-09-10",
      status: "Active",
    },
  ];

  return (
    <Layout>
      <div className="bg-white p-6 md:py-12 mx-4 md:mx-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-green-900 font-bold">Kelola Pengguna</h1>
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Cari pengguna..."
              className="text-green-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
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
              {user.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.registeredAt}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "secondary" : user.status === "Suspended" ? "outline" : "default"}>{user.status}</Badge>
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
                          <Link to="/admin/edit-user">Edit</Link>
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
