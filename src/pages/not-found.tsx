import { TriangleAlertIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { useToken } from "@/utils/contexts/token";

export default function NotFound() {
  const { token, user } = useToken();
  let redirectTo = "/";

  if (token) {
    if (user && user.is_admin) {
      redirectTo = "/admin/dashboard";
    } else {
      redirectTo = "/dashboard";
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8" data-testid="not-found-container">
      <div className="mx-auto max-w-md text-center" data-testid="not-found-content">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-green-600" data-testid="not-found-icon" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl" data-testid="not-found-title">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mt-4 text-slate-400" data-testid="not-found-message">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Silakan periksa kembali URL atau kembali ke halaman utama.
        </p>
        <div className="mt-6">
          <Link
            to={redirectTo}
            className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#008d4c] focus:outline-none focus:ring-2 focus:ring-[#00a65a] focus:ring-offset-2"
            data-testid="not-found-link"
          >
            Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
