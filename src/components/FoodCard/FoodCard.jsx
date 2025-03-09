import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (user?.emailVerified) {
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price, // Store base price
                quantity,
            };

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} (${res.data.quantity}x) in cart`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                });
        } else {
            Swal.fire({
                title: "Login Required",
                text: "Please login to add items to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Login",
                cancelButtonText: "Cancel"
            }).then((result) => {
                result.isConfirmed && navigate('/login', { state: { from: location} });
            });
        }
    };

    return (

        <div className="max-w-sm w-full mt-7 mb-8 mx-auto bg-gray-900 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
            <figure className="relative w-full h-56 overflow-hidden">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover aspect-[4/3] object-center"
                />
                <p className="absolute top-4 right-4 px-4 py-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg rounded-md shadow-lg">
                    ${price}
                </p>
            </figure>

          
            {/* Card Body */}
            <div className="card-body text-white text-center p-5">
                <h2 className="text-xl font-bold tracking-wide">{name}</h2>
                <p className="text-gray-300 mt-2">{recipe}</p>

                {/* Quantity Selector */}
                <div className="flex items-center justify-center gap-4 mt-3">
                    <button 
                        className="w-9 h-9 flex items-center justify-center text-xl font-bold bg-gray-700 hover:bg-orange-500 text-white rounded-full transition"
                        onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                    >-</button>
                    <span className="text-lg font-semibold">{quantity}</span>
                    <button 
                        className="w-9 h-9 flex items-center justify-center text-xl font-bold bg-gray-700 hover:bg-orange-500 text-white rounded-full transition"
                        onClick={() => setQuantity(prev => prev + 1)}
                    >+</button>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-500 text-white font-semibold py-2 mt-4 rounded-md shadow-md hover:from-orange-700 hover:to-red-600 transition duration-300"
                >
                    Add to Cart 🛒
                </button>
            </div>
        </div>
       

    );
};

export default FoodCard;