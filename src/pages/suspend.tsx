import { LockIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Suspend() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <LockIcon className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Akun Anda telah ditangguhkan</h1>
        <p className="mt-4 text-muted-foreground">Silakan hubungi dukungan pelanggan untuk informasi lebih lanjut.</p>
        <div className="mt-6">
          <Link
            to="/contact-us"
            className="inline-flex items-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-red-50 shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Hubungi Dukungan
          </Link>
        </div>
      </div>
    </div>
  );
}
