import { Parallax } from 'react-parallax';
import { FaUtensils } from 'react-icons/fa';

const Cover = ({ img, title }) => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="restaurant ambiance"
            strength={300}
            bgClassName="object-cover"
        >
            <div className="hero h-[600px] md:h-[700px] relative">
                {/* Gradient overlay for dark mode */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                
                <div className="hero-content text-center relative z-10">
                    <div className="max-w-2xl px-4">
                        {/* Decorative border elements */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-20 bg-amber-400"></div>
                            <FaUtensils className="text-3xl text-amber-400 animate-pulse" />
                            <div className="h-px w-20 bg-amber-400"></div>
                        </div>

                        <h1 className="mb-6 text-4xl md:text-6xl font-bold uppercase font-serif tracking-wider text-amber-50 drop-shadow-xl">
                            {title}
                        </h1>

                        {/* Subtle texture pattern */}
                        <div className="absolute inset-0 opacity-10 bg-repeat" style={{ 
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\' fill=\'%23f59e0b\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' 
                        }}></div>

                        <p className="text-lg md:text-xl text-amber-100 mb-8 font-light max-w-prose mx-auto leading-relaxed">
                            Experience culinary excellence where every dish tells a story
                        </p>

                        {/* Animated CTA Button */}
                        {/* <button className="btn bg-transparent border-2 border-amber-400 text-amber-300 hover:bg-amber-500/20 hover:border-amber-300 hover:text-amber-50 rounded-none px-8 py-3 transform transition-all duration-300 hover:scale-105">
                            Explore Menu
                        </button> */}
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;


//main
// import { Parallax } from 'react-parallax';

// const Cover = ({ img, title }) => {
//     return (
//         <Parallax
//             blur={{ min: -50, max: 50 }}
//             bgImage={img}
//             bgImageAlt="the menu"
//             strength={-200}
//         >
//             <div className="hero h-[700px]">   
//                 <div className="hero-overlay bg-opacity-60"></div>
//                 <div className="hero-content text-center text-neutral-content">
//                     <div className="max-w-md">
//                         <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
//                         <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

//                     </div>
//                 </div>
//             </div>
//         </Parallax>

//     );
// };

// export default Cover;


