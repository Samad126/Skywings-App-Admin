import { useAppContext } from "@/hooks/useAppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { adminId } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminId) {
      navigate("/login");
    }
  }, [adminId, navigate]);

  return adminId ? children : null;
}

export default ProtectedRoute;
