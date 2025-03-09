
import { useState } from "react";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const CartDrawer = () => {
    const [cart, refetch] = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure();

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Handle Quantity Update
    const handleQuantityChange = async (id, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity below 1

        try {
            const response = await axiosSecure.patch(`/carts/${id}`, { quantity: newQuantity });
            if (response.data) {
                refetch(); // Refresh cart data
            }
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };

    // Handle Item Deletion
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire("Deleted!", "Item removed from cart.", "success");
                        }
                    });
            }
        });
    };

    return (
        <>
            {/* Cart Button to Open Drawer */}
            <button
                className="fixed bottom-5 right-5 z-50 bg-orange-500 text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-orange-600 transition-all"
                onClick={() => setIsOpen(true)}
            >
                <FaShoppingCart />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">{cart.length}</span>
                {/* <span>{cart.length}</span> */}
            </button>

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} z-50`}>
                <div className="p-5 flex justify-between items-center border-b">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button className="btn btn-outline" onClick={() => setIsOpen(false)}>Close</button>
                </div>

                {/* Cart Items */}
                <div className="p-5 overflow-y-auto max-h-[65vh]">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item._id} className="flex items-center justify-between p-3 border-b">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                                <div className="flex-1 ml-3">
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                    
                                    {/* Quantity Control */}
                                    <div className="flex items-center mt-2">
                                        <button 
                                            className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full"
                                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                        >-</button>
                                        <span className="mx-3">{item.quantity}</span>
                                        <button 
                                            className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full"
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                        >+</button>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                                    <FaTrashAlt />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Total Price and Checkout */}
                <div className="p-5 border-t">
                    <h3 className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</h3>
                    {cart.length > 0 && (
                        <Link to="dashboard/Cart"><button className="btn btn-success w-full mt-3">Proceed to Checkout</button></Link>
                    )}
                </div>
            </div>
            {/* Overlay when Drawer is Open */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default CartDrawer;


//maain
// import { useState } from "react";
// import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
// import useCart from "../../../hooks/useCart";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { Link } from "react-router-dom";

// const CartDrawer = () => {
//     const [cart, refetch] = useCart();
//     const [isOpen, setIsOpen] = useState(false);
//     const axiosSecure = useAxiosSecure();

//     const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

//     // Handle Quantity Update
//     const handleQuantityChange = async (id, newQuantity) => {
//         if (newQuantity < 1) return; // Prevent quantity below 1

//         try {
//             const response = await axiosSecure.patch(`/carts/${id}`, { quantity: newQuantity });
//             if (response.data) {
//                 refetch(); // Refresh cart data
//             }
//         } catch (error) {
//             console.error("Failed to update quantity:", error);
//         }
//     };

//     // Handle Item Deletion
//     const handleDelete = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/carts/${id}`)
//                     .then(res => {
//                         if (res.data.deletedCount) {
//                             refetch();
//                             Swal.fire("Deleted!", "Item removed from cart.", "success");
//                         }
//                     });
//             }
//         });
//     };

//     return (
//         <>
//             {/* Cart Button to Open Drawer */}
//             <button
//                 className="fixed top-1/2 right-5 transform -translate-y-1/2 z-50 btn btn-primary flex items-center gap-2"
//                 onClick={() => setIsOpen(true)}
//             >
//                 <FaShoppingCart />
//                 <span>{cart.length}</span>
//             </button>

//             {/* Drawer */}
//             <div className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} z-50`}>
//                 <div className="p-5 flex justify-between items-center border-b">
//                     <h2 className="text-xl font-bold">Your Cart</h2>
//                     <button className="btn btn-outline" onClick={() => setIsOpen(false)}>Close</button>
//                 </div>

//                 {/* Cart Items */}
//                 <div className="p-5 overflow-y-auto h-[70vh]">
//                     {cart.length === 0 ? (
//                         <p className="text-center text-gray-500">Your cart is empty.</p>
//                     ) : (
//                         cart.map((item) => (
//                             <div key={item._id} className="flex items-center justify-between p-3 border-b">
//                                 <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
//                                 <div className="flex-1 ml-3">
//                                     <h3 className="font-bold">{item.name}</h3>
//                                     <p>${(item.price * item.quantity).toFixed(2)}</p>
                                    
//                                     {/* Quantity Control */}
//                                     <div className="flex items-center mt-2">
//                                         <button 
//                                             className="btn btn-sm btn-outline"
//                                             onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
//                                         >-</button>
//                                         <span className="mx-3">{item.quantity}</span>
//                                         <button 
//                                             className="btn btn-sm btn-outline"
//                                             onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
//                                         >+</button>
//                                     </div>
//                                 </div>
//                                 <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-outline text-red-500">
//                                     <FaTrashAlt />
//                                 </button>
//                             </div>
//                         ))
//                     )}
//                 </div>

//                 {/* Total Price and Checkout */}
//                 <div className="p-5 border-t">
//                     <h3 className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</h3>
//                     {cart.length > 0 && (
//                         <Link to="dashboard/Cart"><button className="btn btn-success w-full mt-3">Proceed to Checkout</button></Link>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CartDrawer;