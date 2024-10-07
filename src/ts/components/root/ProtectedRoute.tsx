// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RoleAccount } from "@/api/Account/types.ts";
// import { RootState } from '@/redux/store';

interface ProtectedRouteProps {
    allowedRoles?: RoleAccount[];  // Zmienione na opcjonalne
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles = [] }) => {
    let userAuth = true; // Symulacja autoryzacji
    let userRole: RoleAccount = RoleAccount.Admin; // Symulacja roli użytkownika

    // Jeśli użytkownik nie jest zalogowany, przekieruj na stronę logowania
    if (!userAuth) {
        return <Navigate to="/login" />;
    }

    // Sprawdzenie ról, ale tylko jeśli przekazano allowedRoles (jeśli jest pusta, dostęp dla wszystkich)
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;