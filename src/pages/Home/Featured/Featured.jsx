//main
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';

const Featured = () => {
    return (
        <div className="relative bg-fixed bg-cover bg-center my-20 py-16" 
             style={{ backgroundImage: `url(${featuredImg})` }}>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle 
                    subHeading="Check It Out" 
                    heading="Featured Item"
                    textColor="text-white"
                    subTextColor="text-white"
                />

                <div className="grid md:grid-cols-2 gap-10 items-center mt-12">
                    {/* Image Section */}
                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                        <img 
                            src={featuredImg} 
                            alt="Featured Dish" 
                            className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="text-white space-y-6">
                        <div className="flex items-center gap-4 text-orange-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="font-semibold">August 20, 2024</p>
                        </div>

                        <h2 className="text-4xl font-bold tracking-tight">
                            Where Can I Get Some?
                        </h2>

                        <p className="text-lg leading-relaxed text-gray-200">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate expedita hic dolorem, iusto vel suscipit nam excepturi debitis magnam nostrum! Ut eum dignissimos culpa doloremque eligendi consectetur blanditiis laboriosam fugiat ea quia similique quam nisi reprehenderit numquam magnam nemo vitae cupiditate, atque maiores dicta minus pariatur.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;









