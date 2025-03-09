

// const MenuItem = ({item}) => {
//     const {name, image, price, recipe} = item;
//     return (
//         <div className="flex space-x-2">
//             <img style={{borderRadius: '0 200px 200px 200px'}} className="w-[100px]" src={image} alt="" />
//             <div>
//                 <h3 className="uppercase">{name}----------</h3>
//                 <p>{recipe}</p>
//             </div>
//             <p className="text-yellow-500">${price}</p>
//         </div>
//     );
// };

// export default MenuItem;

const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;

    return (
        // <div className="group relative flex items-center gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100">
        <div className="group relative flex items-center gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100 
mx-4 sm:mx-6 md:mx-8 lg:mx-0">

            {/* Image Container */}
            <div className="relative min-w-[100px]">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-red-500 rounded-full opacity-20 group-hover:opacity-30 transition-all duration-300" />
                <img 
                    className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
                    src={image} 
                    alt={name}
                />
                <div className="absolute bottom-0 right-0 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 100-2 1 1 0 000 2zm-2 1a1 1 0 100 2 1 1 0 000-2zm2 5a1 1 0 100-2 1 1 0 000 2zm-2 1a1 1 0 100 2 1 1 0 000-2zm6-10a1 1 0 10-2 0 1 1 0 002 0zM9 9a1 1 0 000 2h1a1 1 0 100-2H9zm4 2a1 1 0 100-2 1 1 0 000 2zm-4 4a1 1 0 100-2 1 1 0 000 2zm5-3a1 1 0 10-2 0 1 1 0 002 0zm1-5a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xl font-bold font-cursive text-gray-800">{name}</h3>
                    <p className="text-lg font-bold text-amber-600">${price}</p>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{recipe}</p>
                
                {/* Divider */}
                <div className="border-t border-dashed border-gray-200 mb-4" />

                {/* Hover Actions */}
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex items-center space-x-2 text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium">Chef's Pick</span>
                    </div>
                    {/* <button className="flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-sm font-medium transition-colors duration-200">
                        Add to Cart
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                    </button> */}
                </div>
            </div>

            {/* Decorative Leaf */}
            <div className="absolute top-2 right-2 text-amber-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
};

export default MenuItem;