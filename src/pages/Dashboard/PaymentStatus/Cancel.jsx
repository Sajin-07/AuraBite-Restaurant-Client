import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
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
                    className="text-yellow-500 text-6xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, repeat: 1, repeatType: "reverse" }}
                >
                    <FaExclamationTriangle />
                </motion.div>
                
                <h1 className="text-2xl font-bold text-gray-800 mt-4">Payment Canceled</h1>
                <p className="text-gray-600 mt-2 text-center">
                    You have canceled the payment process. If this was a mistake, please try again.
                </p>
                
               
            </motion.div>
        </div>
    );
};

export default Cancel;

// const Cancel = () => {
   
//     return (
//         <h1>Payment Canceled</h1>
//     );
// };

// export default Cancel;