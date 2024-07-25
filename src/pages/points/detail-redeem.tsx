import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

export default function DetailRedeem() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center mx-2 md:mx-6">
          <div className="flex items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTom2tm1VPIzKrGoq1-00Oz6N8UcT3iKYdQnw&s"
              alt="Gift Image"
              width={350}
              height={350}
              className="w-full max-w-[350px] rounded-lg object-cover"
            />
          </div>
          <div className="space-y-6 flex flex-col justify-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Wireless Headphones</h1>
              <p className="text-muted-foreground mt-2">Experience the ultimate audio immersion with our premium wireless headphones.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">2,500 Points</span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Upgrade your listening experience with our state-of-the-art wireless headphones. Featuring advanced noise-cancelling technology, premium sound
                quality, and a sleek, comfortable design, these headphones will transport you to a new level of audio bliss.
              </p>
              <Button size="lg" className="w-full bg-green-700">
                Redeem Points
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
