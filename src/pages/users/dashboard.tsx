import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/utils/apis/users";
import { ProfileType } from "@/utils/types/users";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function DashboardUser() {
  const [user, setUser] = useState<ProfileType>();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      toast.error("Gagal memuat data profil pengguna.");
    }
  }

  return (
    <Layout>
      <section className="flex-1 py-4 md:py-12 px-4 md:px-6">
        <div className="md:container mx-auto">
          <h1 className="text-3xl font-bold text-green-700 mb-8" data-testid="dashboard-title">
            Dashboard
          </h1>
          <div className="mb-8">
            <h2 className="text-lg font-bold" data-testid="welcome-message">
              Selamat datang, {user?.fullname}
            </h2>
            <p className="text-gray-700" data-testid="points-balance">
              Saldo Poin: <span className="font-bold">{user?.point}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" data-testid="dashboard-links">
            <Link to="/waste/deposit" className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition-colors" data-testid="deposit-link">
              <h3 className="text-lg font-semibold mb-2">Setor Sampah</h3>
              <p className="text-gray-700">Setorkan sampahmu untuk mendapatkan poin!</p>
            </Link>
            <Link to="/waste/history" className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition-colors" data-testid="history-link">
              <h3 className="text-lg font-semibold mb-2">Riwayat Penyetoran</h3>
              <p className="text-gray-700">Lihat riwayat penyetoran sampahmu.</p>
            </Link>
            <Link to="/points/redeem" className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition-colors" data-testid="redeem-link">
              <h3 className="text-lg font-semibold mb-2">Tukar Poin</h3>
              <p className="text-gray-700">Tukarkan poinmu dengan hadiah menarik.</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="pb-12 px-4 md:px-6">
        <div className="md:container mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-green-700" data-testid="news-title">
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
                      to={"https://www.panggungharjo.desa.id/memilah-sampah-dari-rumah/"}
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
                      to={"https://www.klinklin.co.id/manfaat-dan-tips-menjaga-kebersihan-lingkungan/"}
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
                      to={"https://irppapercup.com/manfaat-daur-ulang-sampah-plastik/"}
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
        </div>
      </section>
    </Layout>
  );
}
