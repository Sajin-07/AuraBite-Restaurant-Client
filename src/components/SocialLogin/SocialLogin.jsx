import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            console.log(result.user);

            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            };

            const userResponse = await axiosPublic.post('/users', userInfo);
            console.log(userResponse.data);

            const tokenResponse = await axiosPublic.post('https://aurabite-restaurant-server.onrender.com/jwt', 
                { email: result.user?.email }, 
                { withCredentials: true }
            );
            console.log(tokenResponse.data);

            navigate(from, { replace: true });
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2" />
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;


// import { FaGoogle } from "react-icons/fa";
// import useAuth from "../../hooks/useAuth";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// const SocialLogin = () => {
//     const { googleSignIn } = useAuth();
//     const axiosPublic = useAxiosPublic();
//     const navigate = useNavigate();

//     const handleGoogleSignIn = () => {
//         googleSignIn()
//         .then(result => {
//             console.log(result.user);
//             const userInfo = {
//                 email: result.user?.email,
//                 name: result.user?.displayName
//             }
            
//             axiosPublic.post('/users', userInfo)
//             .then(res => {
//                 console.log(res.data);
                
//                 const tok = { email: result.user?.email };
//                 axios.post('https://aurabite-restaurant-server.onrender.com/jwt', tok,{ withCredentials: true })
//                     .then(res => {
//                         console.log(res.data);
//                     });
                
//                 navigate('/');
//             })
//         })
//     }

//     return (
//         <div className="p-8">
//             <div className="divider"></div>
//             <div>
//                 <button onClick={handleGoogleSignIn} className="btn">
//                     <FaGoogle className="mr-2"></FaGoogle>
//                     Google
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SocialLogin;