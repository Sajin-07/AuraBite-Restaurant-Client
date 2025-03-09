import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "https://aura-bite-server.vercel.app",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { user,logOut } = useAuth();
    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(
          (response) => response, // Return the response normally
          async (error) => {
            console.log("Error tracked in the interceptor:", error.response);
    
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
              try {
                await logOut();
                console.log("User signed out successfully");
    
                // Call backend to remove the cookie (no need to send `user`)
                await axios.post("https://aura-bite-server.vercel.app/clearCookie",user); //ei kaj chaile authProvider.jsx ew kora jaito.
    
                // Redirect user to sign-in page
                navigate("/login", { replace: true });
              } catch (signOutError) {
                console.error("Sign out error:", signOutError.message);
              }
            }
    
            return Promise.reject(error); // Ensure error is returned
          }
        );
        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;


// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//     baseURL: "https://aura-bite-server.vercel.app",
//     withCredentials: true,
// })
// const useAxiosSecure = () => {
//     const navigate = useNavigate();
//     const { logOut } = useAuth();
//     // intercepts 401 and 403 status
//     axiosSecure.interceptors.response.use(function (response) {
//         return response;
//     }, async (error) => {
//         const status = error.response.status;
//         // console.log('status error in the interceptor', status);
//         // for 401 or 403 logout the user and move the user to the login
//         if (status === 401 || status === 403) {
//             await logOut();
//             await axios.post("https://aura-bite-server.vercel.app/clearCookie",user);
//             navigate('/login');
//         }
//         return Promise.reject(error);
//     })


//     return axiosSecure;
// };

// export default useAxiosSecure;