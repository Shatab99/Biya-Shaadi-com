import Swal from "sweetalert2";
import useFavourites from "../../Hooks/useFavourites";
import axios from "axios";
import Lottie from "lottie-react";
import emptyTableAnimation from '../../../Animations/empty-table-animation.json'
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Favourites = () => {
    const [favorites, , refetch] = useFavourites()
    const handleDelete = _id => {
        console.log(_id)
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
        <div className="p-4">
            <Helmet><title>Favourites Lists</title></Helmet>
            <h1 className="text-3xl font-semibold">Your Requested Favourites : </h1>
            <InfiniteScroll dataLength={favorites.length} next={favorites} height={600} className="p-4">
                {
                    favorites?.length === 0 ?
                        <div className="max-w-xs mx-auto "><Lottie animationData={emptyTableAnimation} />
                            <p className="text-center">No Favourites Found</p>
                        </div>
                        :
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th className="text-center">status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        favorites?.map(favourite => <>
                                            <tr>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={favourite.requestUser} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{favourite.requestName}</div>
                                                            <div className="text-sm opacity-50">{favourite.requestOccupation}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="flex justify-center">
                                                    {
                                                        favourite.status === 'confirm' ? 
                                                        <p className="p-2 bg-green-800 text-center text-white font-semibold rounded-full">Confrimed</p>
                                                        : <p className="p-2 bg-orange-500 text-center text-white font-semibold rounded-full">Pending</p>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        favourite.status === 'confirm'?
                                                        <Link to={`/dashboard/fullbiodataviafav/${favourite._id}`} className="btn bg-blue-800 text-white hover:text-black">Go to Profile</Link>
                                                        :
                                                        <button onClick={() => handleDelete(favourite._id)} className="btn bg-red-800 text-white hover:text-black">Cancel Request</button>
                                                    }
                                                </td>
                                            </tr>
                                        </>)
                                    }
                                </tbody>
                            </table>
                        </div>
                }
            </InfiniteScroll>
        </div>
    );
};

export default Favourites;