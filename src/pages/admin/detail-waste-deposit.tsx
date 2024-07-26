import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

export default function DetailWasteDeposit() {
  return (
    <Layout>
      <Card className="w-full max-w-4xl my-4 md:my-8 mx-auto">
        <CardHeader>
          <CardTitle className="text-green-800">Detail Penyetoran Sampah</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nama Penyetor</Label>
              <p>Jhon Doe</p>
            </div>
            <div>
              <Label>Kategori Sampah</Label>
              <p>Plastik</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Jumlah Sampah</Label>
              <p>10</p>
            </div>
            <div>
              <Label>Tanggal Penyetoran</Label>
              <p>24 Juli 2024</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="destructive">Tolak</Button>
          <Button className="bg-green-700">Verifikasi</Button>
        </CardFooter>
      </Card>
    </Layout>
  );
}
