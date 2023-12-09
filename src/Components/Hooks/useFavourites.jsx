import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useFavourites = () => {
    const {user}= useContext(AuthContext)
    const {data : favourites =[], isLoading, refetch}=useQuery({
        queryKey : ['favourites', user.email],
        queryFn : async()=>{
            const res = await axios.get(`https://shaadi-server.vercel.app/requests/favorites/${user.email}`)
            return res.data
        }
    })
    return [favourites, isLoading, refetch]
};

export default useFavourites;