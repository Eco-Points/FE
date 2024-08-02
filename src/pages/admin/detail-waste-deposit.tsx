import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout";

import { getDepositById, updateDepositStatus } from "@/utils/apis/admin-waste-deposit";
import { IGetDeposit } from "@/utils/types/admin-waste-deposit";
import { formatDate } from "@/utils/function";

export default function DetailWasteDeposit() {
  const { deposit_id } = useParams<{ deposit_id: string }>();
  const [deposit, setDeposit] = useState<IGetDeposit | null>(null);

  useEffect(() => {
    if (deposit_id) {
      fetchDeposit(Number(deposit_id));
    }
  }, [deposit_id]);

  const fetchDeposit = async (id: number) => {
    try {
      const response = await getDepositById(id);
      setDeposit(response.data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleStatusUpdate = async (status: "verified" | "rejected") => {
    if (deposit) {
      try {
        await updateDepositStatus(deposit.id, status);
        setDeposit({ ...deposit, status });
        toast.success(`Penyetoran sampah berhasil ${status === "verified" ? "diverifikasi" : "ditolak"}.`);
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  return (
    <Layout>
      <Card className="w-full max-w-4xl my-4 md:my-8 mx-auto" data-testid="detail-waste-deposit-card">
        <CardHeader>
          <CardTitle className="text-green-800" data-testid="card-title">
            Detail Penyetoran Sampah
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div data-testid="depositor-name">
              <Label>Nama Penyetor</Label>
              <p>{deposit?.fullname}</p>
            </div>
            <div data-testid="waste-category">
              <Label>Kategori Sampah</Label>
              <p>{deposit?.type}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div data-testid="waste-quantity">
              <Label>Jumlah Sampah</Label>
              <p>{deposit?.quantity}</p>
            </div>
            <div data-testid="deposit-time">
              <Label>Tanggal Penyetoran</Label>
              <p>{formatDate(deposit?.depotime || "")}</p>
            </div>
          </div>
        </CardContent>
        {deposit?.status.toLowerCase() === "pending" && (
          <CardFooter className="flex justify-end gap-2" data-testid="card-footer">
            <Button variant="destructive" onClick={() => handleStatusUpdate("rejected")} data-testid="reject-button">
              Tolak
            </Button>
            <Button className="bg-green-700" onClick={() => handleStatusUpdate("verified")} data-testid="verify-button">
              Verifikasi
            </Button>
          </CardFooter>
        )}
      </Card>
    </Layout>
  );
}
