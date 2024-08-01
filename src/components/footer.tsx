import { LeafIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-6 px-4 md:px-6" data-testid="footer">
      <div className="md:container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl" data-testid="footer-logo">
          <LeafIcon className="w-6 h-6" />
          <Link to="/">
            EcoPoints
          </Link>
        </div>
        <div data-testid="footer-copyright">
          <p>&copy; 2024 EcoPoints. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
