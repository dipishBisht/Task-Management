import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";

export function Navbar() {
  
  return (
    <nav>
      <div className="px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Boxes className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-xl text-gray-900">ProjectFlow</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white hover:bg-indigo-500 px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
