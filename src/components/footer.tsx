import { LeafIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-6 px-4 md:px-6">
      <div className="md:container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
          <LeafIcon className="w-6 h-6" />
          EcoPoints
        </div>
        <p>&copy; 2024 EcoPoints. All rights reserved.</p>
      </div>
    </footer>
  );
}
