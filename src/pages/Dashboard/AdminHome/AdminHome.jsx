
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaUsers, FaUtensils } from 'react-icons/fa';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, Tooltip } from 'recharts';
import img1 from  "../../../assets/home/slide6.jpg"
const colors = ['#F97316', '#EAB308', '#34D399', '#3B82F6', '#A855F7', '#EC4899'];
const COLORS = ['#F97316', '#EAB308', '#34D399', '#3B82F6', '#A855F7', '#EC4899'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    });

    const pieChartData = chartData.map(data => ({
        name: data.category,
        value: data.revenue
    }));

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-semibold text-gray-800">
                Welcome, <span className="text-amber-600">{user?.displayName || 'Back'}</span> 👋
            </h2>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div className="bg-amber-600 text-white p-6 rounded-lg shadow-md flex items-center gap-4">
                    <FaDollarSign className="text-4xl" />
                    <div>
                        <p className="text-lg">Revenue</p>
                        <p className="text-2xl font-bold">${stats.revenue}</p>
                    </div>
                </div>

                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center gap-4">
                    <FaUsers className="text-4xl" />
                    <div>
                        <p className="text-lg">Users</p>
                        <p className="text-2xl font-bold">{stats.users}</p>
                    </div>
                </div>

                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center gap-4">
                    <FaBook className="text-4xl" />
                    <div>
                        <p className="text-lg">Menu Items</p>
                        <p className="text-2xl font-bold">{stats.menuItems}</p>
                    </div>
                </div>

                <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex items-center gap-4">
                    <FaUtensils className="text-4xl" />
                    <div>
                        <p className="text-lg">Orders</p>
                        <p className="text-2xl font-bold">{stats.orders}</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                {/* Bar Chart */}
                <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Order Statistics</h3>
                    <BarChart width={500} height={300} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantity" fill="#FF5733">
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                {/* Pie Chart */}
                <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Revenue Breakdown</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </div>
            </div>

            {/* Additional Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                {/* Top Selling Item */}
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Top Selling Item</h3>
                    <div className="flex items-center gap-4">
                        <img src={img1} alt="Top Item" className="w-20 h-20 object-cover rounded-md" />
                        <div>
                            <p className="text-lg font-bold">Coffee</p>
                            <p className="text-sm text-gray-500">Sold: 120 Orders</p>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
                    <ul className="space-y-2">
                        <li className="flex justify-between text-gray-700">
                            <span>Order #12345</span>
                            <span className="text-green-600 font-semibold">Completed</span>
                        </li>
                        <li className="flex justify-between text-gray-700">
                            <span>Order #12346</span>
                            <span className="text-yellow-600 font-semibold">Pending</span>
                        </li>
                        <li className="flex justify-between text-gray-700">
                            <span>Order #12347</span>
                            <span className="text-red-600 font-semibold">Cancelled</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;



//main
// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../../hooks/useAuth'
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';

// const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const AdminHome = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: stats = {} } = useQuery({
//         queryKey: ['admin-stats'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/admin-stats');
//             return res.data;
//         }
//     });

//     const { data: chartData = [] } = useQuery({
//         queryKey: ['order-stats'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/order-stats');
//             return res.data;
//         }
//     })

//     // custom shape for the bar chart
//     const getPath = (x, y, width, height) => {
//         return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
//         ${x + width / 2}, ${y}
//         C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
//         Z`;
//     };

//     const TriangleBar = (props) => {
//         const { fill, x, y, width, height } = props;

//         return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
//     };

//     // custom shape for the pie chart
//     const RADIAN = Math.PI / 180;
//     const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
//         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//         const x = cx + radius * Math.cos(-midAngle * RADIAN);
//         const y = cy + radius * Math.sin(-midAngle * RADIAN);

//         return (
//             <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//                 {`${(percent * 100).toFixed(0)}%`}
//             </text>
//         );
//     };

//     const pieChartData = chartData.map(data => {
//         return {name: data.category, value: data.revenue}
//     })

//     return (
//         <div>
//             <h2 className="text-3xl">
//                 <span>Hi, Welcome </span>
//                 {
//                     user?.displayName ? user.displayName : 'Back'
//                 }
//             </h2>
//             <div className="stats shadow">

//                 <div className="stat">
//                     <div className="stat-figure text-secondary">
//                         <FaDollarSign className='text-3xl'></FaDollarSign>
//                     </div>
//                     <div className="stat-title">Revenue</div>
//                     <div className="stat-value">${stats.revenue}</div>
//                     <div className="stat-desc">Jan 1st - Feb 1st</div>
//                 </div>

//                 <div className="stat">
//                     <div className="stat-figure text-secondary">
//                         <FaUsers className='text-3xl'></FaUsers>
//                     </div>
//                     <div className="stat-title">Users</div>
//                     <div className="stat-value">{stats.users}</div>
//                     <div className="stat-desc">↗︎ 400 (22%)</div>
//                 </div>


//                 <div className="stat">
//                     <div className="stat-figure text-secondary">
//                         <FaBook className='text-3xl'></FaBook>
//                     </div>
//                     <div className="stat-title">Menu Items</div>
//                     <div className="stat-value">{stats.menuItems}</div>
//                     <div className="stat-desc">↗︎ 400 (22%)</div>
//                 </div>

//                 <div className="stat">
//                     <div className="stat-figure text-secondary">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
//                     </div>
//                     <div className="stat-title">Orders</div>
//                     <div className="stat-value">{stats.orders}</div>
//                     <div className="stat-desc">↘︎ 90 (14%)</div>
//                 </div>

//             </div>
//             <div className="flex">
//                 <div className="w-1/2">
//                     <BarChart
//                         width={500}
//                         height={300}
//                         data={chartData}
//                         margin={{
//                             top: 20,
//                             right: 30,
//                             left: 20,
//                             bottom: 5,
//                         }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="category" />
//                         <YAxis />
//                         <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
//                             {chartData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={colors[index % 6]} />
//                             ))}
//                         </Bar>
//                     </BarChart>
//                 </div>
//                 <div className="w-1/2">
//                     <PieChart width={400} height={400}>
//                         <Pie
//                             data={pieChartData}
//                             cx="50%"
//                             cy="50%"
//                             labelLine={false}
//                             label={renderCustomizedLabel}
//                             outerRadius={80}
//                             fill="#8884d8"
//                             dataKey="value"
//                         >
//                             {pieChartData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                         </Pie>
//                         <Legend></Legend>
//                     </PieChart>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminHome;