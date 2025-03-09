// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";


// const useAdmin = () => {
//     const { user, loading } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const { data: isAdmin, isPending: isAdminLoading } = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
//         enabled: !loading,
//         queryFn: async () => {
//             console.log('asking or checking is admin', user)
//             const res = await axiosSecure.get(`/users/admin/${user.email}`);
//             // console.log(res.data);
//             return res.data?.admin;
//         }
//     })
//     return [isAdmin, isAdminLoading]
// };

// export default useAdmin;



import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email && !loading, // Ensure query runs only when user email exists
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        }
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;
/* 🚀 How It Works Step by Step
1. Initially, loading is true (user authentication is still in progress).

2. Because of enabled: !loading, the query does not run while authentication is still loading. The enabled option controls when the query should run.
If enabled: !loading was not used:
The query would try to run immediately, even before user.email is available.
This could result in an undefined or invalid request.

3. Once loading becomes false (meaning the authentication process is done and we have user.email):
The query runs automatically.
It makes a request to: axiosSecure.get(`/users/admin/${user.email}`)
While the request is being made, isPending (or isAdminLoading) is true.
Once the request is completed: If successful, isAdmin gets the response data (true or false). isPending (or isAdminLoading) becomes false.

4. Lastly, isAdmin NavBar.jsx a pathay disi.
*/