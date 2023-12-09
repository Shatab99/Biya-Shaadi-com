import { useLoaderData } from "react-router-dom";
import useSeeFullBiodata from "../../Hooks/useSeeFullBiodata";


const FullBiodata = () => {
    const {requestedEmail} = useLoaderData()
    console.log(requestedEmail)
    const {fullbiodata} = useSeeFullBiodata({requestedEmail})
    console.log(fullbiodata)
    return (
        <div className="p-5">
            <h1 className="text-4xl font-semibold mb-4">{fullbiodata.name} Biodata :</h1>
            <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 bg-[#F8CE78] flex flex-col items-center  gap-5">
                    <img src={fullbiodata.profile_pic} alt="" className="w-40 h-40 rounded-full mx-auto" />
                    <div className="text-center">
                        <p className="text-4xl font-bold">{fullbiodata.name}</p>
                        <p>{fullbiodata.email}</p>
                        <p>{fullbiodata.phone}</p>
                        <p className="text-lg font-semibold">{fullbiodata.occupation}</p>
                    </div>
                </div>
                <div className="p-4 bg-[#9A771B]  text-white">
                    <h1 className="text-2xl font-semibold text-center mb-2 ">Details : </h1>
                    <div className="flex flex-col items-start">
                        <p>Father Name : {fullbiodata.fatherName}</p>
                        <p>Mother Name : {fullbiodata.motherName}</p>
                        <p>Age : {fullbiodata.age}</p>
                        <p>Date Of Birth : {fullbiodata.dob}</p>
                        <p>Gender : {fullbiodata.gender}</p>
                        <p>Height  : {fullbiodata.height} cm</p>
                        <p>Weight  : {fullbiodata.weight} kg</p>
                        <p>Contact Email  : {fullbiodata.contactEmail}</p>
                        <p>Present Address  : {fullbiodata.presentDivision} (Division)</p>
                        <p>Permanent Address  : {fullbiodata.division} (Division)</p>
                        <p>Expected Partner Age  : {fullbiodata.partnerAge} </p>
                        <p>Expected Partner Height  : {fullbiodata.partnerHeight} cm</p>

                    </div>
                </div>
            </div>
            
        </div>
        </div>
    );
};

export default FullBiodata;