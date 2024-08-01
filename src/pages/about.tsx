import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Layout from "@/components/layout";

export default function AboutUs() {
  return (
    <Layout>
      <main className="flex-1 py-12 md:py-20 px-4 md:px-6" data-testid="about-us-page">
        <div className="md:container mx-auto space-y-8">
          <div className="text-center" data-testid="about-us-header">
            <h1 className="text-4xl font-bold tracking-tight text-green-700 mb-6" data-testid="about-us-title">
              Tentang Kami
            </h1>
            <p className="text-gray-700 text-lg" data-testid="about-us-description">
              EcoPoints adalah aplikasi inovatif yang dirancang untuk mendorong partisipasi masyarakat dalam pengelolaan sampah. Dengan mengumpulkan poin dari
              setiap penyetoran sampah, pengguna dapat menukarkannya dengan berbagai hadiah dan diskon menarik.
            </p>
          </div>

          <div className="space-y-8" data-testid="our-team-section">
            <h2 className="text-3xl font-bold text-center text-green-700" data-testid="team-title">
              Tim Kami
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8" data-testid="team-grid">
              <div className="space-y-4 text-center" data-testid="team-member-1">
                <Avatar className="mx-auto w-24 h-24">
                  <AvatarImage src="/henry.png" alt="Henry Rivardo" className="w-24 h-24" />
                  <AvatarFallback className="w-24 h-24" data-testid="team-member-1-fallback">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-green-700" data-testid="team-member-1-name">
                    Henry Rivardo
                  </h3>
                  <p className="text-gray-700" data-testid="team-member-1-role">
                    Frontend
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-center" data-testid="team-member-2">
                <Avatar className="mx-auto w-24 h-24">
                  <AvatarImage src="/ardi.png" alt="Ardi S" className="w-24 h-24" />
                  <AvatarFallback className="w-24 h-24" data-testid="team-member-2-fallback">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-green-700" data-testid="team-member-2-name">
                    Ardi S
                  </h3>
                  <p className="text-gray-700" data-testid="team-member-2-role">
                    Frontend
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-center" data-testid="team-member-3">
                <Avatar className="mx-auto w-24 h-24">
                  <AvatarImage src="/hafiz.png" alt="Hafiz Darmawan" className="w-24 h-24" />
                  <AvatarFallback className="w-24 h-24" data-testid="team-member-3-fallback">
                    MB
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-green-700" data-testid="team-member-3-name">
                    Hafiz Darmawan
                  </h3>
                  <p className="text-gray-700" data-testid="team-member-3-role">
                    Backend
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-center" data-testid="team-member-4">
                <Avatar className="mx-auto w-24 h-24">
                  <AvatarImage src="/fara.png" alt="Farah Raihanunnisa" className="w-24 h-24" />
                  <AvatarFallback className="w-24 h-24" data-testid="team-member-4-fallback">
                    ED
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-green-700" data-testid="team-member-4-name">
                    Farah Raihanunnisa
                  </h3>
                  <p className="text-gray-700" data-testid="team-member-4-role">
                    Backend
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-center" data-testid="team-member-5">
                <Avatar className="mx-auto w-24 h-24">
                  <AvatarImage src="/pambudi.png" alt="Anggi Eko Pambudi" className="w-24 h-24" />
                  <AvatarFallback className="w-24 h-24" data-testid="team-member-5-fallback">
                    DW
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-green-700" data-testid="team-member-5-name">
                    Anggi Eko Pambudi
                  </h3>
                  <p className="text-gray-700" data-testid="team-member-5-role">
                    Backend
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
