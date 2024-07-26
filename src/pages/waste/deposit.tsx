import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout";

export default function WasteDeposit() {
  return (
    <Layout>
      <div className="w-full max-w-md mx-auto py-8 border shadow-md my-4 md:my-8 px-2 md:px-8 rounded-lg">
        <div className="text-start mb-6">
          <h1 className="text-2xl font-bold text-green-700">Setor Sampah</h1>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="waste-type">Jenis Sampah</Label>
            <Select name="waste-type">
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis sampah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plastic">Plastik</SelectItem>
                <SelectItem value="metal">Kaleng</SelectItem>
                <SelectItem value="paper">Kertas</SelectItem>
                <SelectItem value="glass">Kaca</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity">Jumlah Satuan</Label>
            <Input id="quantity" type="number" placeholder="Masukkan jumlah" />
          </div>
          <div>
            <Label htmlFor="location">Pilih Lokasi Penyetoran</Label>
            <Select name="location">
              <SelectTrigger>
                <SelectValue placeholder="Pilih lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="location1">EcoPoint A</SelectItem>
                <SelectItem value="location2">EcoPoint B</SelectItem>
                <SelectItem value="location3">EcoPoint C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date-time">Tanggal dan Waktu</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start font-normal">
                  Pilih tanggal dan waktu
                  <div className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar />
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" className="w-full bg-green-700 text-white">
            Setor
          </Button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-green-700 font-medium">Terima kasih telah menyetor sampah! Poin Anda akan segera diperbarui.</p>
        </div>
      </div>
    </Layout>
  );
}
