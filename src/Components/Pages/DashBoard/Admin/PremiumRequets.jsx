import InfiniteScroll from "react-infinite-scroll-component";
import usePayments from "../../../Hooks/usePayments";
import Swal from "sweetalert2";
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from '../../../../Animations/Animation - Loading.json'
import { Helmet } from "react-helmet-async";


const PremiumRequets = () => {
    const { paymentUsers, isLoading, refetch } = usePayments()


    const handleApprove = (_id, email) => {
        console.log(_id, email)
        axios.patch(`http://localhost:5000/members/makepremium/${email}`, { member: 'premium' })
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "This User is now Premium Member !",
                    showConfirmButton: false,
                    timer: 1500
                });

            })

        axios.patch(`http://localhost:5000/payments/${_id}`, { status: 'confirm' })
            .then(res => {
                console.log(res.user)
            })



    }



    const handleCancel = _id => {
        Swal.fire({
            title: "Are you sure to Cancel",
            icon: "warning",
            background: 'black',
            showCancelButton: true,
            confirmButtonColor: "red",
            cancelButtonColor: "green",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/payments/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            title: "User Canceled!",
                            background: 'black',
                            icon: "success"
                        });
                        refetch();
                    })

            }
        });
    }


    return (
        <div className="p-5">
            <Helmet><title>Premium Member Requests</title></Helmet>
            <h1 className="text-3xl font-semibold mb-8">Premium Member Requests : </h1>
            <InfiniteScroll dataLength={paymentUsers.length} next={paymentUsers} height={600}>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Transaction Info</th>
                                <th>Status</th>
                                <th>Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                isLoading ?
                                    <div>
                                        <Lottie animationData={loadingAnimation} />
                                    </div>
                                    :
                                    paymentUsers.map(user => <>
                                        <tr>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={user.photo} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{user.name}</div>
                                                        <div className="text-sm opacity-50">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {user.date.slice(0, 10)}
                                            </td>
                                            <td >
                                                <div className="font-semibold text-red-800 mb-2">
                                                    ID : {user.transactionId}
                                                </div>
                                                <div>
                                                    Amount : $ {user.price}
                                                </div>
                                            </td>
                                            <td>
                                                <div className={`badge badge-ghost badge-lg p-4 ${user.status === 'confirm'? 'bg-green-800' :'bg-orange-500'} text-white`}>
                                                    {user.status}
                                                </div>
                                            </td>
                                            {
                                                user.status === 'confirm' ? 
                                                <td>
                                                    Premiumed
                                                </td>
                                                :
                                                    <td className="flex flex-col gap-y-3 ">
                                                        <button onClick={() => handleApprove(user._id, user.email)} className="btn btn-sm bg-green-700 text-white hover:text-black">Make Premium</button>
                                                        <button onClick={() => handleCancel(user._id)} className="btn btn-sm bg-red-700 text-white hover:text-black">Cancel</button>
                                                    </td>
                                            }
                                        </tr>
                                    </>)
                            }

                        </tbody>


                    </table>
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default PremiumRequets;