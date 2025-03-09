import { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";
// Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { createUser, updateUserProfile, sendVerificationEmail } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const accepted = form.terms.checked;

    setRegisterError("");
    setSuccess("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setRegisterError("Invalid email format.");
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
      setRegisterError("Password must meet all requirements.");
      return;
    }
    if (!accepted) {
      setRegisterError("Please accept our terms and conditions!");
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user; // Current user
      // console.log(user);
      setSuccess("User created successfully.");
      // Update profile
      await updateUserProfile(name, "https://example.com/default-profile.jpg");
      console.log("Profile updated successfully.");

      // Send verification email
      await sendVerificationEmail();
      alert("Please check your email to verify your account.")
      // toast.info("Please check your email to verify your account.")
     
      const userData = { name, email, lastLoggedAt: null };
      axiosPublic
        .post("/users", userData)
        .then((response) => {
          if (response.data._id) {
            console.log("User added to the database");
            navigate("/login"); // Navigate only after successful database entry
          }
        })
        .catch((error) => {
          console.error("Database Error:", error);
        });
      // Reset the form
      form.reset();
      setPassword(""); // Clear password state
    } catch (error) {
      setRegisterError(error.code === "auth/email-already-in-use" ? "This email is already in use." : "An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>AuraBite | Sign Up</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-[#121212] p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Sign Up</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" autoComplete="new-name" className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white" required />
            <input type="email" name="email" placeholder="Email" autoComplete="new-email" className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white" required />
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" value={password} autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white" required />
              <span className="absolute right-3 top-3 cursor-pointer text-gray-700 dark:text-gray-300" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="text-sm text-gray-900 dark:text-gray-300">
              <p>Password must contain:</p>
              <ul>
                <li className={password.length >= 8 ? "text-green-600" : "text-red-600"}>At least 8 characters</li>
                <li className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-600"}>At least one uppercase letter</li>
                <li className={/[0-9]/.test(password) ? "text-green-600" : "text-red-600"}>At least one number</li>
                <li className={/[!@#$%^&*]/.test(password) ? "text-green-600" : "text-red-600"}>At least one special character</li>
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms" className="text-sm text-gray-900 dark:text-gray-300">Accept <a href="/terms" className="text-blue-600">Terms and Conditions</a></label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Sign Up</button>
          </form>
          {registerError && <p className="text-red-600 mt-2 text-sm">{registerError}</p>}
          {success && <p className="text-green-600 mt-2 text-sm">{success}</p>}
          <p className="mt-4 text-center text-sm text-gray-900 dark:text-gray-300">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
          <SocialLogin />
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

export default SignUp;


// // flowbite
// import { useState, useContext } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../providers/AuthProvider";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import SocialLogin from "../../components/SocialLogin/SocialLogin";
// import { Helmet } from "react-helmet-async";

// const SignUp = () => {
//   const { createUser, updateUserProfile, sendVerificationEmail } =useContext(AuthContext); // Get createUser from context
//   const [registerError, setRegisterError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const axiosPublic = useAxiosPublic();
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const name = form.name.value.trim();
//     const email = form.email.value.trim();
//     const accepted = form.terms.checked;

//     // Reset error and success messages
//     setRegisterError("");
//     setSuccess("");

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setRegisterError("Invalid email format.");
//       return;
//     }

//     // Password validation
//     if (password.length < 8) {
//       setRegisterError("Password should be at least 8 characters long.");
//       return;
//     }
//     if (!/[A-Z]/.test(password)) {
//       setRegisterError(
//         "Password should contain at least one uppercase letter."
//       );
//       return;
//     }
//     if (!/[0-9]/.test(password)) {
//       setRegisterError("Password should contain at least one number.");
//       return;
//     }
//     if (!/[!@#$%^&*]/.test(password)) {
//       setRegisterError(
//         "Password should contain at least one special character (!@#$%^&*)."
//       );
//       return;
//     }
//     if (!accepted) {
//       setRegisterError("Please accept our terms and conditions!");
//       return;
//     }

//     try {
//       // Create user with context
//       const result = await createUser(email, password);
//       const user = result.user; // Current user
//       console.log(user);
//       setSuccess("User created successfully.");

//       // Update profile
//       await updateUserProfile(name, "https://example.com/default-profile.jpg");
//       console.log("Profile updated successfully.");

//       // Send verification email
//       await sendVerificationEmail();
//       alert("Please check your email to verify your account.");

//       // Add user to the database
//       // const userName = user.displayName;
//       //   const createdAt = user?.metadata?.creationTime;
//       const userData = { name, email, lastLoggedAt: null };

//       axiosPublic
//         .post("/users", userData)
//         .then((response) => {
//           if (response.data._id) {
//             console.log("User added to the database");
//             navigate("/login"); // Navigate only after successful database entry
//           }
//         })
//         .catch((error) => {
//           console.error("Database Error:", error);
//         });

//       // Reset the form
//       form.reset();
//       setPassword(""); // Clear password state
//     } catch (error) {
//       console.error(error);
//       if (error.code === "auth/email-already-in-use") {
//         setRegisterError("This email is already in use.");
//       } else {
//         setRegisterError("An error occurred. Please try again later.");
//       }
//     }
//   };
 

//   return (
//     <>
//       <Helmet>
//         <title>AuraBite | Sign Up</title>
//       </Helmet>
//       <div className="mx-auto md:w-1/2">
//         <h2 className="text-3xl mt-16 mb-8">SignUp</h2>

//         <form onSubmit={handleRegister} autoComplete="on" class="max-w-md mx-auto">
          
//           <div class="relative z-0 w-full mb-5 group">
//               <input type="text" name="name" id="floating_first_name" autoComplete="new-name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//               <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
//           </div>
          

//           <div class="relative z-0 w-full mb-5 group">
//               <input type="email" name="floating_email" id="floating_email" autoComplete='new-email' class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//               <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
//           </div>
          
//           <div class="relative z-0 w-full mb-5 group">
//               <input type={showPassword ? "text" : "password"} name="password" id="floating_password" value={password} autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//               <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
//               <span
//               className="absolute top-3 right-2 cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//           </div>

//           <div className="password-guidelines text-sm mb-4">
//             <p>Password must contain:</p>
//             <ul>
//               <li style={{ color: password.length >= 8 ? "green" : "red" }}>
//                 At least 8 characters
//               </li>
//               <li style={{ color: /[A-Z]/.test(password) ? "green" : "red" }}>
//                 At least one uppercase letter
//               </li>
//               <li style={{ color: /[0-9]/.test(password) ? "green" : "red" }}>
//                 At least one number
//               </li>
//               <li
//                 style={{ color: /[!@#$%^&*]/.test(password) ? "green" : "red" }}
//               >
//                 At least one special character (!@#$%^&*)
//               </li>
//             </ul>
//           </div>

//           <div className="mb-2">
//             <input type="checkbox" name="terms" id="terms" />
//             <label className="ml-2" htmlFor="terms">
//               Accept our{" "}
//               <a href="/terms" target="_blank" rel="noopener noreferrer">
//                 Terms and Conditions
//               </a>
//             </label>
//           </div>

//           <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
//         </form>


      

//         {registerError && <p className="text-red-700">{registerError}</p>}
//         {success && <p className="text-green-600">{success}</p>}
//         <p>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//         <SocialLogin></SocialLogin>
//       </div>
//     </>
//   );
// };

// export default SignUp;

// // main
// import { useState, useContext } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../providers/AuthProvider";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import SocialLogin from "../../components/SocialLogin/SocialLogin";
// import { Helmet } from "react-helmet-async";

// const SignUp = () => {
//   const { createUser, updateUserProfile, sendVerificationEmail } =useContext(AuthContext); // Get createUser from context
//   const [registerError, setRegisterError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const axiosPublic = useAxiosPublic();
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const name = form.name.value.trim();
//     const email = form.email.value.trim();
//     const accepted = form.terms.checked;

//     // Reset error and success messages
//     setRegisterError("");
//     setSuccess("");

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setRegisterError("Invalid email format.");
//       return;
//     }

//     // Password validation
//     if (password.length < 8) {
//       setRegisterError("Password should be at least 8 characters long.");
//       return;
//     }
//     if (!/[A-Z]/.test(password)) {
//       setRegisterError(
//         "Password should contain at least one uppercase letter."
//       );
//       return;
//     }
//     if (!/[0-9]/.test(password)) {
//       setRegisterError("Password should contain at least one number.");
//       return;
//     }
//     if (!/[!@#$%^&*]/.test(password)) {
//       setRegisterError(
//         "Password should contain at least one special character (!@#$%^&*)."
//       );
//       return;
//     }
//     if (!accepted) {
//       setRegisterError("Please accept our terms and conditions!");
//       return;
//     }

//     try {
//       // Create user with context
//       const result = await createUser(email, password);
//       const user = result.user; // Current user
//       console.log(user);
//       setSuccess("User created successfully.");

//       // Update profile
//       await updateUserProfile(
//         name,
//         "https://example.com/default-profile.jpg",
//       );
//       console.log("Profile updated successfully.");

//       // Send verification email
//       await sendVerificationEmail();
//       alert("Please check your email to verify your account.");

//       // Add user to the database
//       // const userName = user.displayName;
//     //   const createdAt = user?.metadata?.creationTime;
//       const userData = { name, email, lastLoggedAt: null };

//       axiosPublic
//         .post("/users", userData)
//         .then((response) => {
//           if (response.data._id) {
//             console.log("User added to the database");
//             navigate("/login"); // Navigate only after successful database entry
//           }
//         })
//         .catch((error) => {
//           console.error("Database Error:", error);
//         });

//       // Reset the form
//       form.reset();
//       setPassword(""); // Clear password state
//     } catch (error) {
//       console.error(error);
//       if (error.code === "auth/email-already-in-use") {
//         setRegisterError("This email is already in use.");
//       } else {
//         setRegisterError("An error occurred. Please try again later.");
//       }
//     }
//   };

//   return (
//     <>
//          <Helmet>
//           <title>AuraBite | Sign Up</title>
//         </Helmet>
// <div className="mx-auto md:w-1/2">
//       <h2 className="text-3xl mb-8">SignUp</h2>
//       <form onSubmit={handleRegister} autoComplete="off">
//         <input
//           className="mb-4 w-full py-2 px-4"
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           autoComplete="new-name"
//           required
//         />
//         <input
//           className="mb-4 w-full py-2 px-4"
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           autoComplete="new-email"
//           required
//         />

//         <div className="mb-4 relative border">
//           <input
//             className="w-full py-2 px-4"
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={password}
//             autoComplete="new-password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <span
//             className="absolute top-3 right-2 cursor-pointer"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>
//         <div className="password-guidelines text-sm mb-4">
//           <p>Password must contain:</p>
//           <ul>
//             <li style={{ color: password.length >= 8 ? "green" : "red" }}>
//               At least 8 characters
//             </li>
//             <li style={{ color: /[A-Z]/.test(password) ? "green" : "red" }}>
//               At least one uppercase letter
//             </li>
//             <li style={{ color: /[0-9]/.test(password) ? "green" : "red" }}>
//               At least one number
//             </li>
//             <li
//               style={{ color: /[!@#$%^&*]/.test(password) ? "green" : "red" }}
//             >
//               At least one special character (!@#$%^&*)
//             </li>
//           </ul>
//         </div>
//         <div className="mb-2">
//           <input type="checkbox" name="terms" id="terms" />
//           <label className="ml-2" htmlFor="terms">
//             Accept our{" "}
//             <a href="/terms" target="_blank" rel="noopener noreferrer">
//               Terms and Conditions
//             </a>
//           </label>
//         </div>
//         <input
//           className="btn btn-secondary mb-4 w-full"
//           type="submit"
//           value="SignUp"
//         />
//       </form>
//       {registerError && <p className="text-red-700">{registerError}</p>}
//       {success && <p className="text-green-600">{success}</p>}
//       <p>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//       <SocialLogin></SocialLogin>
//     </div>

//     </>

//   );
// };

// export default SignUp;
