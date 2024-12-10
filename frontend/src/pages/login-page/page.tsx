import axios from "axios";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { AuthButton } from "../../components/ui/AuthButton";
import { Input } from "../../components/ui/Input";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DB_PREFIX, handleError, handleSuccess } from "../../lib/utils";
import { Navbar } from "../../components/navbar";

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      handleError("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${DB_PREFIX}/auth/login`, {
        email,
        password,
      });

      if (!response.data?.success) {
        handleError("Login failed");
        setIsLoading(false);
        return;
      }
      handleSuccess("Login successful");
      localStorage.setItem("token", response.data.jwtToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      handleError(errorMessage);
    } finally {
      setIsLoading(false);
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
        subtitle="Log in to your account to continue"
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
            Login
          </AuthButton>

          <p className="text-center text-sm text-gray-600">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={() => navigate("/signup")}
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
