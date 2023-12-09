import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useManageUsers = () => {
    const {data : allUsers=[], isLoading, refetch}=useQuery({
        queryKey : ['allUsers'],
        queryFn: async()=>{
            const res = await axios.get('https://shaadi-server.vercel.app/members')
            return res.data
        }
    })

    return {allUsers, isLoading, refetch}
};

export default useManageUsers;