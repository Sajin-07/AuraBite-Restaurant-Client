import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers, FaUserCheck, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
            if(res.data._id){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is now an Admin!`,
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#fff7ed",
                    customClass: {
                        title: 'text-amber-900 font-serif'
                    }
                });
            }
        });
    };

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Remove Guest?",
            text: "This will permanently delete the user account!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#b45309",
            cancelButtonColor: "#78350f",
            confirmButtonText: "Confirm Removal",
            background: "#fff7ed",
            customClass: {
                title: 'text-amber-900 font-serif',
                confirmButton: 'bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-lg',
                cancelButton: 'bg-stone-700 hover:bg-stone-800 px-4 py-2 rounded-lg'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                .then(res => {
                    if (res.data.deletedCount) {
                        refetch();
                        Swal.fire({
                            title: "Account Removed",
                            text: "User has been deleted successfully",
                            icon: "success",
                            background: "#fff7ed"
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="px-4 py-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-amber-50 p-4 md:p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-900 mb-3 md:mb-0 text-center md:text-left">
                <FaUserShield className="inline-block mr-2 text-amber-600" />
                Manage Users
            </h2>
            <div className="bg-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-inner">
                <span className="text-base md:text-lg font-medium text-amber-800">
                    Total Users: {users.length}
                </span>
            </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-50 overflow-x-auto">
            <table className="w-full min-w-[600px]">
                <thead className="bg-amber-900 text-amber-50">
                    <tr>
                        <th className="py-3 px-4 md:py-4 md:px-6 text-left font-serif">#</th>
                        <th className="py-3 px-4 md:py-4 md:px-6 text-left font-serif">Name</th>
                        <th className="py-3 px-4 md:py-4 md:px-6 text-left font-serif">Email</th>
                        <th className="py-3 px-4 md:py-4 md:px-6 text-center font-serif">Privileges</th>
                        <th className="py-3 px-4 md:py-4 md:px-6 text-center font-serif">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                    {users.map((user, index) => (
                        <tr key={user._id} className="hover:bg-amber-50 transition-colors">
                            <td className="py-3 px-4 md:py-4 md:px-6 font-medium text-amber-900">{index + 1}</td>
                            <td className="py-3 px-4 md:py-4 md:px-6">{user.name}</td>
                            <td className="py-3 px-4 md:py-4 md:px-6 text-amber-700 text-sm md:text-base">{user.email}</td>
                            <td className="py-3 px-4 md:py-4 md:px-6 text-center">
                                {user.role === 'admin' ? (
                                    <span className="inline-flex items-center px-2 py-1 md:px-3 md:py-1 rounded-full bg-amber-100 text-amber-700 text-sm md:text-base">
                                        <FaUserCheck className="mr-1 md:mr-2" />
                                        <span className="hidden md:inline">Administrator</span>
                                        <span className="md:hidden">Admin</span>
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="inline-flex items-center px-2 py-1 md:px-4 md:py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-colors text-sm md:text-base"
                                    >
                                        <FaUsers className="mr-1 md:mr-2" />
                                        <span className="hidden md:inline">Grant Admin</span>
                                        <span className="md:hidden">Make Admin</span>
                                    </button>
                                )}
                            </td>
                            <td className="py-3 px-4 md:py-4 md:px-6 text-center">
                                <button
                                    onClick={() => handleDeleteUser(user)}
                                    className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-600 hover:text-red-700"
                                >
                                    <FaTrashAlt className="text-lg md:text-xl" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
            <div className="text-center py-8 md:py-12">
                <p className="text-amber-700 text-base md:text-lg">No registered users found</p>
            </div>
        )}
    </div>
    );
};

export default AllUsers;

//main
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaTrashAlt, FaUsers } from "react-icons/fa";
// import Swal from "sweetalert2";


// const AllUsers = () => {
//     const axiosSecure = useAxiosSecure();
//     const { data: users = [], refetch } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/users');
//             return res.data;
//         }
//     })

//     const handleMakeAdmin = user =>{
//         axiosSecure.patch(`/users/admin/${user._id}`)
//         .then(res =>{
//             console.log(res.data)
//             // if(res.data.modifiedCount > 0){
//             if(res.data._id){
//                 refetch();
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: `${user.name} is an Admin Now!`,
//                     showConfirmButton: false,
//                     timer: 1500
//                   });
//             }
//         })
//     }

//     const handleDeleteUser = user => {
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

//                 axiosSecure.delete(`/users/${user._id}`)
//                     .then(res => {
//                         if (res.data.deletedCount) {
//                             refetch();
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "Your file has been deleted.",
//                                 icon: "success"
//                             });
//                         }
//                     })
//             }
//         });
//     }

//     return (
//         <div>
//             <div className="flex justify-evenly my-4">
//                 <h2 className="text-3xl">All Users</h2>
//                 <h2 className="text-3xl">Total Users: {users.length}</h2>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             users.map((user, index) => <tr key={user._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>
//                                     { user.role === 'admin' ? 'Admin' : <button
//                                         onClick={() => handleMakeAdmin(user)}
//                                         className="btn btn-lg bg-orange-500">
//                                         <FaUsers className="text-white 
//                                         text-2xl"></FaUsers>
//                                     </button>}
//                                 </td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleDeleteUser(user)}
//                                         className="btn btn-ghost btn-lg">
//                                         <FaTrashAlt className="text-red-600"></FaTrashAlt>
//                                     </button>
//                                 </td>
//                             </tr>)
//                         }

//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AllUsers;