import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import slide1 from '../../../assets/home/slide1.jpg';
import slide2 from '../../../assets/home/slide2.jpg';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
// import slide5 from '../../../assets/home/slide5.jpg';
import slide6 from '../../../assets/home/slide6.jpg';
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const Category = () => {
    return (
        <section className="py-3">
            <SectionTitle 
                subHeading={"From 11.00am to 10.00pm"}
                heading={"Order Online"}
            />
            
            <div className="max-w-7xl mx-auto px-4">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="categorySwiper"
                >
                    {[slide1, slide2, slide3, slide4, slide6].map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="relative h-96">
                                    <img 
                                        src={slide} 
                                        alt={`Category ${index + 1}`} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                    <h3 className="text-3xl font-bold text-white mb-4 transform -translate-y-2 group-hover:-translate-y-4 transition-all duration-300">
                                        {['Salads', 'Pizzas', 'Soups', 'Desserts', 'Drinks'][index]}
                                    </h3>
                                    <Link to='menu'>
                                        <button className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 border border-white/10">
                                            Order Now
                                        </button>
                                    </Link>
                                </div>
                                
                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium">
                                    -20% Off
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
                .categorySwiper {
                    padding: 30px 0 60px;
                }
                .categorySwiper .swiper-pagination-bullet {
                    background: #d1a570;
                    opacity: 0.5;
                    width: 12px;
                    height: 12px;
                    transition: all 0.3s;
                }
                .categorySwiper .swiper-pagination-bullet-active {
                    background: #b58556;
                    opacity: 1;
                    transform: scale(1.3);
                }
            `}</style>
        </section>
    );
};
export default Category;