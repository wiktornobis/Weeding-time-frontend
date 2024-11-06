import { Navigate, Outlet } from "react-router-dom";
import { RoleAccount } from "@/api/Account/types.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ProtectedRouteProps {
    allowedRoles?: RoleAccount[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles = [] }) => {
    const { userRole, userAuth, loading } = useSelector((state: RootState) => state.auth);

    // Ekran ładowania podczas sprawdzania stanu logowania
    if (loading) {
        return <div></div>;
    }

    console.log(userRole, 'rola');
    console.log(userAuth, 'user Auth');

    if (!userAuth) {
        return <Navigate to="/logowanie" />;
    }

    // Sprawdzenie ról (jeśli allowedRoles jest puste, dostęp dla wszystkich)
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole as RoleAccount)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
