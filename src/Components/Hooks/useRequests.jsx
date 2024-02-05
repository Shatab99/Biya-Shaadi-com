import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useRequests = () => {
    const {user}= useContext(AuthContext) 
    const {data : requestedEmails =[], isLoading, refetch} = useQuery({
        queryKey:['requestedEmails', user.email],
        queryFn : async()=>{
            const res = await axios.get(`http://localhost:5000/requests/${user.email}`)
            return res.data
        }
    })
    return [requestedEmails, isLoading, refetch]
};

export default useRequests;