import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useSearchManageUsers = ({ search }) => {
    const { data : searchResult=[], isLoading } = useQuery({
        queryKey: ['searchResult', search],
        queryFn: async () => {
            const res = await axios.get(`https://shaadi-server.vercel.app/managemembers/search?q=${search}`)
            return res.data
        }
    })
    return {searchResult, isLoading}
};

export default useSearchManageUsers;