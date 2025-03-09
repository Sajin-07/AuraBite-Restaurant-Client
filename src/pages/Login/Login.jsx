// import { useContext, useEffect, useState } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import { AuthContext } from '../../providers/AuthProvider';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import Swal from 'sweetalert2';
// import SocialLogin from '../../components/SocialLogin/SocialLogin';
// import useAxiosPublic from '../../hooks/useAxiosPublic';

// const Login = () => {
//     const [disabled, setDisabled] = useState(true);
//     const { signIn } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const axiosPublic = useAxiosPublic();

//     const from = location.state?.from?.pathname || "/";

//     useEffect(() => {
//         loadCaptchaEnginge(6);
//     }, []);

//     const handleLogin = event => {
//         event.preventDefault();
//         const form = event.target;
//         const email = form.email.value;
//         const password = form.password.value;

//         signIn(email, password)
//             .then(result => {
//                 Swal.fire({
//                     title: 'Welcome Back!',
//                     text: 'Login Successful',
//                     icon: 'success',
//                     background: '#1E1E1E',
//                     color: '#FFD700',
//                     confirmButtonColor: '#DAA520'
//                 });

//                 const tok = { email };
//                 axiosPublic.post('https://aurabite-restaurant-server.onrender.com/jwt', tok, { withCredentials: true })
//                     .then(res => console.log(res.data));

//                 navigate(from, { replace: true });
//             });
//     };

//     const handleValidateCaptcha = (e) => {
//         const user_captcha_value = e.target.value;
//         setDisabled(!validateCaptcha(user_captcha_value));
//     };

//     return (
//         <>
//             <Helmet>
//                 <title>AuraBite | Login</title>
//             </Helmet>
//             <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
//                 <div className="w-full max-w-2xl p-8 rounded-lg shadow-lg bg-[#1E1E1E] border border-gray-700">
//                     <h1 className="text-4xl font-bold text-center text-[#FFD700]">Welcome Back!</h1>
//                     <p className="text-gray-400 text-center mb-6">Login to enjoy delicious meals</p>

//                     <form onSubmit={handleLogin} className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Enter your email"
//                                 className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300">Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Enter your password"
//                                 className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
//                                 required
//                             />
//                             <Link to="#" className="text-xs text-[#FFD700] hover:underline block text-right mt-2">Forgot password?</Link>
//                         </div>

//                         {/* Captcha Section */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300">Captcha</label>
//                             <LoadCanvasTemplate />
//                             <input
//                                 onBlur={handleValidateCaptcha}
//                                 type="text"
//                                 name="captcha"
//                                 placeholder="Type the captcha"
//                                 className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
//                                 required
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={disabled}
//                             className={`w-full px-4 py-3 text-lg font-semibold text-black bg-[#FFD700] rounded-lg shadow-md hover:bg-[#DAA520] transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
//                             Login
//                         </button>
//                     </form>

//                     <p className="text-center text-gray-400 mt-4">
//                         New Here? <Link to="/signup" className="text-[#FFD700] hover:underline">Create an account</Link>
//                     </p>

//                     <div className="mt-6">
//                         <SocialLogin />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;





