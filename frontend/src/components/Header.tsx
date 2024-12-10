import { Search, Bell } from "lucide-react";
import { Button } from "./ui/Button";
import { handleSuccess } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSearchProjectStore } from "../store/project";

export default function Header() {
  const navigate = useNavigate();
  const { searchProject, setSearchProject } = useSearchProjectStore();
  return (
    <>
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 fixed top-0 right-0 left-64">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchProject}
            onChange={(e) => setSearchProject(e.target.value)}
            className="bg-gray-50 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                handleSuccess("Logout successfully");
                setTimeout(() => navigate("/"), 3000);
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      <ToastContainer />
    </>
  );
}
