import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Settings from "./components/Settings";
import ProjectDetail from "./components/project/ProjectDetail";
import Dashboard from "./components/Dashboard";
import Timeline from "./components/Timeline";
import { LoginPage } from "./pages/login-page/page";
import { SignupPage } from "./pages/signup-page/page";
import Home from "./pages/home-page/page";
import Notification from "./pages/notification-page/page";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Show Sidebar and Header only for authenticated routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <div>
                <Sidebar />
                <div className="ml-64">
                  <Header />
                  <main className="mt-16">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/notifications" element={<Notification />} />
                      <Route path="/project/:id" element={<ProjectDetail />} />
                      <Route path="/timeline" element={<Timeline />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
