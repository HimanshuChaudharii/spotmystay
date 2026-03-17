import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
