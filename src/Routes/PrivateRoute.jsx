import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading,isVerified } = useAuth();
    const location = useLocation();

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    if (user && isVerified) {
        return children;
    }

    if (user && !isVerified) {
        return (
            <div className="text-center p-4">
                <h2 className="text-2xl font-bold">Email Not Verified</h2>
                <p className="text-gray-600">Please verify your email address to access this page.</p>
                
            </div>
        );
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;