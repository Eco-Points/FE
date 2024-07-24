import Layout from "../../components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

const EditProfile = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center my-2 mx-2 md:mx-auto md:my-6">
        <Card className="w-full max-w-[600px] p-2 sm:p-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 font-bold">Edit Profil</CardTitle>
            <CardDescription className="text-muted-foreground">Perbarui informasi profilmu</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" placeholder="Masukkan nama lengkap" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Masukkan email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" type="tel" placeholder="Masukkan nomor telepon" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Alamat</Label>
                <Textarea id="address" placeholder="Masukkan alamat" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profile-picture">Foto Profil</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Ubah Foto
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Batal</Button>
            <Button className="bg-[#00a65a] text-white hover:bg-[#008d4c]">Simpan Perubahan</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default EditProfile;
