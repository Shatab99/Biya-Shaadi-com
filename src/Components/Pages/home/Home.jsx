import { Helmet } from "react-helmet-async";
import Banners from "./Banners";
import PremiumMembers from "./PremiumMembers";
import AdvertiseToPremium from "./AdvertiseToPremium";


const Home = () => {
    return (
        <div className="px-4 lg:px-0">
            <Helmet><title>Home</title></Helmet>
            <Banners/>
            <PremiumMembers/>
            <AdvertiseToPremium/>
        </div>
    );
};

export default Home;