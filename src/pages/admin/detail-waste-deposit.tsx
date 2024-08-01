import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout";

import { getDepositById, updateDepositStatus } from "@/utils/apis/admin-waste-deposit";
import { IGetDeposit } from "@/utils/types/admin-waste-deposit";

export default function DetailWasteDeposit() {
  const { deposit_id } = useParams<{ deposit_id: string }>();
  const [deposit, setDeposit] = useState<IGetDeposit | null>(null);

  useEffect(() => {
    if (deposit_id) {
      fetchDeposit(+deposit_id);
    }
  }, [deposit_id]);

  async function fetchDeposit(deposit_id: number) {
    try {
      const response = await getDepositById(deposit_id);
      setDeposit(response.data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const handleVerify = async () => {
    if (deposit) {
      try {
        await updateDepositStatus(deposit.id, "verified");
        setDeposit({ ...deposit, status: "verified" });
        toast.success("Penyetoran sampah berhasil diverifikasi.");
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  const handleReject = async () => {
    if (deposit) {
      try {
        await updateDepositStatus(deposit.id, "rejected");
        setDeposit({ ...deposit, status: "rejected" });
        toast.success("Penyetoran sampah berhasil ditolak.");
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
              <p>{deposit && deposit.fullname}</p>
            </div>
            <div data-testid="waste-category">
              <Label>Kategori Sampah</Label>
              <p>{deposit && deposit.type}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div data-testid="waste-quantity">
              <Label>Jumlah Sampah</Label>
              <p>{deposit && deposit.quantity}</p>
            </div>
            <div data-testid="deposit-time">
              <Label>Tanggal Penyetoran</Label>
              <p>{deposit && deposit.depotime}</p>
            </div>
          </div>
        </CardContent>
        {deposit && deposit.status.toLowerCase() === "pending" && (
          <CardFooter className="flex justify-end gap-2" data-testid="card-footer">
            <Button variant="destructive" onClick={handleReject} data-testid="reject-button">
              Tolak
            </Button>
            <Button className="bg-green-700" onClick={handleVerify} data-testid="verify-button">
              Verifikasi
            </Button>
          </CardFooter>
        )}
      </Card>
    </Layout>
  );
}
