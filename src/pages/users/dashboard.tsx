import { ArrowRightIcon, GiftIcon, HistoryIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout";

import { ProfileType } from "@/utils/types/users";
import { getProfile } from "@/utils/apis/users";

export default function DashboardUser() {
  const [user, setUser] = useState<ProfileType>();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      toast.error("Gagal memuat data profil pengguna.");
    }
  };

  return (
    <Layout>
      <section className="flex-1 py-4 md:py-12 px-4 md:px-6">
        <div className="md:container mx-auto">
          <h1 className="text-3xl font-bold text-green-700 mb-8" data-testid="dashboard-title">
            Dashboard
          </h1>
          <div className="mb-8">
            <h2 className="text-lg font-bold" data-testid="welcome-message">
              Selamat datang, {user?.fullname || "Pengguna"}
            </h2>
            <p className="text-gray-700" data-testid="points-balance">
              Saldo Poin: <span className="font-bold">{user?.point || 0}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8" data-testid="dashboard-links">
            <Link
              to="/waste/deposit"
              className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg p-6 hover:from-green-500 hover:to-green-700 transition-transform transform hover:scale-105"
              data-testid="deposit-link"
            >
              <div className="flex items-center gap-4">
                <TrashIcon className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-semibold">Setor Sampah</h3>
                  <p className="text-sm">Setorkan sampahmu untuk mendapatkan poin!</p>
                </div>
              </div>
            </Link>
            <Link
              to="/waste/history"
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg p-6 hover:from-blue-500 hover:to-blue-700 transition-transform transform hover:scale-105"
              data-testid="history-link"
            >
              <div className="flex items-center gap-4">
                <HistoryIcon className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-semibold">Riwayat Penyetoran</h3>
                  <p className="text-sm">Lihat riwayat penyetoran sampahmu.</p>
                </div>
              </div>
            </Link>
            <Link
              to="/points/redeem"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg shadow-lg p-6 hover:from-yellow-500 hover:to-yellow-700 transition-transform transform hover:scale-105"
              data-testid="redeem-link"
            >
              <div className="flex items-center gap-4">
                <GiftIcon className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-semibold">Tukar Poin</h3>
                  <p className="text-sm">Tukarkan poinmu dengan hadiah menarik.</p>
                </div>
              </div>
            </Link>
            <Link
              to="/points/history"
              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg shadow-lg p-6 hover:from-purple-500 hover:to-purple-700 transition-transform transform hover:scale-105"
              data-testid="history-redeem-link"
            >
              <div className="flex items-center gap-4">
                <HistoryIcon className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-semibold">Riwayat Tukar Poin</h3>
                  <p className="text-sm">Lihat riwayat Penukaran Poinmu.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="pb-12 px-4 md:px-6">
        <div className="md:container mx-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-8" data-testid="news-title">
            Berita Terbaru
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="news-cards">
            <Card data-testid="news-card-1">
              <CardContent className="pt-4">
                <img
                  src="https://www.panggungharjo.desa.id/wp-content/uploads/2022/10/memilah-sampah-dari-rumah-660x400.jpg"
                  width={400}
                  height={225}
                  alt="Berita 1"
                  className="rounded-lg object-cover w-full aspect-video"
                  data-testid="news-image-1"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-semibold text-green-700" data-testid="news-title-1">
                    Cara Mudah Memilah Sampah di Rumah
                  </h3>
                  <p className="text-gray-700" data-testid="news-description-1">
                    Pelajari cara memilah sampah di rumah untuk meningkatkan partisipasi dalam pengelolaan sampah.
                  </p>
                  <Link
                    to="https://www.panggungharjo.desa.id/memilah-sampah-dari-rumah/"
                    target="_blank"
                    className="inline-flex items-center gap-1 text-green-600 hover:underline"
                    data-testid="news-link-1"
                  >
                    Baca Selengkapnya
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card data-testid="news-card-2">
              <CardContent className="pt-4">
                <img
                  src="https://www.klinklin.co.id/wp-content/uploads/2022/12/414-1-1536x769.jpg"
                  width={400}
                  height={225}
                  alt="Berita 2"
                  className="rounded-lg object-cover w-full aspect-video"
                  data-testid="news-image-2"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-semibold text-green-700" data-testid="news-title-2">
                    Tips Menjaga Kebersihan Lingkungan
                  </h3>
                  <p className="text-gray-700" data-testid="news-description-2">
                    Dapatkan tips praktis untuk menjaga kebersihan lingkungan sekitar Anda.
                  </p>
                  <Link
                    to="https://www.klinklin.co.id/manfaat-dan-tips-menjaga-kebersihan-lingkungan/"
                    target="_blank"
                    className="inline-flex items-center gap-1 text-green-600 hover:underline"
                    data-testid="news-link-2"
                  >
                    Baca Selengkapnya
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card data-testid="news-card-3">
              <CardContent className="pt-4">
                <img
                  src="https://irppapercup.com/wp-content/uploads/manfaat-daur-ulang-sampah-plastik.png"
                  width={400}
                  height={225}
                  alt="Berita 3"
                  className="rounded-lg object-cover w-full aspect-video"
                  data-testid="news-image-3"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-semibold text-green-700" data-testid="news-title-3">
                    Manfaat Daur Ulang Sampah untuk Lingkungan
                  </h3>
                  <p className="text-gray-700" data-testid="news-description-3">
                    Pelajari manfaat daur ulang sampah untuk menjaga kelestarian lingkungan.
                  </p>
                  <Link
                    to="https://irppapercup.com/manfaat-daur-ulang-sampah-plastik/"
                    target="_blank"
                    className="inline-flex items-center gap-1 text-green-600 hover:underline"
                    data-testid="news-link-3"
                  >
                    Baca Selengkapnya
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
