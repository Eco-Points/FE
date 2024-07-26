import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";

export default function DashboardUser() {
  return (
    <Layout>
      <section className="flex-1 py-4 md:py-12 px-4 md:px-6">
        <div className="md:container mx-auto">
          <h1 className="text-3xl font-bold text-green-700 mb-8">Dashboard</h1>
          <div className="mb-8">
            <h2 className="text-lg font-bold">Selamat datang, Henry Rivardo!</h2>
            <p className="text-gray-700">
              Saldo Poin: <span className="font-bold">100</span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <a href="/waste/deposit" className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Setor Sampah</h3>
              <p className="text-gray-700">Setorkan sampahmu untuk mendapatkan poin!</p>
            </a>
            <a href="/waste/history" className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Riwayat Penyetoran</h3>
              <p className="text-gray-700">Lihat riwayat penyetoran sampahmu.</p>
            </a>
            <a href="/points/reedem" className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Tukar Poin</h3>
              <p className="text-gray-700">Tukarkan poinmu dengan hadiah menarik.</p>
            </a>
          </div>
        </div>
      </section>
      <section className="pb-12 px-4 md:px-6">
        <div className="md:container mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-green-700">Berita Terbaru</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent>
                  <img src="/1.jpg" width={400} height={225} alt="Berita 1" className="rounded-lg object-cover w-full aspect-video" />
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold text-green-700">Cara Mudah Memilah Sampah di Rumah</h3>
                    <p className="text-gray-700">Pelajari cara memilah sampah di rumah untuk meningkatkan partisipasi dalam pengelolaan sampah.</p>
                    <a href="/" className="inline-flex items-center gap-1 text-green-600 hover:underline">
                      Baca Selengkapnya
                      <ArrowRightIcon className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <img src="/2.jpeg" width={400} height={225} alt="Berita 2" className="rounded-lg object-cover w-full aspect-video" />
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold text-green-700">Tips Menjaga Kebersihan Lingkungan</h3>
                    <p className="text-gray-700">Dapatkan tips praktis untuk menjaga kebersihan lingkungan sekitar Anda.</p>
                    <a href="/" className="inline-flex items-center gap-1 text-green-600 hover:underline">
                      Baca Selengkapnya
                      <ArrowRightIcon className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <img src="/3.jpg" width={400} height={225} alt="Berita 3" className="rounded-lg object-cover w-full aspect-video" />
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold text-green-700">Manfaat Daur Ulang Sampah untuk Lingkungan</h3>
                    <p className="text-gray-700">Pelajari manfaat daur ulang sampah untuk menjaga kelestarian lingkungan.</p>
                    <a href="/" className="inline-flex items-center gap-1 text-green-600 hover:underline">
                      Baca Selengkapnya
                      <ArrowRightIcon className="w-4 h-4" />
                    </a>
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