import { useContext, useEffect, useState, useRef } from "react";
import {FaTimes } from 'react-icons/fa';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn, forgetPassword ,sendVerificationEmail} = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [showBanner, setShowBanner] = useState(false); // State to handle banner visibility
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      toast.warning("Please enter both email and password.");
      return;
    }

    try {
      const result = await signIn(email, password);
      if (!result.user.emailVerified) {
        setShowBanner(true);
        return
      }
      // If email is verified, proceed with login
      setSuccess("User logged in successfully.");
      e.target.reset();
      console.log(result.user);

      // Get access token
      const tok = { email };
      const res = await axiosPublic.post("/jwt", tok, {
        withCredentials: true,
      });
      console.log(res.data);

      // Update lastSignInTime in the database
      const userData = {
        email,
        lastLoggedAt: result.user?.metadata?.lastSignInTime,
      };

      const reply = await axiosPublic.patch("userUpdate", userData);
      if (reply.data.message) {
        console.error(reply.data.message);
      } else {
        console.log("User updated:", reply.data);
        navigate(from, { replace: true });
      }

      // Clear the form fields
      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {
      console.error(error);
      setRegisterError("Invalid email or password. Please try again.");
      toast.error("Invalid email or password. Please try again.");
    }
  };
  const handleResendEmail = async () => {
    try {
      setIsResendDisabled(true); // Disable button
      await sendVerificationEmail(); // Your function to send verification email
      toast.success("Verification email sent. Please check your inbox.");
      setTimeout(() => setEmailSent(false), 60000);
      setTimeout(() => setIsResendDisabled(false), 60000); // Enable after 1 minutes
    } catch (error) {
      console.error(error);
      toast.error("Failed to send verification email.");
      setIsResendDisabled(false); // Re-enable in case of failure
    }
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value.trim();
    if (!email) {
      toast.warning("Please provide an email.");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    // Send password reset email
    forgetPassword(email)
      .then(() => {
        toast.success("Password reset email sent. Please check your email.");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to send password reset email. Please try again.");
      });
  };


  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    setDisabled(!validateCaptcha(user_captcha_value));
  };

  return (
    <>
      <Helmet>
        <title>AuraBite | Login</title>
      </Helmet>
      {showBanner && (
        <div className="fixed top-0 left-0 w-full z-50 bg-[#FFD700] text-white px-4 py-2 flex justify-between items-center">
          <p className="text-sm mx-auto font-semibold">
            Please verify your email address. 
            <button
              onClick={handleResendEmail}
              disabled={isResendDisabled}
              className={`ml-2 underline ${isResendDisabled ? "opacity-50 cursor-not-allowed" : "hover:no-underline"}`}
            >
              Resend
            </button>
          </p>
          <button onClick={() => setShowBanner(false)} className="p-2">
            <FaTimes className="text-white" />
          </button>
        </div>
      )}
      <div className="hero min-h-screen bg-[#121212]">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="email"
                  className="input input-bordered"
                  autoComplete="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  ref={passwordRef}
                  placeholder="password"
                  className="input input-bordered"
                  autoComplete="current-password"
                />
            
                <label className="label">
                  <a
                    onClick={handleForgetPassword}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>

              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="Type the captcha above"
                  className="input input-bordered"
                />
              </div>
              <button
                type="submit"
                disabled={disabled}
                className={`w-full px-4 py-3 text-lg font-semibold text-black bg-[#FFD700] rounded-lg shadow-md hover:bg-[#DAA520] transition-all duration-300 ${
                  disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Login
              </button>
            </form>
            <p className="px-6">
              <small>
                New Here? <Link to="/signup">Create an account</Link>
              </small>
            </p>
            <SocialLogin />
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};

export default Login;



//main
// import { useContext, useEffect, useState, useRef } from "react";
// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplate,
//   validateCaptcha,
// } from "react-simple-captcha";
// import { AuthContext } from "../../providers/AuthProvider";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";
// import SocialLogin from "../../components/SocialLogin/SocialLogin";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// // Toastify
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const [disabled, setDisabled] = useState(true);
//   const { signIn, forgetPassword ,sendVerificationEmail} = useContext(AuthContext);
//   const [registerError, setRegisterError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [emailSent, setEmailSent] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const axiosPublic = useAxiosPublic();
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

//   const from = location.state?.from?.pathname || "/";
//   console.log("state in the location login page", location.state);

//   useEffect(() => {
//     loadCaptchaEnginge(6);
//   }, []);
  
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const email = emailRef.current.value.trim();
//     const password = passwordRef.current.value.trim();

//     if (!email || !password) {
//       toast.warning("Please enter both email and password.");
//       return;
//     }

//     try {
//       const result = await signIn(email, password);
//       if (!result.user.emailVerified) {
//         toast.error("Please verify your email address.");
        
//         if (!emailSent) {
//           await sendVerificationEmail();
//           toast.info("Verification email sent! Please check your inbox.");
//           setEmailSent(true);
//           setTimeout(() => setEmailSent(false), 60000); // Allow resending after 60 seconds
//         } else {
//           toast.warning("Please wait before requesting another email.");
//         }
//         return;
//       }

//       // If email is verified, proceed with login
//       setSuccess("User logged in successfully.");
//       e.target.reset();
//       console.log(result.user);

//       // Get access token
//       const tok = { email };
//       const res = await axiosPublic.post("/jwt", tok, {
//         withCredentials: true,
//       });
//       console.log(res.data);

//       // Update lastSignInTime in the database
//       const userData = {
//         email,
//         lastLoggedAt: result.user?.metadata?.lastSignInTime,
//       };

//       const reply = await axiosPublic.patch("userUpdate", userData);
//       if (reply.data.message) {
//         console.error(reply.data.message);
//       } else {
//         console.log("User updated:", reply.data);
//         navigate(from, { replace: true });
//       }

//       // Clear the form fields
//       emailRef.current.value = "";
//       passwordRef.current.value = "";
//     } catch (error) {
//       console.error(error);
//       setRegisterError("Invalid email or password. Please try again.");
//       toast.error("Invalid email or password. Please try again.");
//     }
//   };

//   const handleForgetPassword = () => {
//     const email = emailRef.current.value.trim();
//     if (!email) {
//       toast.warning("Please provide an email.");
//       return;
//     }
//     if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
//       toast.warning("Please enter a valid email address.");
//       return;
//     }

//     // Send password reset email
//     forgetPassword(email)
//       .then(() => {
//         toast.success("Password reset email sent. Please check your email.");
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("Failed to send password reset email. Please try again.");
//       });
//   };


//   const handleValidateCaptcha = (e) => {
//     const user_captcha_value = e.target.value;
//     setDisabled(!validateCaptcha(user_captcha_value));
//   };

//   return (
//     <>
//       <Helmet>
//         <title>AuraBite | Login</title>
//       </Helmet>
//       <div className="hero min-h-screen bg-[#121212]">
//         <div className="hero-content flex-col md:flex-row-reverse">
//           <div className="text-center md:w-1/2 lg:text-left">
//             <h1 className="text-5xl font-bold">Login now!</h1>
//             <p className="py-6">
//               Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//               excepturi exercitationem quasi. In deleniti eaque aut repudiandae
//               et a id nisi.
//             </p>
//           </div>
//           <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
//             <form onSubmit={handleLogin} className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   ref={emailRef}
//                   placeholder="email"
//                   className="input input-bordered"
//                   autoComplete="email"
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   ref={passwordRef}
//                   placeholder="password"
//                   className="input input-bordered"
//                   autoComplete="current-password"
//                 />
            
//                 <label className="label">
//                   <a
//                     onClick={handleForgetPassword}
//                     href="#"
//                     className="label-text-alt link link-hover"
//                   >
//                     Forgot password?
//                   </a>
//                 </label>

//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <LoadCanvasTemplate />
//                 </label>
//                 <input
//                   onBlur={handleValidateCaptcha}
//                   type="text"
//                   name="captcha"
//                   placeholder="Type the captcha above"
//                   className="input input-bordered"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={disabled}
//                 className={`w-full px-4 py-3 text-lg font-semibold text-black bg-[#FFD700] rounded-lg shadow-md hover:bg-[#DAA520] transition-all duration-300 ${
//                   disabled ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 Login
//               </button>
//             </form>
//             <p className="px-6">
//               <small>
//                 New Here? <Link to="/signup">Create an account</Link>
//               </small>
//             </p>
//             <SocialLogin />
//           </div>
//         </div>
//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="dark"
//         />
//       </div>
//     </>
//   );
// };

// export default Login;





