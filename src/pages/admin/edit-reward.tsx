import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

export default function EditReward() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-background rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-green-700">Edit Hadiah</h1>
            </div>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Hadiah</Label>
                <Input id="name" type="text" placeholder="Masukkan nama hadiah" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea id="description" placeholder="Masukkan deskripsi hadiah" className="min-h-[100px]" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="points">Poin yang Dibutuhkan</Label>
                <Input id="points" type="number" placeholder="Masukkan jumlah poin" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Gambar Hadiah</Label>
                <Input id="image" type="file" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="bg-green-700 text-white">Simpan Hadiah</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
