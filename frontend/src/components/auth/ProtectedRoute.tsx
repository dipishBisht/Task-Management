import { useAuth } from "../../store/auth";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

// # protecting the routes

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/signin", { replace: true });
    }
  }, [user, navigate]);
  return children;
}
