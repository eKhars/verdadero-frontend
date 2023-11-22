import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <svg className="animate-spin h-12 w-12 text-white" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.83 5.465A9.956 9.956 0 0012 20c2.29 0 4.387-.773 6.078-2.07l-1.415-1.414C16.897 17.303 14.573 18 12 18c-3.308 0-6-2.692-6-6H4c0 2.09.807 4.002 2.83 5.465zM12 4v4l3.485 3.485-1.415 1.415L10 9"
          ></path>
        </svg>
      </div>
    );
  }
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
