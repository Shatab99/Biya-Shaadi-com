import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useAdmin = () => {
    const { user } = useContext(AuthContext)
    const email = user.email
    const { data: member = {}, isLoading, refetch } = useQuery({
        queryKey: ['member', email],
        queryFn: async () => {
            const res = await axios.get(`https://shaadi-server.vercel.app/members/admin/${email}`)
            return res.data
        }
    })

    return { member, isLoading, refetch }

};

export default useAdmin;