import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useBiodata = () => {
    const {user}= useContext(AuthContext)

    const {data: biodata={}, isLoading , refetch}= useQuery({
        queryKey: ['biodata', user],
        queryFn : async ()=>{
            const res = await axios.get(`http://localhost:5000/members/biodata/${user.email}`)
            return res.data;
        }
    })
    return {biodata, isLoading, refetch}
};

export default useBiodata;