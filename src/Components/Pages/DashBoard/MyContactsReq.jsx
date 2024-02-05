import useRequests from "../../Hooks/useRequests";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import axios from "axios";
import Swal from "sweetalert2";
import emptyTableAnimation from '../../../Animations/empty-table-animation.json'
import InfiniteScroll from "react-infinite-scroll-component";
import Lottie from "lottie-react";
import loadingAnimation from '../../../Animations/Animation - Loading.json'
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const MyContactsReq = () => {
    const {user}= useContext(AuthContext)
    const [requestedEmails, isLoading, refetch] = useRequests()
    const status = requestedEmails.map(email => { return email.status });
    const reqemail = requestedEmails.map(email => {return email.requestedEmail})
    console.log(reqemail[0])

    const handleConfirm = _id => {
        console.log(_id)

        axios.post('http://localhost:5000/friends', { email : reqemail[0] , requestEmail: user.email })
            .then(res => console.log(res))

        axios.patch(`http://localhost:5000/requests/${_id}`, { status: 'confirm' })
            .then(res => {
                console.log(res)
                refetch();
                Swal.fire({
                    title: "Confirmed , Now You Can See Each other details!",
                    imageUrl: "https://i.pinimg.com/originals/67/85/cc/6785ccfbe9de7e05917907904514b516.gif",
                    imageWidth: 400,
                    imageHeight: 300,
                    imageAlt: "Custom image"
                });

            })
    }


    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure to cancel ?",
            imageUrl: "https://cliply.co/wp-content/uploads/2021/03/392103390_SAD_EMOJI_400px.gif",
            imageWidth: 200,
            imageHeight: 200,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            background: 'black',
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/requests/${_id}`)
                    .then(res => {
                        console.log('Deleted', res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Request Canceled!",
                                imageUrl: "https://i.pinimg.com/originals/45/da/b1/45dab17c7037b47d5e24ce926b12fd5d.gif",
                                imageWidth: 400,
                                imageHeight: 300,
                            });
                        }
                    })
            }
        });
    }
    return (
        <div className="mx-auto p-5">
            <Helmet><title>Contact Requests</title></Helmet>
            <h1 className="text-3xl font-semibold ">Your Requested Contacts :</h1>
            <InfiniteScroll dataLength={requestedEmails.length} next={requestedEmails} height={600} className="p-5">
                <div className="overflow-x-auto">
                    {
                        requestedEmails.length === 0 ?
                            <div className="max-w-xs mx-auto">
                                <Lottie animationData={emptyTableAnimation}></Lottie>
                                <p className="text-center">No Request Found !</p>
                            </div>
                            :
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        {
                                            status[0] && <th>Contacts</th>
                                        }
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        isLoading ?
                                            <div className="max-w-xs mx-auto">
                                                <Lottie animationData={loadingAnimation} />
                                            </div>
                                            :
                                            requestedEmails.map(requested => <>
                                                <tr>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <img src={requested.requestedUserPhoto} alt="Avatar Tailwind CSS Component" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{requested.requestedUserName}</div>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {
                                                            requested.status === 'confirm' &&
                                                            <div>
                                                                <div className="font-bold">{requested.requestphone}</div>
                                                                <div className="text-sm opacity-50">
                                                                    Contact Email : {requested.requestedEmail}
                                                                </div>
                                                            </div>
                                                        }
                                                    </td>

                                                    <td className="flex items-center gap-5 ">
                                                        {
                                                            requested.status === 'confirm' ?
                                                                <div className="flex items-center gap-4">
                                                                    <p>Confirmed</p>
                                                                    <Link to={`/dashboard/fullbiodata/${requested._id}`} className="btn bg-green-800 text-white hover:text-black">Go to Profile</Link>
                                                                </div>

                                                                :
                                                                <>
                                                                    <button onClick={() => handleConfirm(requested._id)} className="btn bg-green-800 text-white hover:text-black"><TiTick className="text-5xl" /></button>
                                                                    <button onClick={() => handleDelete(requested._id)} className="btn bg-red-800 text-white hover:text-black"><ImCross className="text-2xl" /></button>
                                                                </>
                                                        }
                                                    </td>
                                                </tr>
                                            </>)
                                    }
                                </tbody>
                            </table>
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default MyContactsReq;