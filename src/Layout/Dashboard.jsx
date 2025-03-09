import { useState } from "react";
import { FaBars, FaTimes, FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils, FaCookieBite, FaWineGlassAlt, FaTable, FaHistory } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <Helmet>
            <title>AuraBite | Dashboard</title>
        </Helmet>
        <div className="flex h-screen bg-amber-50">
            
            {/* Sidebar Toggle Button */}
            <button
                className="absolute top-4 left-4 z-50 md:hidden text-amber-900 bg-amber-100 p-3 rounded-full shadow-lg hover:bg-amber-200 transition-all"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed md:relative z-40 md:z-auto h-screen w-72 bg-amber-800 text-amber-50 shadow-xl transition-transform duration-300 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* Decorative Food Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>

                {/* Dashboard Header */}
                <div className="flex items-center justify-center py-6 relative z-10 border-b border-amber-700">
                    <div className="text-center">
                        <FaUtensils className="text-3xl mb-2 text-amber-400 mx-auto" />
                        <h1 className="text-2xl font-bold font-serif">AuraBite</h1>
                        {/* <p className="text-sm text-amber-300">Admin Dashboard</p> */}
                    </div>
                </div>

                {/* Navigation Links */}
                <ul className="space-y-2 p-4 relative z-10">
                    {isAdmin ? (
                        <>
                            <SidebarLink to="/dashboard/adminHome" icon={FaHome} text="Admin Home" />
                            <SidebarLink to="/dashboard/addItems" icon={FaCookieBite} text="Add Menu Items" />
                            <SidebarLink to="/dashboard/manageItems" icon={FaList} text="Manage Menu" />
                            <SidebarLink to="/dashboard/bookings" icon={FaCalendar} text="Reservations" />
                            <SidebarLink to="/dashboard/users" icon={FaUsers} text="Users" />
                        </>
                    ) : (
                        <>
                            <SidebarLink to="/dashboard/userHome" icon={FaHome} text="My Profile" />
                            {/* <SidebarLink to="/dashboard/history" icon={FaWineGlassAlt} text="Order History" /> */}
                            <SidebarLink to="/dashboard/cart" icon={FaShoppingCart} text={`My Cart (${cart.length})`} />
                            <SidebarLink to="/dashboard/AddReview" icon={FaAd} text="Write Review" />
                            <SidebarLink to="/dashboard/reservation" icon={FaTable} text="Make a Reservation" />
                            <SidebarLink to="/dashboard/reservationHistory" icon={FaHistory} text="Reservation History" />
                            <SidebarLink to="/dashboard/paymentHistory" icon={FaList} text="Payment History" />
                        </>
                    )}

                    {/* Decorative Divider */}
                    <div className="my-6 flex items-center justify-center">
                        <div className="h-px bg-amber-700 w-3/4"></div>
                    </div>

                    {/* Shared Links */}
                    <SidebarLink to="/" icon={FaHome} text="Homepage" />
                    <SidebarLink to="/order/salad" icon={FaSearch} text="Browse Menu" />
                    <SidebarLink to="/dashboard/Contact" icon={FaEnvelope} text="Contact" />
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 overflow-auto bg-white">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
        </>
        
    );
};

// Updated Sidebar Link Component
const SidebarLink = ({ to, icon: Icon, text }) => (
    <li>
        <NavLink
            to={to}
            className={({ isActive }) => 
                `flex items-center space-x-3 p-3 rounded-xl transition-all duration-300
                ${isActive ? 
                    'bg-amber-100 text-amber-900 font-bold border-l-4 border-amber-500' : 
                    'hover:bg-amber-700/50 hover:text-amber-100'}`
            }
        >
            <Icon className="text-xl min-w-[24px] text-amber-500" />
            <span className="font-medium">{text}</span>
        </NavLink>
    </li>
);

export default Dashboard;




//main
// import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
// import { NavLink, Outlet } from "react-router-dom";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";

// const Dashboard = () => {
//     const [cart] = useCart();
//     const [isAdmin] = useAdmin();

//     return (
//         <div className="flex h-screen">
//             {/* Dashboard sidebar with dark theme and animated background */}
//             <div className="w-64 bg-gray-900 text-white shadow-lg relative">
//                 {/* Animated background */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 animate-pulse opacity-30"></div>

//                 <div className="flex items-center justify-center py-6 relative z-10">
//                     <h1 className="text-2xl font-bold">Dashboard</h1>
//                 </div>
                
//                 <ul className="space-y-4 p-4 relative z-10">
//                     {
//                         isAdmin ? <>
//                             <li>
//                                 <NavLink
//                                     to="/dashboard/adminHome"
//                                     className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                                 >
//                                     <FaHome />
//                                     <span>Admin Home</span>
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink
//                                     to="/dashboard/addItems"
//                                     className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                                 >
//                                     <FaUtensils />
//                                     <span>Add Items</span>
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink
//                                     to="/dashboard/manageItems"
//                                     className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                                 >
//                                     <FaList />
//                                     <span>Manage Items</span>
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink
//                                     to="/dashboard/bookings"
//                                     className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                                 >
//                                     <FaBook />
//                                     <span>Manage Bookings</span>
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink
//                                     to="/dashboard/users"
//                                     className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                                 >
//                                     <FaUsers />
//                                     <span>All Users</span>
//                                 </NavLink>
//                             </li>
//                         </>
//                             :
//                             <>
//                                 <li>
//                                     <NavLink
//                                         to="/dashboard/userHome"
//                                         className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                                     >
//                                         <FaHome />
//                                         <span>User Home</span>
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         to="/dashboard/history"
//                                         className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                                     >
//                                         <FaCalendar />
//                                         <span>Not History</span>
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         to="/dashboard/cart"
//                                         className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                                     >
//                                         <FaShoppingCart />
//                                         <span>My Cart ({cart.length})</span>
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         to="/dashboard/AddReview"
//                                         className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                                     >
//                                         <FaAd />
//                                         <span>Add a Review</span>
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         to="/dashboard/paymentHistory"
//                                         className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                                     >
//                                         <FaList />
//                                         <span>Real Payment History</span>
//                                     </NavLink>
//                                 </li>
//                             </>
//                     }
//                     {/* Shared nav links */}
//                     <div className="divider my-4 border-t border-white"></div>
//                     <li>
//                         <NavLink
//                             to="/"
//                             className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                         >
//                             <FaHome />
//                             <span>Home</span>
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink
//                             to="/order/salad"
//                             className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                         >
//                             <FaSearch />
//                             <span>Menu</span>
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink
//                             to="/dashboard/Contact"
//                             className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
//                         >
//                             <FaEnvelope />
//                             <span>Contact</span>
//                         </NavLink>
//                     </li>
//                 </ul>
//             </div>
//             {/* Dashboard content */}
//             <div className="flex-1 p-8 overflow-auto bg-gray-800">
//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;




