import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { _id, name, recipe, image, category, price } = useLoaderData();
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [previewImage, setPreviewImage] = useState(image);

    const onSubmit = async (data) => {
        let imageUrl = image;

        if (data.image[0]) {
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });
            if (res.data.success) {
                imageUrl = res.data.data.display_url;
            }
        }

        const updatedItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: imageUrl
        };

        const menuRes = await axiosSecure.patch(`/menu/${_id}`, updatedItem);

        if (menuRes.data._id) {
            await axiosSecure.patch(`/carts/update-item/${_id}`, updatedItem);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} updated successfully!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-6 bg-white rounded-lg shadow-lg">
            <SectionTitle heading="Update Menu Item" subHeading="Modify & Improve" />
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Image Preview */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                    <img
                        src={previewImage}
                        alt="Dish Preview"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                    <input
                        {...register('image')}
                        type="file"
                        className="mt-3 file-input file-input-bordered w-full"
                        onChange={(e) => {
                            if (e.target.files[0]) {
                                setPreviewImage(URL.createObjectURL(e.target.files[0]));
                            }
                        }}
                    />
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-2/3">
                    {/* Recipe Name */}
                    <div className="form-control mb-4">
                        <label className="label font-semibold text-gray-700">Recipe Name*</label>
                        <input
                            type="text"
                            defaultValue={name}
                            {...register('name', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Category & Price */}
                    <div className="flex gap-4">
                        <div className="form-control w-1/2">
                            <label className="label font-semibold text-gray-700">Category*</label>
                            <select
                                defaultValue={category}
                                {...register('category', { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option disabled>Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        <div className="form-control w-1/2">
                            <label className="label font-semibold text-gray-700">Price*</label>
                            <input
                                type="number"
                                defaultValue={price}
                                {...register('price', { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Recipe Details */}
                    <div className="form-control my-4">
                        <label className="label font-semibold text-gray-700">Recipe Details</label>
                        <textarea
                            defaultValue={recipe}
                            {...register('recipe')}
                            className="textarea textarea-bordered w-full h-28"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button className="w-full py-3 mt-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-lg transition">
                        Update Menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;


//maiin
// import { useLoaderData } from "react-router-dom";
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const image_hosting_key = '7a59725ec6ffaa2781fa8b640a403358';
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const UpdateItem = () => {
//     const { _id, name, recipe, image, category, price } = useLoaderData();

//     const { register, handleSubmit } = useForm();
//     const axiosPublic = useAxiosPublic();
//     const axiosSecure = useAxiosSecure();

//     const onSubmit = async (data) => {
//         let imageUrl = image; // Start with existing image
    
//         // Only upload new image if provided
//         if (data.image[0]) {
//             const imageFile = { image: data.image[0] };
//             const res = await axiosPublic.post(image_hosting_api, imageFile, {
//                 headers: { 'content-type': 'multipart/form-data' }
//             });
//             if (res.data.success) {
//                 imageUrl = res.data.data.display_url;
//             }
//         }
    
//         const updatedItem = {
//             name: data.name,
//             category: data.category,
//             price: parseFloat(data.price),
//             recipe: data.recipe,
//             image: imageUrl
//         };
    
//         // Update menu item
//         const menuRes = await axiosSecure.patch(`/menu/${_id}`, updatedItem);
        
//         if (menuRes.data._id) {
//             // Update all cart items that contain this item
//             const res2 = await axiosSecure.patch(`/carts/update-item/${_id}`, updatedItem);
//             console.log(res2.data);
//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: `${data.name} updated successfully`,
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         }
//     };
    
    
    
//     return (
//         <div>
//             <SectionTitle heading="Update an Item" subHeading="Refresh info"></SectionTitle>
//             <div>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="form-control w-full my-6">
//                         <label className="label">
//                             <span className="label-text">Recipe Name*</span>
//                         </label>
//                         <input
//                             type="text"
//                             defaultValue={name}
//                             placeholder="Recipe Name"
//                             {...register('name', { required: true })}
//                             required
//                             className="input input-bordered w-full" />
//                     </div>
//                     <div className="flex gap-6">
//                         {/* category */}
//                         <div className="form-control w-full my-6">
//                             <label className="label">
//                                 <span className="label-text">Category*</span>
//                             </label>
//                             <select defaultValue={category} {...register('category', { required: true })}
//                                 className="select select-bordered w-full">
//                                 <option disabled value="default">Select a category</option>
//                                 <option value="salad">Salad</option>
//                                 <option value="pizza">Pizza</option>
//                                 <option value="soup">Soup</option>
//                                 <option value="dessert">Dessert</option>
//                                 <option value="drinks">Drinks</option>
//                             </select>
//                         </div>

//                         {/* price */}
//                         <div className="form-control w-full my-6">
//                             <label className="label">
//                                 <span className="label-text">Price*</span>
//                             </label>
//                             <input
//                                 type="number"
//                                 defaultValue={price}
//                                 placeholder="Price"
//                                 {...register('price', { required: true })}
//                                 className="input input-bordered w-full" />
//                         </div>

//                     </div>
//                     {/* recipe details */}
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Recipe Details</span>
//                         </label>
//                         <textarea defaultValue={recipe} {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
//                     </div>

//                     <div className="form-control w-full my-6">
//                         <input {...register('image')} type="file" className="file-input w-full max-w-xs" />
//                     </div>

//                     <button className="btn">
//                         Update menu Item
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateItem;


