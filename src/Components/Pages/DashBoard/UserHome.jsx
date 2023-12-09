import { useContext } from "react";
import useBiodata from "../../Hooks/useBiodata";
import { IoMdLogOut } from "react-icons/io";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";


const UserHome = () => {
    const { biodata } = useBiodata()
    const { logOut } = useContext(AuthContext)
    const handleSignOut = () => {
        Swal.fire({
            title: "Are you sure?",
            imageUrl: 'https://cdn.dribbble.com/users/1797873/screenshots/5310497/logout.gif',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out!",
            imageWidth: 400,
            imageHeight: 300,
            background: 'black'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(res => {
                        console.log(res.user, 'Signed Out')
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
                Swal.fire({
                    title: "Logged Out",
                    text: "You are Successfully Logged Out",
                    icon: "success",
                    background: 'black'
                });

            }
        });
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Your Bio data :</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 bg-[#F8CE78] flex flex-col items-center  gap-5">
                    <img src={biodata.profile_pic} alt="" className="w-40 h-40 rounded-full mx-auto" />
                    <div className="text-center">
                        <p className="text-4xl font-bold">{biodata.name}</p>
                        <p>{biodata.email}</p>
                        <p>{biodata.phone}</p>
                        <p className="text-lg font-semibold">{biodata.occupation}</p>
                    </div>
                </div>
                <div className="p-4 bg-[#9A771B]  text-white">
                    <h1 className="text-2xl font-semibold text-center mb-2 ">Details : </h1>
                    <div className="flex flex-col items-start">
                        <p>Father Name : {biodata.fatherName}</p>
                        <p>Mother Name : {biodata.motherName}</p>
                        <p>Age : {biodata.age}</p>
                        <p>Date Of Birth : {biodata.dob}</p>
                        <p>Gender : {biodata.gender}</p>
                        <p>Height  : {biodata.height} cm</p>
                        <p>Weight  : {biodata.weight} kg</p>
                        <p>Contact Email  : {biodata.contactEmail}</p>
                        <p>Present Address  : {biodata.presentDivision} (Division)</p>
                        <p>Permanent Address  : {biodata.division} (Division)</p>
                        <p>Expected Partner Age  : {biodata.partnerAge} </p>
                        <p>Expected Partner Height  : {biodata.partnerHeight} cm</p>

                    </div>
                </div>
            </div>
            <div onClick={handleSignOut} className="flex justify-end mt-4">
                <button className="btn bg-red-800 text-white hover:text-black">Sign Out <IoMdLogOut className="text-xl" /></button>
            </div>
        </div>
    );
};

export default UserHome;