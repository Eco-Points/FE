import { ArrowRightIcon, ClockIcon, LeafIcon, WalletIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout";

export default function Index() {
  return (
    <Layout>
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="md:container mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-green-700">EcoPoints</h1>
            <p className="text-gray-700 text-lg">
              EcoPoints adalah aplikasi yang mendorong pengguna untuk berpartisipasi dalam pengelolaan sampah dengan memberikan poin sebagai imbalan atas setiap
              penyetoran sampah. Poin yang terkumpul dapat ditukarkan dengan hadiah atau diskon yang tersedia dalam aplikasi.
            </p>
            <div className="flex gap-4">
              <Link
                to={"/waste/deposit"}
                className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
              >
                Setor Sampah
              </Link>
              <Link
                to={"/"}
                className="inline-flex items-center justify-center rounded-md border border-green-500 bg-white px-6 py-2 text-sm font-medium text-green-600 shadow-sm transition-colors hover:bg-green-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
              >
                Tukar Poin
              </Link>
            </div>
          </div>
          <div className="hidden md:block w-[500px] h-[300px] overflow-hidden rounded-lg">
            <img src="/eco-points.png" alt="EcoPoints" className="rounded-lg object-cover" />
          </div>
        </div>
      </main>
      <section className="bg-green-50 py-12 px-4 md:px-6">
        <div className="md:container mx-auto grid md:grid-cols-3 gap-8">
          <div className="space-y-2 flex flex-col items-center md:items-start">
            <LeafIcon className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-semibold text-green-700">Setor Sampah</h3>
            <p className="text-gray-700">Setorkan sampah Anda dan kumpulkan poin.</p>
          </div>
          <div className="space-y-2 flex flex-col items-center md:items-start">
            <ClockIcon className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-semibold text-green-700">Riwayat</h3>
            <p className="text-gray-700">Lihat riwayat penyetoran sampah Anda.</p>
          </div>
          <div className="space-y-2 flex flex-col items-center md:items-start">
            <WalletIcon className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-semibold text-green-700">Saldo Poin</h3>
            <p className="text-gray-700">Cek saldo poin yang telah Anda kumpulkan.</p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 md:px-6">
        <div className="md:container mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-green-700">Berita Terbaru</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent>
                  <img src="/" width={400} height={225} alt="Berita 1" className="rounded-lg object-cover w-full aspect-video" />
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold text-green-700">Cara Mudah Memilah Sampah di Rumah</h3>
                    <p className="text-gray-700">Pelajari cara memilah sampah di rumah untuk meningkatkan partisipasi dalam pengelolaan sampah.</p>
                    <Link to={"/"} className="inline-flex items-center gap-1 text-green-600 hover:underline">
                      Baca Selengkapnya
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <img src="/" width={400} height={225} alt="Berita 2" className="rounded-lg object-cover w-full aspect-video" />
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold text-green-700">Tips Menjaga Kebersihan Lingkungan</h3>
                    <p className="text-gray-700">Dapatkan tips praktis untuk menjaga kebersihan lingkungan sekitar Anda.</p>
                    <Link to={"/"} className="inline-flex items-center gap-1 text-green-600 hover:underline">
                      Baca Selengkapnya
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <img src="/" width={400} height={225} alt="Berita 3" className="rounded-lg object-cover w-full aspect-video" />
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold text-green-700">Manfaat Daur Ulang Sampah untuk Lingkungan</h3>
                    <p className="text-gray-700">Pelajari manfaat daur ulang sampah untuk menjaga kelestarian lingkungan.</p>
                    <Link to={"/"} className="inline-flex items-center gap-1 text-green-600 hover:underline">
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
