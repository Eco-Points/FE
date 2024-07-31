import { LeafIcon, LogOutIcon, PackageIcon, UserIcon, MapPinIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useToken } from "@/utils/contexts/token";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { token, user, changeToken } = useToken();
  const navigate = useNavigate();

  function handleLogout() {
    changeToken();
    toast("Logout Successfully");
    navigate("/");
  }

  return (
    <header className="bg-green-600 text-white py-5 px-4 shadow-sm">
      <div className="md:container mx-auto flex items-center justify-between">
        {token ? (
          <Link to={user?.is_admin ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-2 font-bold text-xl">
            <LeafIcon className="w-6 h-6" />
            EcoPoints
          </Link>
        ) : (
          <Link to={"/"} className="flex items-center gap-2 font-bold text-xl">
            <LeafIcon className="w-6 h-6" />
            EcoPoints
          </Link>
        )}
        <nav className="hidden md:flex items-center gap-6">
          {!token && (
            <Link to={"/"} className="hover:text-green-200">
              Beranda
            </Link>
          )}
          <Link to={"/about"} className="hover:text-green-200">
            Tentang Kami
          </Link>
          <Link to={"/contact-us"} className="hover:text-green-200">
            Hubungi Kami
          </Link>
          <Link to={"/locations"} className="hover:text-green-200">
            Lokasi
          </Link>
        </nav>
        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image_url} />
                  <AvatarFallback>
                    <UserIcon className="h-6 w-6 text-black" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex justify-between items-center gap-2">
                <DropdownMenuLabel>{user?.fullname}</DropdownMenuLabel>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={"/profile"} className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={user?.is_admin ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-2">
                  <PackageIcon className="h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={"/locations"} className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  Lokasi
                </Link>
              </DropdownMenuItem>
              {user?.is_admin && (
                <DropdownMenuItem asChild>
                  <Link to={"/admin/add-location"} className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    Tambah Lokasi
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => handleLogout()}>
                <LogOutIcon className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-4">
            <Button asChild variant="secondary" color="white" size="sm" className="flex items-center">
              <Link to={"/login"}>Masuk</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
