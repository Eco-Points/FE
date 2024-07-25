import Layout from "../../components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const Profile = () => {
  return (
    <Layout>
      <div className="my-2 md:my-8 mx-2 max-w-xl md:mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-100 py-6 px-2 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="text-lg font-semibold text-gray-900">John Doe</div>
                <div className="text-sm text-gray-700">john@ecopoints.com</div>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="/profile/edit"
                className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Edit Profil
              </a>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6 bg-gray-50 mt-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Kontak</div>
            <div className="text-base text-gray-900">+62 123 456 789</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Alamat</div>
            <div className="text-base text-gray-900">Jl. Contoh No. 123, Kota Contoh, Indonesia</div>
          </div>
          <div className="flex justify-end">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Kembali ke Dashboard
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
