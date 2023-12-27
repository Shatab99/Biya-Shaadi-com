import Lottie from "lottie-react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import searchAnimation from '../../../Animations/search-animation.json'
import searchingAnimation from '../../../Animations/Animation-searchingPeople.json'


const SearchCards = ({ searchResult, searchLoading }) => {

    return (
        <>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center mb-3">Search Result {searchResult.length}</h3>
                    <div className="grid grid-cols-1 gap-6">
                        {
                            searchLoading ?
                                <div><Lottie animationData={searchingAnimation} /></div>
                                : searchResult.length === 0 ?
                                    <div><Lottie animationData={searchAnimation} /></div>
                                    : searchResult.map(member => <>
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
                </div>
            </dialog>
        </>
    );
};

export default SearchCards;



