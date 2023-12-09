import { useLoaderData } from "react-router-dom";
import useBiodataViaFav from "../../Hooks/useBiodataViaFav";


const FullbioDataViaFavourites = () => {

    const{_id, requestEmail}= useLoaderData()
    console.log(_id)
    const {biodataViaFav}= useBiodataViaFav({requestEmail})
    console.log(biodataViaFav)
    return (
        <div className="p-5">
            <h1 className="text-4xl font-semibold mb-4">{biodataViaFav.name} Biodata :</h1>
            <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 bg-[#F8CE78] flex flex-col items-center  gap-5">
                    <img src={biodataViaFav.profile_pic} alt="" className="w-40 h-40 rounded-full mx-auto" />
                    <div className="text-center">
                        <p className="text-4xl font-bold">{biodataViaFav.name}</p>
                        <p>{biodataViaFav.email}</p>
                        <p>{biodataViaFav.phone}</p>
                        <p className="text-lg font-semibold">{biodataViaFav.occupation}</p>
                    </div>
                </div>
                <div className="p-4 bg-[#9A771B]  text-white">
                    <h1 className="text-2xl font-semibold text-center mb-2 ">Details : </h1>
                    <div className="flex flex-col items-start">
                        <p>Father Name : {biodataViaFav.fatherName}</p>
                        <p>Mother Name : {biodataViaFav.motherName}</p>
                        <p>Age : {biodataViaFav.age}</p>
                        <p>Date Of Birth : {biodataViaFav.dob}</p>
                        <p>Gender : {biodataViaFav.gender}</p>
                        <p>Height  : {biodataViaFav.height} cm</p>
                        <p>Weight  : {biodataViaFav.weight} kg</p>
                        <p>Contact Email  : {biodataViaFav.contactEmail}</p>
                        <p>Present Address  : {biodataViaFav.presentDivision} (Division)</p>
                        <p>Permanent Address  : {biodataViaFav.division} (Division)</p>
                        <p>Expected Partner Age  : {biodataViaFav.partnerAge} </p>
                        <p>Expected Partner Height  : {biodataViaFav.partnerHeight} cm</p>

                    </div>
                </div>
            </div>
            
        </div>
        </div>
    );
};

export default FullbioDataViaFavourites;