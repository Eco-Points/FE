import { LockIcon } from "lucide-react";

export default function Suspend() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8" data-testid="suspend-container">
      <div className="mx-auto max-w-md text-center" data-testid="suspend-content">
        <LockIcon className="mx-auto h-12 w-12 text-red-500" data-testid="suspend-icon" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="suspend-title">
          Akun Anda telah ditangguhkan
        </h1>
        <p className="mt-4 text-muted-foreground" data-testid="suspend-message">
          Silakan hubungi dukungan pelanggan untuk informasi lebih lanjut.
        </p>
        <div className="mt-6" data-testid="suspend-contact">
          <p className="text-green-900">
            hubungi kami di <span className="font-medium">ecopoints@eco.id</span>
          </p>
        </div>
      </div>
    </div>
  );
}
