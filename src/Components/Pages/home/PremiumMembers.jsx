import Lottie from "lottie-react";
import usePremiumMembers from "../../Hooks/usePremiumMembers";
import animationLoading from "../../../Animations/Animation - Loading.json"
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import InfiniteScroll from "react-infinite-scroll-component";

const PremiumMembers = () => {
    const { premiums, isLoading } = usePremiumMembers()
    console.log(premiums)
    if (isLoading) {
        return <div className="max-w-xs mx-auto"><Lottie animationData={animationLoading} /></div>
    }

    return (
        <div className="my-8 max-w-4xl mx-auto">
            <h1 className="text-4xl text-center ">Our Premium Members</h1>
            <InfiniteScroll dataLength={premiums.length} next={premiums} height={500} className="my-4 p-2 border-2 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-8 p-4">
                    {
                        premiums.map(member => <>
                            <div className="p-5 border-dashed border-2 shadow-xl rounded-xl flex flex-col ">
                                <img src={member.profile_pic} alt="" className="w-32 h-32 rounded-full mx-auto" />
                                <div className="text-xs flex flex-col items-start my-4 gap-y-2 flex-grow">
                                    <p><span className="font-semibold">Name :</span> {member.name}</p>
                                    <p><span className="font-semibold">Gender : </span>{member.gender} </p>
                                    <p><span className="font-semibold">Proffession : </span>{member.occupation} </p>
                                    <p><span className="font-semibold">Age : </span>{member.age} </p>
                                    <p className="flex items-center gap-1"><FaLocationDot /> Lives in <span className="font-semibold">{member.division}</span></p>

                                </div>
                                <div className="flex justify-center">
                                    <Link to={`/biodata/${member._id}`} className="btn bg-[#FE5D63] w-full text-white hover:text-black">View Profile</Link>
                                </div>
                            </div>
                        </>)
                    }
                </div>
            </InfiniteScroll>
            <Link to={'/biodata'} className="flex justify-center">
                <button className="btn btn-wide bg-green-800 text-white hover:text-black">Show More</button>
            </Link>
        </div>
    );
};

export default PremiumMembers;