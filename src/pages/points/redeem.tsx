import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

export default function RedeemPoin() {
  const rewards = [
    {
      id: 1,
      image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/104/MTA-147692237/no-brand_no-brand_full01.jpg",
      name: "Voucher di Toko Organik",
      description: "Dapatkan diskon 20% untuk belanja di Toko Organik",
      points: 500,
    },
    {
      id: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTom2tm1VPIzKrGoq1-00Oz6N8UcT3iKYdQnw&s",
      name: "Bibit Tanaman Hias",
      description: "Dapatkan bibit tanaman hias untuk menghiasi rumah Anda",
      points: 300,
    },
    {
      id: 3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_r73oqtdKJeu-LgTdVr9jWKEnqHpzsWel8A&s",
      name: "Tumbler Eco-Friendly",
      description: "Gaya hidup ramah lingkungan dengan tumbler ini",
      points: 400,
    },
    {
      id: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDudGZ1B-lqrEpH3z5_ECnccBqZHu-7c3_g&s",
      name: "Voucher di Restoran Vegan",
      description: "Nikmati makanan sehat dengan diskon 15%",
      points: 450,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen my-4 md:my-8 mx-2 md:mx-auto flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg max-w-6xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-green-700">Tukar Poin</h1>
            <Link to="/users/dashboard" className="text-green-600 hover:underline">
              Kembali
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {rewards.map((reward) => (
              <Link to="/points/deatil-reedem">
                <div key={reward.id} className="bg-white rounded-lg p-4 flex flex-col shadow-md">
                  <img src={reward.image} alt={reward.name} className="mb-4 w-full" />
                  <h3 className="text-lg font-bold text-start text-green-700 mb-2">{reward.name}</h3>
                  <p className="text-gray-700 mb-4">{reward.description}</p>
                  <div className="flex justify-between items-center w-full mb-4">
                    <div className="text-green-700 font-bold">{reward.points} Poin</div>
                    <Button className="bg-green-600 text-white hover:bg-green-500">
                      Tukar
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
