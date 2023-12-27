import { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useGender from "../../Hooks/useGender";
import { FaLocationDot } from "react-icons/fa6";
import InfiniteScroll from "react-infinite-scroll-component";
import Lottie from "lottie-react";
import animationLoading from "../../../Animations/Animation - Loading.json"
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useCheckRole from "../../Hooks/useCheckRole";
import { Helmet } from "react-helmet-async";
import useFriends from "../../Hooks/useFriends";



const BioDataDetails = () => {
    const { gender: sex, name, profile_pic, division, age, occupation, member, email, phone, _id } = useLoaderData()
    const [gender, setGender] = useState('')
    const { user } = useContext(AuthContext)
    const [genders, isLoading] = useGender({ gender })
    const checkEmail = user.email
    const { checkRole } = useCheckRole({ checkEmail })
    const requestEmail = user.email
    const { friends } = useFriends({ requestEmail })
    const friend = friends.map(friend => { return friend?.email })
    const newFriend = friend[0];
    console.log(newFriend)

    const handleRequest = () => {
        const requestedEmail = user.email;
        const requestedUserName = user.displayName;
        const requestedUserPhoto = user.photoURL;
        const requestUser = profile_pic
        const requestEmail = email;
        const requestName = name;
        const requestphone = phone;
        const seeBiodataId = _id
        const requestOccupation = occupation;
        const requestedForm = {
            requestEmail, requestedEmail, requestName, requestphone, requestedUserPhoto, requestedUserName, requestUser, requestOccupation,
            seeBiodataId
        }
        console.log(requestedForm)


        axios.post(`https://shaadi-server.vercel.app/requests/`, requestedForm)
            .then(res => {
                console.log("posted", res.data)
                Swal.fire({
                    title: "Successfully Requested! Wait For The Reply 😉",
                    imageUrl: "https://cdn.pixabay.com/animation/2023/02/13/01/13/01-13-56-654_512.gif",
                    imageWidth: 400,
                    imageHeight: 300,
                    imageAlt: "Custom image"
                });
            })
    }


    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 my-12">
            <Helmet><title>Member Details</title></Helmet>
            <div className="p-5 flex flex-col items-center border-dashed border-4 shadow-2xl rounded-2xl gap-y-2 ">
                <div className="">
                    {member && <p className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 text-white"> {member} </p>}
                </div>
                <h1 className="text-2xl text-center font-semibold">Gender : {sex}</h1>
                <img src={profile_pic} alt="" className="w-40 h-40 rounded-2xl" />
                <div className="flex flex-col gap-2 items-start">
                    <p><span className="font-semibold">Name : </span> {name}</p>
                    <p><span className="font-semibold">Age : </span>{age}</p>
                    <p className="hidden"><span className="font-semibold ">Age : </span>{phone}</p>
                    <p>Working Proffession <span className="font-semibold">{occupation}</span></p>
                    <p>Lives in <span className="font-semibold">{division}</span></p>
                </div>
                <div className="mt-12">
                    {
                        newFriend === email ? <p className="animate-bounce">You are friends !!</p> :
                            user.email === email ? <button className="btn bg-green-900 text-white hover:text-black" disabled>Your Cannot Request Own Contact</button> : <button onClick={handleRequest} className="btn bg-green-900 text-white hover:text-black">Request Contact</button>
                    }
                </div>
                <div className="mt-8">
                    {
                        checkRole.member === 'premium' || checkRole.role === 'admin' || newFriend === email ? <Link to={`/dashboard/fullbiodatauser/${email}`} className="btn bg-blue-800 text-white hover:text-black">See Full information </Link>
                            :
                            <Link to={`/dashboard/checkout`} className="btn bg-blue-800 text-white hover:text-black">See Full information </Link>
                    }
                </div>
            </div>
            <div className="lg:col-span-2 flex flex-col ">
                <div className="flex flex-col gap-2 items-end mb-5">
                    <h1 className="mb-3 font-semibold">Select Gender To Find Your Partner Easily</h1>
                    <select onChange={(e) => setGender(e.target.value)} className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className="">
                    <InfiniteScroll dataLength={genders.length} next={gender} height={600} className="grid grid-cols-1 lg:grid-cols-2 p-5 gap-4">
                        {
                            isLoading ?
                                <div className="max-w-xs mx-auto"><Lottie animationData={animationLoading} /></div>
                                :
                                genders.map(member => <>
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
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default BioDataDetails;