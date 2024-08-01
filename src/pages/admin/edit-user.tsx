import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout";

import { editUserStatus, getUserById } from "@/utils/apis/admin-user";
import { ProfileType } from "@/utils/types/users";

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const [userData, setUserData] = useState<ProfileType | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = parseInt(id!);
      console.log("User ID:", userId);
      if (isNaN(userId)) {
        toast.error("Invalid user ID");
        return;
      }
      try {
        const data = await getUserById(userId);
        setUserData(data);
        setStatus(data.status);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSave = async () => {
    const userId = parseInt(id!);
    if (isNaN(userId)) {
      toast.error("Invalid user ID");
      return;
    }
    try {
      await editUserStatus(userId, status);
      toast.success("Status pengguna berhasil diperbarui!");
      navigate("/admin/manage-users");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle data-testid="card-title">Edit Status Pengguna</CardTitle>
            <CardDescription data-testid="card-description">Edit status akun pengguna yang terdaftar di aplikasi.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="fullname" data-testid="label-fullname">
                  Nama Pengguna
                </Label>
                <p data-testid="fullname">{userData.fullname}</p>
              </div>
              <div>
                <Label htmlFor="email" data-testid="label-email">
                  Email
                </Label>
                <p data-testid="email">{userData.email}</p>
              </div>
              <div>
                <Label htmlFor="phone" data-testid="label-phone">
                  Telepon
                </Label>
                <p data-testid="phone">{userData.phone}</p>
              </div>
              <div>
                <Label htmlFor="address" data-testid="label-address">
                  Alamat
                </Label>
                <p data-testid="address">{userData.address}</p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="status" data-testid="label-status">
                  Status Akun
                </Label>
                <Select onValueChange={(value) => setStatus(value)} value={status} data-testid="select-status">
                  <SelectTrigger id="status" aria-label="Pilih status akun">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="ghost" className="text-muted-foreground" onClick={() => navigate("/admin/manage-users")} data-testid="btn-cancel">
              Batalkan
            </Button>
            <Button className="bg-green-700 text-white hover:bg-green-800" onClick={handleSave} data-testid="btn-save">
              Simpan Perubahan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
