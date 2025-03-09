import { useState } from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";
import ReactPaginate from "react-paginate";

const OrderTab = ({ items }) => {
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(0);

    // Calculate total pages
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Get current page items
    const offset = currentPage * itemsPerPage;
    const currentItems = items.slice(offset, offset + itemsPerPage);

    // Handle page change
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div>
            {/* Items Grid */}
            {/* <div className="grid md:grid-cols-3 gap-10"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {currentItems.map((item) => (
                    <FoodCard key={item._id} item={item} />
                ))}
            </div>

            {/* Pagination Controls */}
            {pageCount > 1 && (
                <div className="flex justify-center mt-6 pb-16">
                    <ReactPaginate
                        previousLabel={"← Prev"}
                        nextLabel={"Next →"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination flex gap-3"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"px-3 py-2 border rounded hover:bg-gray-200"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"px-3 py-2 border rounded hover:bg-gray-200"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"px-3 py-2 border rounded hover:bg-gray-200"}
                        activeClassName={"bg-orange-500 text-white"}
                    />
                    
                </div>
            )}
        </div>
    );
};

export default OrderTab;

//main
// import FoodCard from '../../../components/FoodCard/FoodCard';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper";
// import "swiper/css";
// import "swiper/css/pagination";

// const OrderTab = ({ items }) => {
//     const pagination = {
//         clickable: true,
//         renderBullet: function (index, className) {
//             return '<span class="' + className + '">' + (index + 1) + "</span>";
//         },
//     };
//     return (
//         <div >

//             <Swiper
//                 pagination={pagination}
//                 modules={[Pagination]}
//                 className="mySwiper"
//             >
//                 <SwiperSlide>
//                     <div className='grid md:grid-cols-3 gap-10'>
//                         {
//                             items.map(item => <FoodCard
//                                 key={item._id}
//                                 item={item}
//                             ></FoodCard>)
//                         }
//                     </div>

//                 </SwiperSlide>

//             </Swiper>
//         </div>
//     );
// };

// export default OrderTab;