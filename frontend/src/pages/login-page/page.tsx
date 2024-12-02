import axios from "axios";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { AuthButton } from "../../components/ui/AuthButton";
import { Input } from "../../components/ui/Input";
import { useAuth, useAuthPage } from "../../store/auth";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../lib/utils";
import { Navbar } from "../../components/navbar";

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setCurrentPage } = useAuthPage();
  const { setIsUserLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return handleError("All field required");
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      if (!response.data.success) return handleError("login failed");

      localStorage.setItem("token", response.data.jwtToken);
      setIsUserLoggedIn(true);
      setUser(response.data.user);
      handleSuccess("login successfully");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <AuthLayout
        title="Welcome back"
        subtitle="Sign in to your account to continue"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email address"
            type="email"
            placeholder="john@example.com"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <AuthButton type="submit" isLoading={isLoading} className="w-full">
            Sign in
          </AuthButton>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentPage("signup")}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </button>
          </p>
        </form>
        <ToastContainer />
      </AuthLayout>
    </>
  );
};
