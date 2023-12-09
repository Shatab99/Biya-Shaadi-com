
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import banner1 from '../../../assests/1.jpg'
import banner2 from '../../../assests/2.jpg'
import banner3 from '../../../assests/3.jpg'
import banner4 from '../../../assests/4.jpg'
import banner5 from '../../../assests/5.jpg'
import banner6 from '../../../assests/6.jpg'


const Banners = () => {
    return (
        <div className="max-w-sm lg:max-w-full  mx-auto">
            <Carousel className="text-center " autoPlay={true} emulateTouch={true} showStatus={false} stopOnHover={true} infiniteLoop={true}>
                <div>
                    <img src={banner1} />
                    <p className="legend ">Get Started To Find Your Partner</p>
                </div>
                <div>
                    <img src={banner2} />
                    <p className="legend ">Get Started To Find Your Partner</p>
                </div>
                <div>
                    <img src={banner3} />
                    <p className="legend ">Get Started To Find Your Partner</p>
                </div>
                <div>
                    <img src={banner4} />
                    <p className="legend ">Get Started To Find Your Partner</p>
                </div>
                <div>
                    <img src={banner5} />
                    <p className="legend ">Get Started To Find Your Partner</p>
                </div>
                <div>
                    <img src={banner6} />
                    <p className="legend ">Get Started To Find Your Partner</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banners;