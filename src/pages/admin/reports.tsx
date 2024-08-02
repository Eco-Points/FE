// Component.tsx
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Layout from "@/components/layout";
import LinechartChart from "@/components/ui/line-chart-chart";
import PiechartcustomChart from "@/components/ui/PiechartcustomChart";
import { fetchDepositReport, fetchRewardReport } from "@/utils/apis/report";
import { ChartProvider } from "@/utils/contexts/chartContext";

const Component: React.FC = () => {
  const [depositData, setDepositData] = useState<any[]>([]);
  const [rewardData, setRewardData] = useState<any[]>([]);
  const [loadingDeposit, setLoadingDeposit] = useState(true);
  const [loadingReward, setLoadingReward] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const depositParams = {
          trash_id: 1,
          location_id: 1,
          start_date: "01-07-2024",
          end_date: "31-07-2024",
        };
        const rewardParams = {
          start_date: "01-07-2024",
          end_date: "31-07-2024",
        };

        const [depositResponse, rewardResponse] = await Promise.all([fetchDepositReport(depositParams), fetchRewardReport(rewardParams)]);

        setDepositData(depositResponse);
        setRewardData(rewardResponse);
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoadingDeposit(false);
        setLoadingReward(false);
      }
    };

    fetchData();
  }, []);

  if (loadingDeposit || loadingReward) {
    return <div>Loading...</div>;
  }

  return (
    <ChartProvider>
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 md:py-12 px-2 md:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Penyetoran Sampah</CardTitle>
              <CardDescription>Lihat jumlah penyetoran sampah berdasarkan jenis, lokasi, atau tanggal.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="waste-type">Jenis Sampah</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Jenis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plastic">Plastik</SelectItem>
                      <SelectItem value="paper">Kertas</SelectItem>
                      <SelectItem value="metal">Logam</SelectItem>
                      <SelectItem value="glass">Kaca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jakarta">Jakarta</SelectItem>
                      <SelectItem value="bandung">Bandung</SelectItem>
                      <SelectItem value="surabaya">Surabaya</SelectItem>
                      <SelectItem value="medan">Medan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-range">Tanggal</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start font-normal">
                        <div className="mr-2 h-4 w-4 opacity-50" />
                        Pilih Rentang Tanggal
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="mt-6">
                <LinechartChart data={depositData} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Laporan Penggunaan Poin</CardTitle>
              <CardDescription>Lihat penggunaan poin berdasarkan hadiah, pengguna, atau tanggal.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="date-range">Tanggal</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start font-normal">
                      <div className="mr-2 h-4 w-4 opacity-50" />
                      Pilih Rentang Tanggal
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mt-6">
                <PiechartcustomChart data={rewardData} />
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </ChartProvider>
  );
};

export default Component;
