import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";


const BiodataCards = ({ members}) => {
    // console.log(search)
    

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {
                members.map(member => <>
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
    );
};

export default BiodataCards;