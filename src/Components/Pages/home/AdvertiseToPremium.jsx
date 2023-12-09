import { Link } from "react-router-dom";


const AdvertiseToPremium = () => {
    return (
        <div className="max-w-3xl mx-auto border-2 rounded-xl p-12 mb-12 flex flex-col items-center gap-6">
            <h1 className="text-4xl font-semibold text-center">NOT PREMIUM MEMBERSHIP YET ?</h1>
            <p>It's only tk 500 to make premium membership</p>
            <Link to={'/dashboard/checkout'} className="btn hover:animate-bounce bg-pink-500 text-white hover:text-black">GO TO CHECKOUT PAGE</Link>
        </div>
    );
};

export default AdvertiseToPremium;