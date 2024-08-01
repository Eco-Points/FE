import { BarChartIcon, GiftIcon, UsersIcon, WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import Layout from "@/components/layout";

import { getDashboard } from "@/utils/apis/admin-user";
import { dashboardType } from "@/utils/types/admin";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<dashboardType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboard();
        console.log("Data received from API:", data);
        setDashboardData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: {error}</div>;
  }

  if (!dashboardData) {
    return <div data-testid="no-data">No data available</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col my-4 md:my-12 md:mx-6" data-testid="admin-dashboard">
        <div className="flex h-14 items-center gap-4 px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold text-green-800 md:text-2xl" data-testid="dashboard-title">
              Dashboard
            </h1>
          </div>
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card data-testid="user-count-card">
              <CardHeader>
                <CardDescription>Total Pengguna</CardDescription>
                <CardTitle>{dashboardData.user_count}</CardTitle>
              </CardHeader>
            </Card>
            <Card data-testid="deposit-count-card">
              <CardHeader>
                <CardDescription>Total Setoran</CardDescription>
                <CardTitle>{dashboardData.deposit_count}</CardTitle>
              </CardHeader>
            </Card>
            <Card data-testid="exchange-count-card">
              <CardHeader>
                <CardDescription>Hadiah Ditukarkan</CardDescription>
                <CardTitle>{dashboardData.exchange_count}</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="flex flex-col justify-between" data-testid="manage-users-card">
              <CardHeader>
                <CardTitle>Manajemen Pengguna</CardTitle>
                <CardDescription>Kelola akun dan profil pengguna.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/admin/manage-users" className="inline-flex items-center gap-2 text-green-600" data-testid="manage-users-link">
                  <UsersIcon className="h-4 w-4" />
                  Lihat Pengguna
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-between" data-testid="verify-deposits-card">
              <CardHeader>
                <CardTitle>Verifikasi Setoran</CardTitle>
                <CardDescription>Review dan verifikasi setoran pengguna.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/admin/verify-waste-deposit" className="inline-flex items-center gap-2 text-green-600" data-testid="verify-deposits-link">
                  <WalletIcon className="h-4 w-4" />
                  Verifikasi Setoran
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-between" data-testid="manage-rewards-card">
              <CardHeader>
                <CardTitle>Manajemen Hadiah</CardTitle>
                <CardDescription>Kelola hadiah dan penukaran.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/admin/manage-rewards" className="inline-flex items-center gap-2 text-green-600" data-testid="manage-rewards-link">
                  <GiftIcon className="h-4 w-4" />
                  Kelola Hadiah
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-between" data-testid="reports-card">
              <CardHeader>
                <CardTitle>Laporan & Statistik</CardTitle>
                <CardDescription>Lihat laporan dan analitik terperinci.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/admin/reports" className="inline-flex items-center gap-2 text-green-600" data-testid="reports-link">
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
