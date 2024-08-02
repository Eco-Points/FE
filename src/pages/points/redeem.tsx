import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { getRewards } from "@/utils/apis/rewards";
import { IReward } from "@/utils/types/rewards";

// Jumlah item yang ditampilkan per halaman
const ITEMS_PER_PAGE = 4;

const RedeemPoin = () => {
  // State untuk menyimpan semua reward yang diambil
  const [rewards, setRewards] = useState<IReward[]>([]);
  // State untuk menyimpan reward yang saat ini ditampilkan
  const [displayedRewards, setDisplayedRewards] = useState<IReward[]>([]);
  // State untuk mengelola status loading
  const [loading, setLoading] = useState(false);
  // State untuk menyimpan pesan kesalahan
  const [error, setError] = useState<string | null>(null);
  // State untuk melacak halaman saat ini untuk fungsi "Load More"
  const [page, setPage] = useState(1);

  // Efek untuk mengambil reward ketika komponen pertama kali dimuat
  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true); // Mengatur state loading menjadi true
      try {
        const { data } = await getRewards(); // Mengambil semua reward
        console.log("Fetched rewards:", data);
        setRewards(data); // Menyimpan semua reward
        setDisplayedRewards(data.slice(0, ITEMS_PER_PAGE)); // Menampilkan set pertama dari reward
      } catch (error: any) {
        setError(error.message); // Mengatur pesan kesalahan jika pengambilan gagal
        toast.error("Error fetching rewards"); // Menampilkan notifikasi kesalahan
      } finally {
        setLoading(false); // Mengatur state loading menjadi false
      }
    };

    fetchRewards();
  }, []);

  // Fungsi untuk memuat lebih banyak reward ketika tombol "Load More" diklik
  const loadMore = () => {
    const nextPage = page + 1; // Menghitung halaman berikutnya
    const newRewards = rewards.slice(0, nextPage * ITEMS_PER_PAGE); // Mendapatkan set reward berikutnya
    setDisplayedRewards(newRewards); // Memperbarui reward yang ditampilkan
    setPage(nextPage); // Memperbarui state halaman
  };

  return (
    <Layout>
      <div className="min-h-screen my-4 md:my-8 mx-2 md:mx-auto flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg max-w-6xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-green-700" data-testid="page-title">
              Tukar Poin
            </h1>
            <Link to="/users/dashboard" className="text-green-600 hover:underline" data-testid="back-link">
              Kembali
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-testid="rewards-grid">
            {displayedRewards.map((reward) => (
              <Link to={`/points/detail-redeem/${reward.reward_id}`} key={reward.reward_id} data-testid={`reward-link-${reward.reward_id}`}>
                <div className="bg-white rounded-lg p-4 flex flex-col shadow-md" data-testid={`reward-card-${reward.reward_id}`}>
                  <img src={reward.image} alt={reward.name} className="mb-4 w-full" data-testid={`reward-image-${reward.reward_id}`} />
                  <h3 className="text-lg font-bold text-start text-green-700 mb-2" data-testid={`reward-name-${reward.reward_id}`}>
                    {reward.name}
                  </h3>
                  <p className="text-gray-700 mb-4" data-testid={`reward-description-${reward.reward_id}`}>
                    {reward.description}
                  </p>
                  <div className="flex justify-between items-center w-full mb-4" data-testid={`reward-points-${reward.reward_id}`}>
                    <div className="text-green-700 font-bold" data-testid={`reward-points-text-${reward.reward_id}`}>
                      {reward.point_required} Poin
                    </div>
                    <Button className="bg-green-600 text-white hover:bg-green-500" data-testid={`redeem-button-${reward.reward_id}`}>
                      Tukar
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {loading && <div data-testid="loading">Loading...</div>}
          {error && <div data-testid="error">Error: {error}</div>}
          {displayedRewards.length < rewards.length && !loading && (
            <Button className="mt-4 bg-green-600 text-white hover:bg-green-500" onClick={loadMore} data-testid="load-more-button">
              Load More
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RedeemPoin;
