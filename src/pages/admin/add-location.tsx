import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout";
import { LocationFormData, addLocationSchema } from "@/utils/types/waste-location";
import { addLocation as addLocationAPI } from "@/utils/apis/waste-location";
import { toast } from "sonner";

export default function AddLocation() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(addLocationSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LocationFormData) => {
    try {
      await addLocationAPI(data);
      console.log("Location added:", data);
      toast.success("Lokasi baru ditambahkan");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen py-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-green-700">Tambahkan Lokasi Baru</CardTitle>
            <CardDescription>Isi detail di bawah ini untuk menambahkan lokasi baru.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Input id="address" {...register("address")} placeholder="Masukkan alamat" />
                  {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="long">Garis Bujur (Longitude)</Label>
                  <Input id="long" {...register("long")} placeholder="Masukkan garis bujur" />
                  {errors.long && <p className="text-red-500">{errors.long.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Garis Lintang (Latitude)</Label>
                  <Input id="lat" {...register("lat")} placeholder="Masukkan garis lintang" />
                  {errors.lat && <p className="text-red-500">{errors.lat.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={(value) => field.onChange(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Aktif</SelectItem>
                          <SelectItem value="inactive">Tidak Aktif</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start">Waktu Mulai</Label>
                  <Input id="start" type="time" {...register("start")} />
                  {errors.start && <p className="text-red-500">{errors.start.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">Waktu Selesai</Label>
                  <Input id="end" type="time" {...register("end")} />
                  {errors.end && <p className="text-red-500">{errors.end.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" type="tel" {...register("phone")} placeholder="Masukkan nomor telepon" />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
              </div>
              <CardFooter className="flex gap-4 justify-end">
                <Button variant="outline" className="border border-green-400" asChild>
                  <Link to="/admin/dashboard">Kembali</Link>
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Tambahkan Lokasi
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
