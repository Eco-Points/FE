import { FacebookIcon, InstagramIcon, LeafIcon, TwitterIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout";

export default function Register() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-4 px-4 md:py-8">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <LeafIcon className="w-8 h-8 text-green-500" />
            <h1 className="text-3xl font-bold text-green-700">EcoPoints</h1>
          </div>
          <p className="text-gray-500 mb-6">Silakan daftar untuk membuat akun baru.</p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Nama Lengkap
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Kata Sandi
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan kata sandi"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="confirm-password">
                Konfirmasi Kata Sandi
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Konfirmasi kata sandi"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-green-500"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">
              Daftar
            </Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-green-500">
              Sudah punya akun?{" "}
              <Link to={"/login"} className="text-green-500 hover:text-green-600 font-medium">
                Masuk di sini.
              </Link>
            </p>
          </div>
          <div className="mt-6 text-center text-gray-500">
            <p>&copy; 2023 EcoPoints. Ikuti kami di:</p>
            <div className="flex justify-center mt-2">
              <Link to={"/"} className="mx-2">
                <FacebookIcon className="w-5 h-5 text-green-500 hover:text-green-600" />
              </Link>
              <Link to={"/"} className="mx-2">
                <TwitterIcon className="w-5 h-5 text-green-500 hover:text-green-600" />
              </Link>
              <Link to={"/"} className="mx-2">
                <InstagramIcon className="w-5 h-5 text-green-500 hover:text-green-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}