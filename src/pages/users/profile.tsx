import { useToken } from "@/utils/contexts/token";
import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useToken();

  if (!user) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <Layout>
      <div className="my-2 md:my-8 mx-2 max-w-xl md:mx-auto bg-white rounded-lg shadow-md overflow-hidden" data-testid="profile-container">
        <div className="bg-green-100 py-6 px-2 md:px-6">
          <div className="flex items-center justify-between" data-testid="profile-header">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12" data-testid="profile-avatar">
                <AvatarImage src={user.image_url || "https://images.unsplash.com/photo-1599566150163-29194dcaad36"} className="rounded-full w-full h-full object-cover" />
                <AvatarFallback>{user.fullname[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1" data-testid="profile-info">
                <div className="text-lg font-semibold text-gray-900">{user.fullname}</div>
                <div className="text-sm text-gray-700">{user.email}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="/profile/edit"
                className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                data-testid="edit-profile-link"
              >
                Edit Profile
              </a>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6 bg-gray-50 mt-4" data-testid="profile-details">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Kontak</div>
            <div className="text-base text-gray-900" data-testid="profile-phone">
              {user.phone}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Alamat</div>
            <div className="text-base text-gray-900" data-testid="profile-address">
              {user.address}
            </div>
          </div>
          <div className="flex justify-end">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              data-testid="dashboard-link"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
