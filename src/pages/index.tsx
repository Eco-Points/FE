import { ArrowRightIcon, ClockIcon, LeafIcon, WalletIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout";

import { useToken } from "@/utils/contexts/token";

export default function Index() {
  const { token } = useToken();

  return (
    <Layout>
      <main data-testid="main-section" className="flex-1 py-12 px-4 md:px-6">
        <div data-testid="intro-container" className="md:container mx-auto grid md:grid-cols-2 gap-8">
          <div data-testid="intro-text" className="space-y-4">
            <h1 data-testid="intro-title" className="text-4xl font-bold tracking-tight text-green-700">
              EcoPoints
            </h1>
            <p data-testid="intro-description" className="text-gray-700 text-lg">
              EcoPoints adalah aplikasi yang mendorong pengguna untuk berpartisipasi dalam pengelolaan sampah dengan memberikan poin sebagai imbalan atas setiap
              penyetoran sampah. Poin yang terkumpul dapat ditukarkan dengan hadiah atau diskon yang tersedia dalam aplikasi.
            </p>
            <div data-testid="intro-buttons" className="flex gap-4">
              <Link
                to={token ? "/waste/deposit" : "/login"}
                data-testid="deposit-link"
                className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
              >
                Setor Sampah
              </Link>
              <Link
                to={token ? "/points/redeem" : "/login"}
                data-testid="redeem-link"
                className="inline-flex items-center justify-center rounded-md border border-green-500 bg-white px-6 py-2 text-sm font-medium text-green-600 shadow-sm transition-colors hover:bg-green-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
              >
                Tukar Poin
              </Link>
            </div>
          </div>
          <div data-testid="intro-image-container" className="hidden md:block w-[500px] h-[300px] overflow-hidden rounded-lg">
            <img data-testid="intro-image" src="/eco-points.png" alt="EcoPoints" className="rounded-lg object-cover h-full w-full" />
          </div>
        </div>
      </main>

      <section data-testid="features-section" className="bg-green-50 py-12 px-4 md:px-6">
        <div className="md:container mx-auto grid md:grid-cols-3 gap-8">
          <div data-testid="feature-1" className="space-y-2 flex flex-col items-center md:items-start">
            <LeafIcon className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-semibold text-green-700">Setor Sampah</h3>
            <p className="text-gray-700">Setorkan sampah Anda dan kumpulkan poin.</p>
          </div>
          <div data-testid="feature-2" className="space-y-2 flex flex-col items-center md:items-start">
            <ClockIcon className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-semibold text-green-700">Riwayat</h3>
            <p className="text-gray-700">Lihat riwayat penyetoran sampah Anda.</p>
          </div>
          <div data-testid="feature-3" className="space-y-2 flex flex-col items-center md:items-start">
            <WalletIcon className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-semibold text-green-700">Saldo Poin</h3>
            <p className="text-gray-700">Cek saldo poin yang telah Anda kumpulkan.</p>
          </div>
        </div>
      </section>

      <section data-testid="news-section" className="py-12 px-4 md:px-6">
        <div className="md:container mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-green-700" data-testid="news-title">
              Berita Terbaru
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card data-testid="news-1">
                <CardContent className="pt-4">
                  <img
                    src="https://www.panggungharjo.desa.id/wp-content/uploads/2022/10/memilah-sampah-dari-rumah-660x400.jpg"
                    width={400}
                    height={225}
                    alt="Berita 1"
                    className="rounded-lg object-cover w-full aspect-video"
                  />
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold text-green-700">Cara Mudah Memilah Sampah di Rumah</h3>
                    <p className="text-gray-700">Pelajari cara memilah sampah di rumah untuk meningkatkan partisipasi dalam pengelolaan sampah.</p>
                    <Link
                      to={"https://www.panggungharjo.desa.id/memilah-sampah-dari-rumah/"}
                      target="_blank"
                      data-testid="news-1-link"
                      className="inline-flex items-center gap-1 text-green-600 hover:underline"
                    >
                      Baca Selengkapnya
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="news-2">
                <CardContent className="pt-4">
                  <img
                    src="https://www.klinklin.co.id/wp-content/uploads/2022/12/414-1-1536x769.jpg"
                    width={400}
                    height={225}
                    alt="Berita 2"
                    className="rounded-lg object-cover w-full aspect-video"
                  />
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold text-green-700">Tips Menjaga Kebersihan Lingkungan</h3>
                    <p className="text-gray-700">Dapatkan tips praktis untuk menjaga kebersihan lingkungan sekitar Anda.</p>
                    <Link
                      to={"https://www.klinklin.co.id/manfaat-dan-tips-menjaga-kebersihan-lingkungan/"}
                      target="_blank"
                      data-testid="news-2-link"
                      className="inline-flex items-center gap-1 text-green-600 hover:underline"
                    >
                      Baca Selengkapnya
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="news-3">
                <CardContent className="pt-4">
                  <img
                    src="https://irppapercup.com/wp-content/uploads/manfaat-daur-ulang-sampah-plastik.png"
                    width={400}
                    height={225}
                    alt="Berita 3"
                    className="rounded-lg object-cover w-full aspect-video"
                  />
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold text-green-700">Manfaat Daur Ulang Sampah untuk Lingkungan</h3>
                    <p className="text-gray-700">Pelajari manfaat daur ulang sampah untuk menjaga kelestarian lingkungan.</p>
                    <Link
                      to={"https://irppapercup.com/manfaat-daur-ulang-sampah-plastik/"}
                      target="_blank"
                      data-testid="news-3-link"
                      className="inline-flex items-center gap-1 text-green-600 hover:underline"
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
