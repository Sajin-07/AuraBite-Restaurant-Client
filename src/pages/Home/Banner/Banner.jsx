import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../../assets/home/01.jpg';
import img2 from '../../../assets/home/02.jpg';
import img3 from '../../../assets/home/03.png';
import img4 from '../../../assets/home/04.png';
import img5 from '../../../assets/home/05.png';
import img6 from '../../../assets/home/06.png';
import img7 from '../../../assets/home/07.png';
import img8 from '../../../assets/home/08.png';
import img9 from '../../../assets/home/09.png';
import img10 from '../../../assets/home/10.jpg';
import img11 from '../../../assets/home/11.jpg';


const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src={img4} />
            </div>
            <div>
                <img src={img10} />
            </div>
            <div>
                <img src={img3} />
            </div>
            <div>
                <img src={img5} />
            </div>
            <div>
                <img src={img7} />
            </div>
            <div>
                <img src={img11} />
            </div>
        </Carousel>       
    );
};

export default Banner;


