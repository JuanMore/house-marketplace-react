import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "./hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
    /// destructure and pass in loggedin and checkingstatus
    const { loggedIn, checkingStatus } = useAuthStatus()
    
    // render if loading
    if (checkingStatus) {
        return <Spinner />
    }

    // render redirect or outlet
    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
};

export default PrivateRoute

