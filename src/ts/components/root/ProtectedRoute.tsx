// import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
// import {RootState} from '@/redux/store';


const ProtectedRoute = () => {
    // const user = useSelector((state: RootState) => state.user);
    // let userAuth = user.isAuthenticated;
    let userAuth = true;

    return userAuth ? <Outlet /> : <Navigate to="/login" />

};

export default ProtectedRoute;
