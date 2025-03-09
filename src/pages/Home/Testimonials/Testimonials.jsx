//main
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import { useEffect, useState } from "react";
// import { Rating } from "@smastrom/react-rating";
// import '@smastrom/react-rating/style.css'


// const Testimonials = () => {
//     const [reviews, setReviews] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:5000/reviews')
//             .then(res => res.json())
//             .then(data => setReviews(data))
//     }, [])

//     return (
//         <section className="my-20">
//             <SectionTitle
//                 subHeading="What Our Client Say"
//                 heading={'Testimonials'}
//             ></SectionTitle>

//             <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

//                 {
//                     reviews.map(review => <SwiperSlide
//                         key={review._id}
//                     >
//                         <div className="flex flex-col items-center mx-24 my-16">
//                             <Rating
//                                 style={{ maxWidth: 180 }}
//                                 value={review.rating}
//                                 readOnly
//                             />
//                             <p className="py-8">{review.details}</p>
//                             <h3 className="text-2xl text-orange-400">{review.name}</h3>
//                         </div>
//                     </SwiperSlide>)
//                 }
//             </Swiper>
//         </section>
//     );
// };

// export default Testimonials;




// import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, EffectFade } from "swiper";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-fade";
// import { useEffect, useState } from "react";
// import { Rating } from "@smastrom/react-rating";
// import '@smastrom/react-rating/style.css'

// const Testimonials = () => {
//     const [reviews, setReviews] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:5000/reviews')
//             .then(res => res.json())
//             .then(data => setReviews(data))
//     }, [])

//     return (
//         <section className="my-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 px-6">
//             <SectionTitle
//                 subHeading="What Our Clients Say"
//                 heading="Testimonials"
//             />

//             <Swiper 
//                 navigation={true} 
//                 autoplay={{ delay: 5000, disableOnInteraction: false }} 
//                 effect="fade"
//                 modules={[Navigation, Autoplay, EffectFade]} 
//                 className="mySwiper"
//             >
//                 {reviews.map((review) => (
//                     <SwiperSlide key={review._id}>
//                         <div className="flex flex-col items-center text-center max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8 transition-transform transform hover:scale-105">
//                             {/* Rating */}
//                             <Rating 
//                                 style={{ maxWidth: 160 }} 
//                                 value={review.rating} 
//                                 readOnly 
//                             />

//                             {/* Review Content */}
//                             <p className="py-6 text-gray-600 text-lg italic leading-relaxed">
//                                 "{review.details}"
//                             </p>

//                             {/* Reviewer Name */}
//                             <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </section>
//     );
// };

// export default Testimonials;




import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        // <section className="my-20 py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-yellow-900 text-white">
        <section className="my-20 py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-yellow-900 text-white rounded-3xl shadow-lg mx-4 sm:mx-8 lg:mx-0 max-w-7xl lg:w-full shadow-yellow-500/30">


            <SectionTitle
                subHeading="What Our Clients Say"
                heading={'Testimonials'}
            />

            <div className="max-w-7xl mx-auto px-4">
                <Swiper 
                    navigation={true} 
                    modules={[Navigation, Autoplay]} 
                    className="testimonialSwiper"
                    autoplay={{ delay: 5000 }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    spaceBetween={30}
                >
                    {reviews.map(review => (
                        <SwiperSlide key={review._id}>
                            <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full mx-4 my-8">
                                {/* Decorative Quotes */}
                                <FaQuoteLeft className="text-4xl text-orange-400/30 mb-4" />
                                <FaQuoteRight className="text-4xl text-orange-400/30 mt-4 ml-auto" />
                                
                                {/* Rating */}
                                <div className="flex justify-center mb-6">
                                    <Rating
                                        style={{ maxWidth: 120 }}
                                        value={review.rating}
                                        readOnly
                                        className="text-orange-400"
                                    />
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-600 text-lg leading-relaxed text-center mb-8 line-clamp-4">
                                    {review.details}
                                </p>

                                {/* Reviewer Info */}
                                <div className="text-center mt-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {review.name}
                                    </h3>
                                    <span className="text-gray-500 text-sm">
                                        Satisfied Customer
                                    </span>
                                </div>

                                {/* Decorative Border */}
                                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-b-2xl" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Swiper Styles */}
            <style jsx global>{`
                .testimonialSwiper .swiper-button-next,
                .testimonialSwiper .swiper-button-prev {
                    color: #f97316;
                    background: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                }

                .testimonialSwiper .swiper-button-next:hover,
                .testimonialSwiper .swiper-button-prev:hover {
                    color: white;
                    background: #f97316;
                    transform: scale(1.1);
                }

                .testimonialSwiper .swiper-button-next::after,
                .testimonialSwiper .swiper-button-prev::after {
                    font-size: 1.2rem;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;

