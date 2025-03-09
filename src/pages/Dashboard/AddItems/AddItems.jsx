import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils, FaCamera } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


// const image_hosting_key = '7a59725ec6ffaa2781fa8b640a403358';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

        const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] } //file upload diye browser er console e amra array er vitor img er data dekhte pai. tai img[0]
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {//imgBB te upload success hoile response dey {data:{},success:true,status:200}
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url//from imgBB response
            }
            // 
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data)
            if(menuRes.data._id){
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log( 'with image url', res.data);
    };

    return (
        <div className="px-4 py-8 max-w-4xl mx-auto">
            <SectionTitle 
                heading="Add New Menu Item" 
                subHeading="Craft Your Culinary Masterpiece"
                icon={<FaUtensils className="text-amber-600" />}
            />

            <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-50">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Recipe Name */}
                    <div className="form-group">
                        <label className="block text-amber-900 font-medium mb-2">
                            Dish Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter dish name"
                            {...register('name', { required: true })}
                            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>

                    {/* Category & Price Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category Select */}
                        <div className="form-group">
                            <label className="block text-amber-900 font-medium mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register('category', { required: true })}
                                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="salad">Salads</option>
                                <option value="pizza">Pizzas</option>
                                <option value="soup">Soups</option>
                                <option value="dessert">Desserts</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* Price Input */}
                        <div className="form-group">
                            <label className="block text-amber-900 font-medium mb-2">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="00.00"
                                    {...register('price', { required: true })}
                                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Recipe Details */}
                    <div className="form-group">
                        <label className="block text-amber-900 font-medium mb-2">
                            Recipe Description
                        </label>
                        <textarea
                            {...register('recipe')}
                            rows="4"
                            placeholder="Describe your culinary creation..."
                            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="form-group">
                        <label className="block text-amber-900 font-medium mb-2">
                            Dish Photography <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-amber-300 border-dashed rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FaCamera className="text-amber-500 text-3xl mb-3" />
                                    <p className="text-sm text-amber-700">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-amber-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                                </div>
                                <input 
                                    {...register('image', { required: true })} 
                                    type="file" 
                                    className="hidden" 
                                />
                            </label>
                        </div>
                    </div>
 
                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2"
                    >
                        <FaUtensils className="text-xl" />
                        Add to Menu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;

