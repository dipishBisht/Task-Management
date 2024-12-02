import { ToastContainer } from "react-toastify";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { AuthButton } from "../../components/ui/AuthButton";
import { Input } from "../../components/ui/Input";
import { useAuthPage } from "../../store/auth";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../lib/utils";
import { Navbar } from "../../components/navbar";

export const SignupPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { setCurrentPage } = useAuthPage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword)
      return handleError("All field required");
    if (password !== confirmPassword) return handleError("password not match");
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      if (!response.data.success) return handleError("signup failed");
      handleSuccess("signup successfully");
      setTimeout(() => navigate("/login", { replace: false }), 3000);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;

        if (status === 400 || data.errors) {
          data.errors.forEach((err: { message: string }) => {
            handleError(err.message || "Validation error occurred");
          });
        } else {
          handleError("An unexpected error occurred");
        }
      } else {
        handleError("Network error or server is unreachable");
      }
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
        title="Create an account"
        subtitle="Start managing your tasks effectively"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="First name"
            type="text"
            placeholder="John"
            name="firstName"
            onChange={handleInputChange}
            value={formData.firstName}
          />
          <Input
            label="Last name"
            type="text"
            placeholder="Doe"
            name="lastName"
            onChange={handleInputChange}
            value={formData.lastName}
          />
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

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            onChange={handleInputChange}
            value={formData.confirmPassword}
          />

          <AuthButton type="submit" isLoading={isLoading} className="w-full">
            Create account
          </AuthButton>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentPage("login")}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </button>
          </p>
        </form>
        <ToastContainer />
      </AuthLayout>
    </>
  );
};
