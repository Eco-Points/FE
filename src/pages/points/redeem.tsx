import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { getAllRewards } from "@/utils/apis/rewards";
import { IReward } from "@/utils/types/rewards";

const RedeemPoin = () => {
  const [rewards, setRewards] = useState<IReward[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      try {
        const { data } = await getAllRewards(page, 4);
        console.log("Fetched rewards:", data);

        // Check for redundancy
        const newRewards = data.filter((reward: IReward) => !rewards.some((r) => r.reward_id === reward.reward_id));

        setRewards((prevRewards) => [...prevRewards, ...newRewards]);
        setHasMore(newRewards.length > 0);
      } catch (error: any) {
        setError(error.message);
        toast.error("Error fetching rewards");
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
              <Link to={`/points/detail-redeem/${reward.reward_id}`} key={reward.reward_id}>
                <div className="bg-white rounded-lg p-4 flex flex-col shadow-md">
                  <img src={reward.image} alt={reward.name} className="mb-4 w-full" />
                  <h3 className="text-lg font-bold text-start text-green-700 mb-2">{reward.name}</h3>
                  <p className="text-gray-700 mb-4">{reward.description}</p>
                  <div className="flex justify-between items-center w-full mb-4">
                    <div className="text-green-700 font-bold">{reward.point_required} Poin</div>
                    <Button className="bg-green-600 text-white hover:bg-green-500">Tukar</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {hasMore && !loading && (
            <Button className="mt-4 bg-green-600 text-white hover:bg-green-500" onClick={loadMore}>
              Load More
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RedeemPoin;
