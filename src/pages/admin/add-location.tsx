import { Link } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout";

export default function AddLocation() {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen py-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-green-700">Tambahkan Lokasi Baru</CardTitle>
            <CardDescription>Isi detail di bawah ini untuk menambahkan lokasi baru.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Input id="address" placeholder="Masukkan alamat" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Garis Bujur (Longitude)</Label>
                  <Input id="longitude" type="text" placeholder="Masukkan garis bujur" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Garis Lintang (Latitude)</Label>
                  <Input id="latitude" type="text" placeholder="Masukkan garis lintang" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Tidak Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Waktu Mulai</Label>
                  <Input id="start-time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">Waktu Selesai</Label>
                  <Input id="end-time" type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" type="tel" placeholder="Masukkan nomor telepon" />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex gap-4 justify-end">
            <Button variant="outline" className="border border-green-400" asChild>
              <Link to={"/admin/dashboard"}>Kembali</Link>
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Tambahkan Lokasi
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
