import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CartesianGrid, XAxis, Line, LineChart } from "recharts";
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart";
import Layout from "@/components/layout";
import React from "react";
import PiechartcustomChart from "../../components/ui/PiechartcustomChart";

export default function Component() {
  return (
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
                    <Calendar /> {/* Removed mode="range" */}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="mt-6">
              <LinechartChart className="aspect-[4/3]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Laporan Penggunaan Poin</CardTitle>
            <CardDescription>Lihat penggunaan poin berdasarkan hadiah, pengguna, atau tanggal.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reward">Hadiah</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Hadiah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="voucher">Voucher Belanja</SelectItem>
                    <SelectItem value="merchandise">Merchandise</SelectItem>
                    <SelectItem value="donation">Donasi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="user">Pengguna</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Pengguna" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">Pengguna 1</SelectItem>
                    <SelectItem value="user2">Pengguna 2</SelectItem>
                    <SelectItem value="user3">Pengguna 3</SelectItem>
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
                    <Calendar disabled={(date) => date > new Date()} captionLayout="dropdown-buttons" fromDate={new Date("1900-01-01")} toDate={new Date()} initialFocus /> {/* Removed mode="range" */}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="mt-6">
              <PiechartcustomChart className="aspect-[4/3]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

type ChartProps = React.HTMLAttributes<HTMLDivElement>;

function LinechartChart(props: ChartProps) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
