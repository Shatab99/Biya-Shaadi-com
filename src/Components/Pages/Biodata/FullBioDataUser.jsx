import { useLoaderData } from "react-router-dom";
import useEachFullBiodata from "../../Hooks/useEachFullBiodata";


const FullBioDataUser = () => {
    const { email } = useLoaderData()
    console.log(email)
    const { eachBiodata } = useEachFullBiodata({ email })
    console.log(eachBiodata)
    return (
        <div className="p-5">
            <h1 className="text-4xl font-semibold mb-4">{eachBiodata.name} Biodata :</h1>
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-12 bg-[#F8CE78] flex flex-col items-center  gap-5">
                        <img src={eachBiodata.profile_pic} alt="" className="w-40 h-40 rounded-full mx-auto" />
                        <div className="text-center">
                            <p className="text-4xl font-bold">{eachBiodata.name}</p>
                            <p>{eachBiodata.email}</p>
                            <p>{eachBiodata.phone}</p>
                            <p className="text-lg font-semibold">{eachBiodata.occupation}</p>
                        </div>
                    </div>
                    <div className="p-4 bg-[#9A771B]  text-white">
                        <h1 className="text-2xl font-semibold text-center mb-2 ">Details : </h1>
                        <div className="flex flex-col items-start">
                            <p>Father Name : {eachBiodata.fatherName}</p>
                            <p>Mother Name : {eachBiodata.motherName}</p>
                            <p>Age : {eachBiodata.age}</p>
                            <p>Date Of Birth : {eachBiodata.dob}</p>
                            <p>Gender : {eachBiodata.gender}</p>
                            <p>Height  : {eachBiodata.height} cm</p>
                            <p>Weight  : {eachBiodata.weight} kg</p>
                            <p>Contact Email  : {eachBiodata.contactEmail}</p>
                            <p>Present Address  : {eachBiodata.presentDivision} (Division)</p>
                            <p>Permanent Address  : {eachBiodata.division} (Division)</p>
                            <p>Expected Partner Age  : {eachBiodata.partnerAge} </p>
                            <p>Expected Partner Height  : {eachBiodata.partnerHeight} cm</p>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FullBioDataUser;