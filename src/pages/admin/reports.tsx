import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout";
import LineChartComponent from "@/components/component/line-chart";
import PieChart from "@/components/component/pie-chart";

import { ChartProvider } from "@/utils/contexts/chartContext";
import { getlocation } from "@/utils/apis/waste-location";
import { fetchDeposit, fetchReward } from "@/utils/apis/report";
import { IGetLocation } from "@/utils/types/waste-location";
import { iReportDeposit, iResponeReportDeposit, DepositStatistic, iResponeReportReward, iReportReward, RewardStatistic } from "@/utils/types/report";

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Component: React.FC = () => {
  const [rewardData, setRewardData] = useState<RewardStatistic[]>([]);
  const [loadingReward, setLoadingReward] = useState(true);
  const [depositData, setDepositData] = useState<DepositStatistic[]>([]);
  const [loadingDeposit, setLoadingDeposit] = useState(true);
  const [locations, setLocations] = useState<IGetLocation[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startDatePie, setStartDatePie] = useState<Date | undefined>(undefined);
  const [endDatePie, setEndDatePie] = useState<Date>(new Date());
  const [selectedTrashType, setSelectedTrashType] = useState<string | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await getlocation();
        setLocations(locationsResponse);

        const depositParams: iReportDeposit = {
          trash_id: selectedTrashType ?? undefined,
          location_id: selectedLocation !== undefined ? selectedLocation.toString() : undefined,
          start_date: startDate ? formatDate(startDate) : "01-07-2024",
          end_date: endDate ? formatDate(endDate) : formatDate(new Date()),
        };

        const depositResponse: iResponeReportDeposit = await fetchDeposit(depositParams);
        setDepositData(depositResponse.data || []);

        const rewardParams: iReportReward = {
          start_date: startDatePie ? formatDate(startDatePie) : "01-07-2024",
          end_date: endDatePie ? formatDate(endDatePie) : formatDate(new Date()),
        };

        const rewardResponse: iResponeReportReward = await fetchReward(rewardParams);
        setRewardData(rewardResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingDeposit(false);
        setLoadingReward(false);
      }
    };

    fetchData();
  }, [startDate, endDate, startDatePie, endDatePie, selectedTrashType, selectedLocation]);

  if (loadingDeposit || loadingReward) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <ChartProvider>
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 md:py-12 px-4 md:px-8">
          <Card className="bg-white shadow-lg rounded-lg border border-gray-200">
            <CardHeader className="border-b border-gray-200 pb-4">
              <CardTitle className="text-2xl font-semibold text-gray-800">Laporan Penyetoran Sampah</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Lihat jumlah penyetoran sampah berdasarkan jenis, lokasi, atau tanggal.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="waste-type" className="text-lg font-medium">
                    Jenis Sampah
                  </Label>
                  <Select onValueChange={(value) => setSelectedTrashType(value === "0" ? undefined : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Jenis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Semua Jenis</SelectItem>
                      <SelectItem value="1">Kertas</SelectItem>
                      <SelectItem value="2">Plastik</SelectItem>
                      <SelectItem value="3">Logam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="location" className="text-lg font-medium">
                    Lokasi
                  </Label>
                  <Select onValueChange={(value) => setSelectedLocation(value === "0" ? undefined : Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Semua Lokasi</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id.toString()}>
                          {location.address || "Alamat tidak tersedia"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="start-date" className="text-lg font-medium">
                    Tanggal Mulai (Grafik Penyetoran)
                  </Label>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate ? startDate.toISOString().split("T")[0] : ""}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                    className="w-full border border-gray-300 p-2 rounded-lg shadow-sm"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="end-date" className="text-lg font-medium">
                    Tanggal Akhir (Grafik Penyetoran)
                  </Label>
                  <input type="date" id="end-date" value={endDate.toISOString().split("T")[0]} onChange={(e) => setEndDate(new Date(e.target.value))} className="w-full border border-gray-300 p-2 rounded-lg shadow-sm" />
                </div>
              </div>
              <div className="mt-6">
                <LineChartComponent data={depositData} />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg rounded-lg border border-gray-200">
            <CardHeader className="border-b border-gray-200 pb-4">
              <CardTitle className="text-2xl font-semibold text-gray-800">Laporan Penggunaan Poin</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Lihat penggunaan poin berdasarkan hadiah, pengguna, atau tanggal.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="start-date-pie" className="text-lg font-medium">
                    Tanggal Mulai
                  </Label>
                  <input
                    type="date"
                    id="start-date-pie"
                    value={startDatePie ? startDatePie.toISOString().split("T")[0] : ""}
                    onChange={(e) => setStartDatePie(new Date(e.target.value))}
                    className="w-full border border-gray-300 p-2 rounded-lg shadow-sm"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="end-date-pie" className="text-lg font-medium">
                    Tanggal Akhir
                  </Label>
                  <input type="date" id="end-date-pie" value={endDatePie.toISOString().split("T")[0]} onChange={(e) => setEndDatePie(new Date(e.target.value))} className="w-full border border-gray-300 p-2 rounded-lg shadow-sm" />
                </div>
              </div>
              <div className="mt-6">
                <PieChart data={rewardData} />
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </ChartProvider>
  );
};

export default Component;
