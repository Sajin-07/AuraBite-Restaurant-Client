import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const [, refetch] = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        refetch(); // Trigger cart refetch when the component mounts
    }, [refetch]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <motion.div 
                className="bg-gray-900 shadow-xl rounded-lg p-8 text-center border border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Animated Check Icon */}
                <motion.div 
                    className="text-green-500 text-6xl mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10 }}
                >
                    <FaCheckCircle />
                </motion.div>

                <h1 className="text-3xl font-bold mb-2 animate-pulse">Payment Successful!</h1>
                <p className="text-gray-400 mb-6">Your transaction has been completed.</p>

                {/* Animated Button */}
                <motion.button 
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/")}
                >
                    Go to Homepage
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Success;












//maiin
// import { useEffect } from "react";
// import useCart from "../../../hooks/useCart";

// const Success = () => {
//     const [, refetch] = useCart(); 

//     useEffect(() => {
//         refetch(); // Trigger cart refetch when the component mounts
//     }, [refetch]);

//     return (
//         <>
//             <h1>Payment Success</h1>
//         </>
//     );
// };

// export default Success;
