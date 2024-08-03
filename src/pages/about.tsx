import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Layout from "@/components/layout";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Henry Rivardo",
      role: "Frontend",
      image: "/henry.png",
      fallback: "HR",
      social: {
        linkedin: "https://linkedin.com/in/henry-rivardo-0b4a9131a",
        github: "https://github.com/HenryRivardo07",
        instagram: "https://instagram.com/henry",
      },
    },
    {
      name: "Ardi S",
      role: "Frontend",
      image: "/ardi.png",
      fallback: "AR",
      social: {
        linkedin: "https://linkedin.com/in/ardii2711",
        github: "https://github.com/ardii2711",
        instagram: "https://instagram.com/ardii11_",
      },
    },
    {
      name: "Farah Raihanunnisa",
      role: "Backend",
      image: "/fara.png",
      fallback: "FR",
      social: {
        linkedin: "https://linkedin.com/in/farah",
        github: "https://github.com/farahraihan",
        instagram: "https://instagram.com/farah",
      },
    },
    {
      name: "Hafiz Darmawan",
      role: "Backend",
      image: "/hafiz.png",
      fallback: "HD",
      social: {
        linkedin: "https://linkedin.com/in/hafiz",
        github: "https://github.com/hfzdrmwn96",
        instagram: "https://instagram.com/hafiz",
      },
    },
    {
      name: "Anggi Eko Pambudi",
      role: "Backend",
      image: "/pambudi.png",
      fallback: "AEP",
      social: {
        linkedin: "https://linkedin.com/in/anggi",
        github: "https://github.com/gemgum",
        instagram: "https://instagram.com/anggi",
      },
    },
  ];

  return (
    <Layout>
      <main className="flex-1 py-12 md:py-20 px-4 md:px-6 bg-white" data-testid="about-us-page">
        <div className="md:container mx-auto space-y-12">
          <section className="text-center" data-testid="about-us-header">
            <h1 className="text-4xl font-bold tracking-tight text-green-800 mb-6" data-testid="about-us-title">
              Tentang Kami
            </h1>
            <p className="text-gray-800 text-lg md:text-xl" data-testid="about-us-description">
              EcoPoints adalah aplikasi inovatif yang dirancang untuk mendorong partisipasi masyarakat dalam pengelolaan sampah. Dengan mengumpulkan poin dari
              setiap penyetoran sampah, pengguna dapat menukarkannya dengan berbagai hadiah dan diskon menarik.
            </p>
          </section>

          <section className="space-y-8" data-testid="our-team-section">
            <h2 className="text-4xl font-bold text-center text-green-800" data-testid="team-title">
              Tim Kami
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8" data-testid="team-grid">
              {teamMembers.map((member, index) => (
                <div className="space-y-4 text-center transition-transform transform hover:scale-105" key={index} data-testid={`team-member-${index + 1}`}>
                  <Avatar className="mx-auto w-28 h-28 border-[3.5px] border-green-500 shadow-lg" data-testid={`team-member-${index + 1}-avatar`}>
                    <AvatarImage src={member.image} alt={member.name} className="w-28 h-28" />
                    <AvatarFallback className="w-28 h-28" data-testid={`team-member-${index + 1}-fallback`}>
                      {member.fallback}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold text-green-800" data-testid={`team-member-${index + 1}-name`}>
                      {member.name}
                    </h3>
                    <p className="text-gray-800" data-testid={`team-member-${index + 1}-role`}>
                      {member.role}
                    </p>
                    <div className="flex justify-center space-x-4 mt-2" data-testid={`team-member-${index + 1}-social`}>
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-800 hover:text-green-600"
                          data-testid={`team-member-${index + 1}-linkedin`}
                        >
                          <FaLinkedinIn size={24} />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-800 hover:text-green-600"
                          data-testid={`team-member-${index + 1}-github`}
                        >
                          <FaGithub size={24} />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-800 hover:text-green-600"
                          data-testid={`team-member-${index + 1}-instagram`}
                        >
                          <FaInstagram size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center space-y-6" data-testid="testimonial-section">
            <h2 className="text-3xl font-bold text-green-800" data-testid="testimonial-title">
              Apa Kata Pengguna
            </h2>
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="p-6 border rounded-lg shadow-lg bg-gray-100" data-testid="testimonial-1">
                <p className="text-lg text-gray-700">
                  "EcoPoints telah membantu saya untuk lebih sadar dalam mengelola sampah dan mendapatkan reward yang bermanfaat. Sangat merekomendasikan!"
                </p>
                <p className="mt-4 font-semibold text-green-800">- Maria C.</p>
              </div>
              <div className="p-6 border rounded-lg shadow-lg bg-gray-100 mt-6 md:mt-0" data-testid="testimonial-2">
                <p className="text-lg text-gray-700">
                  "Aplikasi ini mudah digunakan dan memberikan motivasi ekstra untuk lebih aktif dalam mendaur ulang. Terima kasih, EcoPoints!"
                </p>
                <p className="mt-4 font-semibold text-green-800">- John D.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
