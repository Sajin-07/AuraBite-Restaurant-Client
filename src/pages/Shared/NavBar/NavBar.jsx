
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import {FaTimes,FaUtensils } from 'react-icons/fa';
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import img1 from "../../../assets/home/avattar.jpg";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [cart] = useCart();
    const axiosPublic = useAxiosPublic();
    const [showBanner, setShowBanner] = useState(true); // State to handle banner visibility

    const handleLogOut = async () => {
        try {
            await axiosPublic.post("https://aura-bite-server.vercel.app/clearCookie", user, { withCredentials: true }); 
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><Link to="/order/salad">Order Food</Link></li>
        {user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>}
        {user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>}
        {/* <li>
            <Link to="/dashboard/cart">
                <button className="btn">
                    <FaShoppingCart className="mr-2" />
                    <div className="badge badge-secondary">+{cart.length}</div>
                </button>
            </Link>
        </li> */}
        {user ? (
            <>
                <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
            </>
        ) : (
            <li><Link to="/login">Login</Link></li>
        )}
    </>;

    return (
        <>
            {/* Promo Banner */}
            {showBanner && (
                <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1 flex justify-between items-center">
                    <p className="text-sm mx-auto font-semibold">
                        🍂 Autumn Offer is Here! <a href="#" className="underline hover:no-underline">Order now for exclusive discounts! </a>
                    </p>
                    <button onClick={() => setShowBanner(false)} className="p-2">
                        <FaTimes className="text-white" />
                    </button>
                </div>
            )}

            {/* Navbar with margin to avoid overlap */}
            <div className={`navbar fixed z-40 bg-opacity-50 max-w-screen-xl bg-black text-white transition-all duration-300 ${showBanner ? 'mt-10' : 'mt-0'}`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    {/* <a className="btn btn-ghost normal-case text-xl">AuraBite</a> */}
                    <a
                        className="flex items-center gap-2 text-sm sm:text-lg font-bold text-white bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 px-4 sm:px-6 py-1 sm:py-2 rounded-full shadow-lg border border-white/20"
                        >
                        AuraBite
                    </a>

                 

                
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>

                {/* {user && (
                    <div className="avatar avatar-online navbar-end">
                        <div className="w-24 rounded-full">
                        <img src={img1} />
                        </div>
                    </div>
                )} */}

                <div className="navbar-end invisible">
                    <a className="btn">Get started</a>
                </div>
            </div>
        </>
    );
};

export default NavBar;