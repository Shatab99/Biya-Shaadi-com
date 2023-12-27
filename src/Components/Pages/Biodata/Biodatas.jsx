import { Helmet } from "react-helmet-async";
import BiodataCards from "./BiodataCards";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import useMembers from "../../Hooks/useMembers";
import Lottie from "lottie-react";
import animationLoading from "../../../Animations/Animation - Loading.json"
import { CiSearch } from "react-icons/ci";
import useSearch from "../../Hooks/useSearch";
import SearchCards from "./SearchCards";


const Biodatas = () => {
    const [select, setSelect] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [members, isLoading] = useMembers({ select })
    const { searchResult, isLoading: searchLoading } = useSearch({ searchTerm })

    const handleSearch = e => {
        e.preventDefault()
        setSearchTerm(e.target.search.value)
    }
    console.log(searchTerm)


    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 max-w-6xl mx-auto lg:my-12 ">
            <Helmet><title>Bio Data</title></Helmet>
            <div className="lg:mb-0 mb-6 ">
                <h1 className="font-semibold my-8">Select Division To Find People Easily</h1>
                <select onChange={(e) => setSelect(e.target.value)} className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Divisions</option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Khulna</option>
                    <option>Rajshahi</option>
                    <option>Khulna</option>
                    <option>Sylhet</option>
                    <option>Mymensingh</option>

                </select>
                <div className="mt-8 relative">
                    <h1 className="mb-4 font-semibold">Search Your Partner Here </h1>
                    <form onSubmit={handleSearch} className="join">
                        <div>
                            <div>
                                <input name="search" className="input input-bordered join-item" placeholder="Search" />
                            </div>
                        </div>
                        <div className="indicator">
                            <button  onClick={()=>document.getElementById('my_modal_3').showModal()} className="btn join-item bg-red-400 text-white hover:text-black"><CiSearch className="text-3xl" /></button>
                        </div>
                    </form>
                    <SearchCards searchResult={searchResult} searchLoading={searchLoading} />
                </div>
            </div>
            {/* */}
            <div className="col-span-1 lg:col-span-3">
                <InfiniteScroll dataLength={10} height={600} className="lg:p-5">
                    {
                        isLoading ?
                            <div className="max-w-xs mx-auto"><Lottie animationData={animationLoading} /></div>
                            :
                            <BiodataCards members={members} />
                    }
                </InfiniteScroll>
                        
            </div>
        </div>
    );
};

export default Biodatas;