import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout";
import { editUserStatus, getUserById } from "@/utils/apis/admin-user";
import { toast } from "sonner";
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
            <CardTitle>Edit Status Pengguna</CardTitle>
            <CardDescription>Edit status akun pengguna yang terdaftar di aplikasi.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label>Nama Pengguna</Label>
                <p>{userData.fullname}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p>{userData.email}</p>
              </div>
              <div>
                <Label>Telepon</Label>
                <p>{userData.phone}</p>
              </div>
              <div>
                <Label>Alamat</Label>
                <p>{userData.address}</p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="status">Status Akun</Label>
                <Select onValueChange={(value) => setStatus(value)} value={status}>
                  <SelectTrigger id="status" aria-label="Pilih status akun">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="ghost" className="text-muted-foreground" onClick={() => navigate("/admin/manage-users")}>
              Batalkan
            </Button>
            <Button className="bg-green-700 text-white hover:bg-green-800" onClick={handleSave}>
              Simpan Perubahan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
