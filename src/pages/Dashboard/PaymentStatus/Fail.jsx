import { motion } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Fail = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <motion.div
                className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.div
                    className="text-red-500 text-6xl"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.4, repeat: 2 }}
                >
                    <FaTimesCircle />
                </motion.div>
                
                <h1 className="text-2xl font-bold text-gray-800 mt-4">Payment Failed</h1>
                <p className="text-gray-600 mt-2">Oops! Something went wrong with your transaction.</p>
                
                {/* <button
                    onClick={() => navigate("/checkout")}
                    className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow transition-all"
                >
                    Try Again
                </button> */}
            </motion.div>
        </div>
    );
};

export default Fail;

// const Fail = () => {
   
//     return (
//         <h1>Payment Failed</h1>
//     );
// };

// export default Fail;