import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useManageUsers = ({page, search}) => {
    const {data : allUsers=[], isLoading, refetch}=useQuery({
        queryKey : ['allUsers', page, search],
        queryFn: async()=>{
            const res = await axios.get(`http://localhost:5000/managemembers?q=${search}&page=${page}&limit=6`)
            return res.data
        }
    })

    return {allUsers, isLoading, refetch}
};

export default useManageUsers;