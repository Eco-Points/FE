import { BarChartIcon, GiftIcon, UsersIcon, WalletIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import Layout from "@/components/layout";

export default function AdminDashboard() {
  return (
    <Layout>
      <div className="flex flex-col my-4 md:my-12 md:mx-6">
        <div className="flex h-14 items-center gap-4 px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold text-green-800 md:text-2xl">Dashboard</h1>
          </div>
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardDescription>Total Pengguna</CardDescription>
                <CardTitle>12.345</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Total Setoran</CardDescription>
                <CardTitle>678</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Hadiah Ditukarkan</CardDescription>
                <CardTitle>3.456</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Manajemen Pengguna</CardTitle>
                <CardDescription>Kelola akun dan profil pengguna.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/admin/manage-user" className="inline-flex items-center gap-2 text-green-600">
                  <UsersIcon className="h-4 w-4" />
                  Lihat Pengguna
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Verifikasi Setoran</CardTitle>
                <CardDescription>Review dan verifikasi setoran pengguna.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/admin/verify-waste-deposit" className="inline-flex items-center gap-2 text-green-600">
                  <WalletIcon className="h-4 w-4" />
                  Verifikasi Setoran
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Manajemen Hadiah</CardTitle>
                <CardDescription>Kelola hadiah dan penukaran.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/admin/manage-rewards" className="inline-flex items-center gap-2 text-green-600">
                  <GiftIcon className="h-4 w-4" />
                  Kelola Hadiah
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Laporan & Statistik</CardTitle>
                <CardDescription>Lihat laporan dan analitik terperinci.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/admin/reports" className="inline-flex items-center gap-2 text-green-600">
                  <BarChartIcon className="h-4 w-4" />
                  Lihat Laporan
                </Link>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </Layout>
  );
}
