import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaReceipt, FaDollarSign, FaCreditCard, FaCheckCircle, FaClock } from "react-icons/fa";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'success':
                return <span className="flex items-center gap-1 text-green-600 font-semibold"><FaCheckCircle /> Success</span>;
            case 'pending':
                return <span className="flex items-center gap-1 text-yellow-600 font-semibold"><FaClock /> Pending</span>;
            default:
                return <span className="text-red-600 font-semibold">Failed</span>;
        }
    };

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-amber-700 rounded-xl text-white">
                            <FaReceipt className="text-3xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Payment History</h1>
                            <p className="text-gray-600">Your transaction records</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-lg font-semibold text-amber-700 flex items-center gap-2">
                            <FaDollarSign className="text-xl" />
                            Total Payments: {payments.length}
                        </p>
                    </div>
                </div>

                {/* Payment Table (Hidden on mobile) */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hidden md:block">
                    {payments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead className="bg-amber-50">
                                    <tr className="text-amber-700 font-bold text-left">
                                        <th>#</th>
                                        <th ><FaDollarSign /> Amount</th>
                                        <th ><FaCreditCard /> Transaction ID</th>
                                        <th >Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment, index) => (
                                        <tr key={payment._id} className="hover:bg-amber-50 transition-all border-b">
                                            <td className="py-4 px-6">{index + 1}</td>
                                            <td className="py-4 px-6 text-green-600 font-semibold">${payment.price.toFixed(2)}</td>
                                            <td className="py-4 px-6 text-gray-600 font-mono">{payment.transactionId}</td>
                                            <td className="py-4 px-6">{getStatusBadge(payment.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <FaReceipt className="text-4xl mx-auto mb-4 text-gray-300" />
                            <p className="text-lg">No payment records found</p>
                        </div>
                    )}
                </div>

                {/* Mobile Cards (Hidden on larger screens) */}
                <div className="block md:hidden space-y-4 mt-4">
                    {payments.map((payment, index) => (
                        <div key={payment._id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-gray-700">#{index + 1}</span>
                                {getStatusBadge(payment.status)}
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Amount:</span>
                                    <span className="text-green-600 font-semibold">${payment.price.toFixed(2)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-500">Transaction ID:</span>
                                    <span className="text-gray-700 font-mono break-all">{payment.transactionId}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;


//maiin
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const PaymentHistory = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: payments = [] } = useQuery({
//         queryKey: ['payments', user.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/payments/${user.email}`)
//             return res.data;
//         }
//     })

//     return (
//         <div>
//             <h2 className="text3-xl">Total Payments: {payments.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>price</th>
//                             <th>Transaction Id</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {payments.map((payment, index) => <tr key={payment._id}>
//                             <th>{index + 1}</th>
//                             <td>${payment.price}</td>
//                             <td>{payment.transactionId}</td>
//                             <td>{payment.status}</td>
//                         </tr>)}
                        
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentHistory;