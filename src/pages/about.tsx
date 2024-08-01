import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Layout from "@/components/layout";

export default function AboutUs() {
  return (
    <Layout>
      <main className="flex-1 py-12 md:py-20 px-4 md:px-6">
        <div className="md:container mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-green-700 mb-6">Tentang Kami</h1>
            <p className="text-gray-700 text-lg">
              EcoPoints adalah aplikasi inovatif yang dirancang untuk mendorong partisipasi masyarakat dalam pengelolaan sampah. Dengan mengumpulkan poin dari
              setiap penyetoran sampah, pengguna dapat menukarkannya dengan berbagai hadiah dan diskon menarik.
            </p>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-green-700">Tim Kami</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              <div className="space-y-4 text-center">
                <Avatar className="mx-auto w-24 h-24">
                  <AvatarImage src="/henry.png" alt="Henry Rivardo" className="w-24 h-24" />
                  <AvatarFallback className="w-24 h-24">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-green-700">Henry Rivardo</h3>
                  <p className="text-gray-700">Frontend</p>
                </div>
              </div>

              <div className="space-y-4 text-center">
                <Avatar className="mx-auto w-24 h-24">
                  <AvatarImage src="/ardi.png" alt="Ardi S" className="w-24 h-24" />
                  <AvatarFallback className="w-24 h-24">JS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-green-700">Ardi S</h3>
                  <p className="text-gray-700">Frontend</p>
                </div>
              </div>

              <div className="space-y-4 text-center">
                <Avatar className="mx-auto w-24 h-24">
                  <AvatarImage src="/hafiz.png" alt="Hafiz Darmawan" className="w-24 h-24" />
                  <AvatarFallback className="w-24 h-24">MB</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-green-700">Hafiz Darmawan</h3>
                  <p className="text-gray-700">Backend</p>
                </div>
              </div>

              <div className="space-y-4 text-center">
                <Avatar className="mx-auto w-24 h-24">
                  <AvatarImage src="/fara.png" alt="Farah Raihanunnisa" className="w-24 h-24" />
                  <AvatarFallback className="w-24 h-24">ED</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-green-700">Farah Raihanunnisa</h3>
                  <p className="text-gray-700">Backend</p>
                </div>
              </div>

              <div className="space-y-4 text-center">
                <Avatar className="mx-auto w-24 h-24">
                  <AvatarImage src="/pambudi.png" alt="Anggi Eko Pambudi" className="w-24 h-24" />
                  <AvatarFallback className="w-24 h-24">DW</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-green-700">Anggi Eko Pambudi</h3>
                  <p className="text-gray-700">Backend</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
