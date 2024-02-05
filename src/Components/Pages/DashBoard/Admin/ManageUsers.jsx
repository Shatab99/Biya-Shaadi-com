import Lottie from "lottie-react";
import useManageUsers from "../../../Hooks/useManageUsers";
import loadingAnimation from "../../../../Animations/Animation - Loading.json"
import InfiniteScroll from "react-infinite-scroll-component";
import { GrUserAdmin } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { CiSearch } from "react-icons/ci";
import { useLoaderData } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";



const ManageUsers = () => {
    const { count } = useLoaderData()
    const [search, setSearch] = useState('')
    const pageCount = parseInt(count)
    const totalPage = Math.ceil(pageCount / 6)
    const [page, setPage] = useState(1)
    const { allUsers, isLoading, refetch } = useManageUsers({ page, search })
    console.log(allUsers)

    const handleAdmin = _id => {
        console.log(_id)
        Swal.fire({
            title: "Are you sure to make this User Admin?",
            background: 'black',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "red",
            confirmButtonText: "Yes, make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:5000/members/makeadmin/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            title: "This User is now Admin",
                            background: 'black',
                            icon: "success"
                        });
                        refetch();
                    })
            }
        });
    }



    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure to delete this User?",
            background: 'black',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/members/deleteuser/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            title: "User has been deleted.",
                            background: 'black',
                            icon: "success"
                        });
                        refetch();
                    })
            }
        });
    }

    const handleSearch = e => {
        e.preventDefault()
        setSearch(e.target.search.value)
        setPage(1)
    }


    return (
        <div className="px-5" >
            <Helmet><title>Manange Users (Admin)</title></Helmet>
            <div className="flex items-center mb-8 justify-between">
                <h1 className="text-4xl font-semibold ">Manage All Users :</h1>
                <form onSubmit={handleSearch} className="join">
                    <div>
                        <div>
                            <input name="search" className="input input-bordered join-item" placeholder="Search by email" />
                        </div>
                    </div>
                    <div className="indicator">
                        <button className="btn join-item bg-red-400 text-white hover:text-black"><CiSearch className="text-3xl" /></button>
                    </div>
                </form>
            </div>
            <InfiniteScroll dataLength={allUsers.length} next={allUsers} height={350} className="border-t-2 border-b-2">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Information</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* rows */}
                            {
                                isLoading ? <div className="max-w-xs flex justify-center">
                                    <Lottie animationData={loadingAnimation} />
                                </div>
                                    :
                                    allUsers.map(user => <>
                                        <tr>
                                            <td>
                                                <div className="flex items-center gap-3" >
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={user.profile_pic} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{user.name}</div>
                                                        <div className="text-sm opacity-50">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {user.division}
                                                <br />
                                                <span className="badge badge-ghost badge-sm">{user.occupation}</span>
                                            </td>
                                            {
                                                user.member ? <td className="badge badge-ghost badge-lg mt-4 p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-white text-center">{user.member}</td> :
                                                    <td className="badge badge-ghost badge-lg mt-4 p-4 bg-orange-600  text-white text-center">Normal User</td>
                                            }
                                            {
                                                user.role === 'admin' ?
                                                    <td className="">
                                                        <p className="flex justify-center ml-6 badge badge-ghost badge-lg  p-4 bg-blue-600  text-white text-center">Admin</p>
                                                    </td>
                                                    :
                                                    <td className="">
                                                        <button onClick={() => handleAdmin(user._id)} data-tip='Make This User Admin' className="btn bg-green-800 text-white hover:text-black mr-8 text-lg tooltip"><GrUserAdmin className="" /></button>
                                                        <button onClick={() => handleDelete(user._id)} data-tip="Delete User" className="btn tooltip text-xl bg-red-800 text-white hover:text-black"><MdDeleteForever /></button>
                                                    </td>
                                            }
                                        </tr>
                                    </>)

                            }
                        </tbody>
                    </table>
                </div>
            </InfiniteScroll>
            <div className="flex justify-end mt-2 gap-4 ">
                {
                    search.length === 0 ? <>
                        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="btn btn-circle bg-red-400 text-white hover:text-black"><FaArrowLeft /></button>
                        <button disabled={page === totalPage} className="btn btn-circle bg-red-400 text-white hover:text-black" onClick={() => setPage(page + 1)}><FaArrowRight /></button>
                    </> :
                    <p></p>
                }
            </div>

        </div>
    );
};

export default ManageUsers;