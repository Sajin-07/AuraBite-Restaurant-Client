import { FaTrashAlt, FaUser, FaEnvelope, FaMapMarkedAlt, FaCity, FaMailBulk, FaPhone, FaUtensils } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleDelete = id => {
        Swal.fire({
            title: "Remove Item?",
            text: "This will remove from your cart",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Remove",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(() => {
                        refetch();
                        Swal.fire("Removed!", "Item removed from cart", "success");
                    });
            }
        });
    };

    const handlePayment = async(e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value.trim();
        const email = user.email;
        const address = form.address.value.trim();
        const city = form.city.value.trim();
        const postcode = form.postcode.value.trim();
        const phone = form.phone.value.trim();
        
        const paymentData = {
            name,
            email,
            address,
            city,
            postcode,
            phone,
            totalPrice,
            menuItemIds: cart.map(item => item.menuId)
        };

        try {
            const res = await axiosSecure.post('http://localhost:5000/create-payment', paymentData);
            if (res.data.paymentUrl) {
                window.location.replace(res.data.paymentUrl);
            }
        } catch (error) {
            console.error("Payment Error:", error);
            Swal.fire("Error", "Failed to initiate payment", "error");
        }
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        
        axiosSecure.patch(`/carts/${id}`, { quantity: newQuantity })
            .then(() => refetch());
    };

    return (
        <div className="container mx-auto px-4 py-6 md:py-8">
            {/* Order Summary Section */}
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-2xl md:text-4xl font-bold text-amber-800 mb-3 md:mb-4 flex flex-col md:flex-row items-center justify-center gap-2">
                    <FaUtensils className="text-xl md:text-3xl" />
                    <span>Your Order Summary</span>
                </h1>
                <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mb-6 md:mb-8">
                    <div className="bg-amber-50 p-3 md:p-4 rounded-lg shadow-md w-full md:w-auto">
                        <p className="text-base md:text-xl font-semibold text-amber-800">Items: {cart.length}</p>
                    </div>
                    <div className="bg-amber-50 p-3 md:p-4 rounded-lg shadow-md w-full md:w-auto">
                        <p className="text-base md:text-xl font-semibold text-amber-800">Total: ${totalPrice.toFixed(2)}</p>
                    </div>
                </div>
                {/* {cart.length ? (
                    <Link to="/dashboard/payment" className="block w-full md:w-auto">
                        <button className="btn bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 md:px-8 md:py-3 rounded-full shadow-lg transition-all w-full md:w-auto">
                            Continue to Checkout →
                        </button>
                    </Link>
                ) : (
                    <button disabled className="btn bg-gray-300 text-gray-500 px-6 py-3 rounded-full w-full md:w-auto">
                        Continue to Checkout
                    </button>
                )} */}
            </div>

            {/* Cart Items Section */}
            <div className="grid gap-4 md:gap-6 mb-8 md:mb-12">
                {cart.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-md p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 border border-amber-50">
                        <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 w-full">
                            <h3 className="text-lg md:text-xl font-semibold text-amber-900 mb-1 md:mb-2">
                                {item.name} x({item.quantity})
                            </h3>
                            <p className="text-sm md:text-base text-gray-600 mb-2">${item.price.toFixed(2)} each</p>
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 bg-amber-50 px-2 py-1 md:px-3 md:py-1 rounded-full">
                                    <button 
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-amber-700 text-white hover:bg-amber-800 transition-colors text-sm md:text-base"
                                    >
                                        -
                                    </button>
                                    <span className="text-base md:text-lg font-medium w-6 text-center">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-amber-700 text-white hover:bg-amber-800 transition-colors text-sm md:text-base"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-base md:text-xl font-bold text-amber-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        <FaTrashAlt className="text-lg md:text-xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checkout Form Section */}
            <div className="bg-amber-50 rounded-xl shadow-lg p-4 md:p-8 border border-amber-100">
                <h2 className="text-xl md:text-3xl font-bold text-amber-900 mb-6 md:mb-8 flex items-center gap-2">
                    <FaMapMarkedAlt className="text-lg md:text-xl" />
                    <span>Delivery Information</span>
                </h2>
                <form onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Left Column */}
                    <div className="space-y-3 md:space-y-4">
                        <div className="form-group">
                            <label className="block text-sm md:text-base text-amber-900 font-medium mb-1 md:mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm md:text-base" />
                                <input
                                    type="text"
                                    className="w-full pl-10 md:pl-12 pr-3 py-2 md:py-3 text-sm md:text-base bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="John Doe"
                                    required
                                    name="name"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm md:text-base text-amber-900 font-medium mb-1 md:mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm md:text-base" />
                                <input
                                    type="email"
                                    className="w-full pl-10 md:pl-12 pr-3 py-2 md:py-3 text-sm md:text-base bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-not-allowed"
                                    placeholder="john@example.com"
                                    required
                                    name="email"
                                    value={user?.email || ''}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm md:text-base text-amber-900 font-medium mb-1 md:mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm md:text-base" />
                                <input
                                    type="tel"
                                    className="w-full pl-10 md:pl-12 pr-3 py-2 md:py-3 text-sm md:text-base bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="+880"
                                    required
                                    name="phone"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3 md:space-y-4">
                        <div className="form-group">
                            <label className="block text-sm md:text-base text-amber-900 font-medium mb-1 md:mb-2">
                                Address
                            </label>
                            <div className="relative">
                                <FaMapMarkedAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm md:text-base" />
                                <input
                                    type="text"
                                    className="w-full pl-10 md:pl-12 pr-3 py-2 md:py-3 text-sm md:text-base bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="123 Main Street"
                                    required
                                    name="address"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm md:text-base text-amber-900 font-medium mb-1 md:mb-2">
                                City
                            </label>
                            <div className="relative">
                                <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm md:text-base" />
                                <input
                                    type="text"
                                    className="w-full pl-10 md:pl-12 pr-3 py-2 md:py-3 text-sm md:text-base bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="New York"
                                    required
                                    name="city"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm md:text-base text-amber-900 font-medium mb-1 md:mb-2">
                                Postcode
                            </label>
                            <div className="relative">
                                <FaMailBulk className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm md:text-base" />
                                <input
                                    type="text"
                                    className="w-full pl-10 md:pl-12 pr-3 py-2 md:py-3 text-sm md:text-base bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="10001"
                                    required
                                    name="postcode"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 mt-6 md:mt-8">
                        {cart.length ? (
                            <button 
                                type="submit"
                                className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 md:py-4 px-6 rounded-xl text-base md:text-lg font-semibold transition-all shadow-lg hover:shadow-amber-200 flex items-center justify-center gap-2"
                            >
                                Confirm Order (${totalPrice.toFixed(2)})
                                <FaUtensils className="text-lg md:text-xl" />
                            </button>        
                        ) : (
                            <button 
                                type="submit"
                                disabled
                                className="w-full bg-gray-400 text-gray-600 py-3 md:py-4 px-6 rounded-xl text-base md:text-lg font-semibold flex items-center justify-center gap-2"
                            >
                                Confirm Order
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Cart;



// // //deepseek main
// import { FaTrashAlt, FaUser, FaEnvelope, FaMapMarkedAlt, FaCity, FaMailBulk, FaPhone, FaUtensils } from "react-icons/fa";
// import useCart from "../../../hooks/useCart";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { Link } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";

// const Cart = () => {
//     const [cart, refetch] = useCart();
//     const axiosSecure = useAxiosSecure();
//     const { user } = useAuth();
    
//     const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

//     const handleDelete = id => {
//         Swal.fire({
//             title: "Remove Item?",
//             text: "This will remove from your cart",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Remove",
//             cancelButtonText: "Cancel"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/carts/${id}`)
//                     .then(() => {
//                         refetch();
//                         Swal.fire("Removed!", "Item removed from cart", "success");
//                     });
//             }
//         });
//     };

//     const handlePayment = async(e)=>{
//         e.preventDefault();
//         const form = e.target;
//         const name = form.name.value.trim();
//         // const email = form.email.value.trim();
//         const email = user.email;
//         const address = form.email.value.trim();
//         const city = form.email.value.trim();
//         const postcode = form.email.value.trim();
//         const phone = form.email.value.trim();
//         console.log("yooo");
//         const paymentData = {name,email,address,city, postcode, phone,totalPrice, menuItemIds: cart.map(item => item.menuId)}

//         const res = await axiosSecure.post('http://localhost:5000/create-payment',paymentData)
//         console.log(res.data);

//         const redirectUrl = res.data.paymentUrl;
//         if (redirectUrl){
//             window.location.replace(redirectUrl);
//         }
//     }

//     const updateQuantity = (id, newQuantity) => {
//         if (newQuantity < 1) return;
        
//         axiosSecure.patch(`/carts/${id}`, { quantity: newQuantity })
//             .then(() => {
//                 refetch();
//             });
//     };

//     return (
//             <>
//                 <div className="container mx-auto px-4 py-8">
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl font-bold text-amber-800 mb-4 flex items-center justify-center gap-2">
//                         <FaUtensils className="text-3xl" />
//                         Your Order Summary
//                     </h1>
//                     <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
//                         <div className="bg-amber-50 p-4 rounded-lg shadow-md">
//                             <p className="text-xl font-semibold text-amber-800">Total Items: {cart.length}</p>
//                         </div>
//                         <div className="bg-amber-50 p-4 rounded-lg shadow-md">
//                             <p className="text-xl font-semibold text-amber-800">Total Amount: ${totalPrice.toFixed(2)}</p>
//                         </div>
//                     </div>
//                     {cart.length ? (
//                         <Link to="/dashboard/payment">
//                             <button className="btn bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full shadow-lg transition-all">
//                                 Continue to Checkout →
//                             </button>
//                         </Link>
//                     ) : (
//                         <button disabled className="btn bg-gray-300 text-gray-500 px-8 py-3 rounded-full">
//                             Continue to Checkout
//                         </button>
//                     )}
//                 </div>
    
//                 {/* Cart Items */}
//                 <div className="grid gap-6 mb-12">
//                     {cart.map((item, index) => (
//                         <div key={item._id} className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6 border border-amber-50">
//                             <div className="w-24 h-24 overflow-hidden rounded-lg">
//                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                             </div>
//                             <div className="flex-1">
//                                 <h3 className="text-xl font-semibold text-amber-900 mb-2">{item.name} x({item.quantity})</h3>
//                                 <p className="text-gray-600 mb-2">${item.price.toFixed(2)} each</p>
//                                 <div className="flex items-center gap-4">
//                                     <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full">
//                                         <button 
//                                             onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                                             className="w-8 h-8 rounded-full bg-amber-700 text-white hover:bg-amber-800 transition-colors"
//                                         >
//                                             -
//                                         </button>
//                                         <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
//                                         <button 
//                                             onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                                             className="w-8 h-8 rounded-full bg-amber-700 text-white hover:bg-amber-800 transition-colors"
//                                         >
//                                             +
//                                         </button>
//                                     </div>
//                                     <button
//                                         onClick={() => handleDelete(item._id)}
//                                         className="text-red-600 hover:text-red-700 transition-colors"
//                                     >
//                                         <FaTrashAlt className="text-xl" />
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="text-right">
//                                 <p className="text-xl font-bold text-amber-900">
//                                     ${(item.price * item.quantity).toFixed(2)}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
    
//                 {/* Checkout Form */}
//                 <div className="bg-amber-50 rounded-xl shadow-lg p-8 border border-amber-100">
//                     <h2 className="text-3xl font-bold text-amber-900 mb-8 flex items-center gap-2">
//                         <FaMapMarkedAlt />
//                         Delivery Information
//                     </h2>
//                     <form onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Form fields with updated styling */}
//                         <div className="space-y-4">
//                             <div className="form-group">
//                                 <label className="block text-amber-900 font-medium mb-2">Full Name</label>
//                                 <div className="relative">
//                                     <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600" />
//                                     <input
//                                         type="text"
//                                         className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                                         placeholder="John Doe"
//                                         required
//                                         name="name"
//                                     />
//                                 </div>
//                             </div>
    
//                             <div className="form-group">
//                                 <label className="block text-amber-900 font-medium mb-2">Email</label>
//                                 <div className="relative">
//                                     <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600" />
//                                     <input
//                                         type="email"
//                                         className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                                         placeholder="john@example.com"
//                                         required
//                                         name="email"
//                                     />
//                                 </div>
//                             </div>
    
//                             <div className="form-group">
//                                 <label className="block text-amber-900 font-medium mb-2">Phone Number</label>
//                                 <div className="relative">
//                                     <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600" />
//                                     <input
//                                         type="tel"
//                                         className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                                         placeholder="+880"
//                                         required
//                                         name="phone"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
    
//                         <div className="space-y-4">
//                             <div className="form-group">
//                                 <label className="block text-amber-900 font-medium mb-2">Address</label>
//                                 <div className="relative">
//                                     <FaMapMarkedAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600" />
//                                     <input
//                                         type="text"
//                                         className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                                         placeholder="123 Main Street"
//                                         required
//                                         name="address"
//                                     />
//                                 </div>
//                             </div>
    
//                             <div className="form-group">
//                                 <label className="block text-amber-900 font-medium mb-2">City</label>
//                                 <div className="relative">
//                                     <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600" />
//                                     <input
//                                         type="text"
//                                         className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                                         placeholder="New York"
//                                         required
//                                         name="city"
//                                     />
//                                 </div>
//                             </div>
    
//                             <div className="form-group">
//                                 <label className="block text-amber-900 font-medium mb-2">Postcode</label>
//                                 <div className="relative">
//                                     <FaMailBulk className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600" />
//                                     <input
//                                         type="text"
//                                         className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                                         placeholder="10001"
//                                         required
//                                         name="postcode"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
    
//                         <div className="md:col-span-2 mt-8">
//                             {cart.length ? (
//                                 <button 
//                                 type="submit"
//                                 className="w-full bg-amber-700 hover:bg-amber-800 text-white py-4 px-8 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-amber-200 flex items-center justify-center gap-2"
//                             >
//                                 Confirm Order (${totalPrice.toFixed(2)})
//                                 <FaUtensils className="text-xl" />
//                             </button>        
                               
//                             ) : (
//                                 <button 
//                                     type="submit"
//                                     disabled
//                                     className="w-full  bg-amber-700 hover:bg-amber-800 text-white py-4 px-8 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-amber-200 flex items-center justify-center gap-2"
//                                 >
//                                     Confirm Order (${totalPrice.toFixed(2)})
//                                     <FaUtensils className="text-xl" />
//                                 </button>
//                             )}
                            
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             </>
            
//         );
// };

// export default Cart;



























// //main
// import { FaTrashAlt, FaUser, FaEnvelope, FaMapMarkedAlt, FaCity, FaMailBulk, FaPhone } from "react-icons/fa";
// import useCart from "../../../hooks/useCart";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { Link } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";

// const Cart = () => {
//     const [cart, refetch] = useCart();
//     const axiosSecure = useAxiosSecure();
//     const { user } = useAuth();
    
//     const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

//     const handleDelete = id => {
//         Swal.fire({
//             title: "Remove Item?",
//             text: "This will remove from your cart",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Remove",
//             cancelButtonText: "Cancel"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/carts/${id}`)
//                     .then(() => {
//                         refetch();
//                         Swal.fire("Removed!", "Item removed from cart", "success");
//                     });
//             }
//         });
//     };

//     const handlePayment = async(e)=>{
//         e.preventDefault();
//         const form = e.target;
//         const name = form.name.value.trim();
//         // const email = form.email.value.trim();
//         const email = user.email;
//         const address = form.email.value.trim();
//         const city = form.email.value.trim();
//         const postcode = form.email.value.trim();
//         const phone = form.email.value.trim();
//         console.log("yooo");
//         const paymentData = {name,email,address,city, postcode, phone,totalPrice, menuItemIds: cart.map(item => item.menuId)}

//         const res = await axiosSecure.post('http://localhost:5000/create-payment',paymentData)
//         console.log(res.data);

//         const redirectUrl = res.data.paymentUrl;
//         if (redirectUrl){
//             window.location.replace(redirectUrl);
//         }
//     }

//     const updateQuantity = (id, newQuantity) => {
//         if (newQuantity < 1) return;
        
//         axiosSecure.patch(`/carts/${id}`, { quantity: newQuantity })
//             .then(() => {
//                 refetch();
//             });
//     };

//     return (
//         <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//                 <h2 className="text-2xl md:text-4xl">Items: {cart.length}</h2>
//                 <h2 className="text-2xl md:text-4xl">Total: ${totalPrice.toFixed(2)}</h2>
//                 {cart.length ? (
//                     <Link to="/dashboard/payment">
//                         <button className="btn btn-primary">Proceed to Pay</button>
//                     </Link>
//                 ) : (
//                     <button disabled className="btn btn-primary">Proceed to Pay</button>
//                 )}
//             </div>
            
//             <div className="overflow-x-auto">
//                 <table className="table w-full">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Item</th>
//                             <th>Name</th>
//                             <th>Quantity</th>
//                             <th>Price</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {cart.map((item, index) => (
//                             <tr key={item._id}>
//                                 <td>{index + 1}</td>
//                                 <td>
//                                     <div className="flex items-center gap-3">
//                                         <div className="avatar">
//                                             <div className="mask mask-squircle w-12 h-12">
//                                                 <img src={item.image} alt={item.name} />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td>{item.name}</td>
//                                 <td>
//                                     <div className="flex items-center gap-2">
//                                         <button className="btn btn-sm btn-outline" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
//                                         <span className="text-lg">{item.quantity}x</span>
//                                         <button className="btn btn-sm btn-outline" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
//                                     </div>
//                                 </td>
//                                 <td>${(item.price * item.quantity).toFixed(2)}</td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleDelete(item._id)}
//                                         className="btn btn-ghost btn-sm"
//                                     >
//                                         <FaTrashAlt className="text-red-600" />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             {/* CheckOut form------------------------------------------------------------------------------ */}
//             <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
//                     <h3 className="text-2xl text-white mb-6 font-semibold">Checkout Information</h3>
//                     <form onSubmit={handlePayment} className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {/* Name Field */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
//                                 <div className="relative">
//                                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                                         <FaUser />
//                                     </span>
//                                     <input 
//                                         type="text" 
//                                         className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                                         placeholder="John Doe"
//                                         required
//                                         name="name"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Email Field */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
//                                 <div className="relative">
//                                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                                         <FaEnvelope />
//                                     </span>
//                                     <input 
//                                         type="email" 
//                                         className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                                         placeholder="john@example.com"
//                                         required
//                                         name="email"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Address Field */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
//                             <div className="relative">
//                                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                                     <FaMapMarkedAlt />
//                                 </span>
//                                 <input 
//                                     type="text" 
//                                     className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                                     placeholder="123 Main Street"
//                                     required
//                                     name="address"
//                                 />
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {/* City Field */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
//                                 <div className="relative">
//                                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                                         <FaCity />
//                                     </span>
//                                     <input 
//                                         type="text" 
//                                         className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                                         placeholder="New York"
//                                         required
//                                         name="city"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Postcode Field */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-300 mb-2">Postcode</label>
//                                 <div className="relative">
//                                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                                         <FaMailBulk />
//                                     </span>
//                                     <input 
//                                         type="text" 
//                                         className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                                         placeholder="10001"
//                                         required
//                                         name="postcode"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Phone Field */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
//                             <div className="relative">
//                                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                                     <FaPhone />
//                                 </span>
//                                 <input 
//                                     type="tel" 
//                                     className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                                     placeholder="+880"
//                                     required
//                                     name="phone"

//                                 />
//                             </div>
//                         </div>

//                         {/* Proceed to Pay Button */}
//                         <div className="mt-8">
//                             <button className="btn btn-primary w-full gap-2">
//                                     Proceed to Pay (${totalPrice.toFixed(2)})
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
//                                     </svg>
//                             </button>
//                         </div>
//                     </form>
//             </div>
//         </div>
//     );
// };

// export default Cart;
