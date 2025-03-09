import { FaEdit, FaTrashAlt, FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    // Group items by category
    const groupedMenu = menu.reduce((acc, item) => {
        const category = item.category.toLowerCase();
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    // Define category display order
    const categoryOrder = ['salad', 'dessert', 'drinks', 'pizza', 'soup', 'main course'];

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Delete Menu Item?",
            text: "This will permanently remove the item from the menu!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#b45309",
            cancelButtonColor: "#78350f",
            confirmButtonText: "Yes, delete it!",
            background: "#fff7ed",
            customClass: {
                title: 'text-amber-900 font-serif',
                confirmButton: 'bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-lg',
                cancelButton: 'bg-stone-700 hover:bg-stone-800 px-4 py-2 rounded-lg'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                if (res.data.deletedCount) {
                    refetch();
                    await axiosSecure.delete(`/carts/remove-item/${item._id}`);
                    if(res.data.deletedCount){
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${item.name} Deleted`,
                            showConfirmButton: false,
                            timer: 1500,
                            background: "#fff7ed"
                        });
                    }
                    
                }
            }
        });
    };

    // Function to format category names
    const formatCategoryName = (category) => {
        return category
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="px-4 py-8">
            <SectionTitle 
                heading="Manage Menu" 
                subHeading="Culinary Masterpieces"
                icon={<FaUtensils className="text-amber-600" />}
            />

            <div className="space-y-12">
                {categoryOrder.map((category) => (
                    groupedMenu[category]?.length > 0 && (
                        <section key={category} className="space-y-6">
                            <h2 className="text-3xl font-serif font-bold text-amber-800 capitalize border-b-2 border-amber-200 pb-2">
                                {formatCategoryName(category)}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {groupedMenu[category].map((item) => (
                                    <div key={item._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <div className="relative h-48 overflow-hidden rounded-t-xl">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            <span className="absolute top-2 right-2 bg-amber-600 text-white px-3 py-1 rounded-full text-sm">
                                                {item.category}
                                            </span>
                                        </div>
                                        
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold text-amber-900 mb-2">{item.name}</h3>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-amber-600">
                                                    ${item.price}
                                                </span>
                                                <div className="flex gap-2">
                                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                                        <button 
                                                            className="p-2 bg-amber-100 hover:bg-amber-200 rounded-full transition-colors duration-200 tooltip" 
                                                            data-tip="Edit Item"
                                                        >
                                                            <FaEdit className="text-amber-700 text-xl" />
                                                        </button>
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDeleteItem(item)}
                                                        className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors duration-200 tooltip" 
                                                        data-tip="Delete Item"
                                                    >
                                                        <FaTrashAlt className="text-red-600 text-xl" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )
                ))}
            </div>
        </div>
    );
};

export default ManageItems;


