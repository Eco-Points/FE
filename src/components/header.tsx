import { LeafIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-green-600 text-white py-5 px-4 shadow-sm">
      <div className="md:container mx-auto flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2 font-bold text-xl">
          <LeafIcon className="w-6 h-6" />
          EcoPoints
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to={"/"} className="hover:text-green-200">
            Beranda
          </Link>
          <Link to={"/about"} className="hover:text-green-200">
            Tentang Kami
          </Link>
          <Link to={"/contact"} className="hover:text-green-200">
            Hubungi Kami
          </Link>
          <Link to={"/locations"} className="hover:text-green-200">
            Lokasi
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary" color="white" size="sm" className="hidden md:flex items-center">
            <Link to={"/login"}>Masuk</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
