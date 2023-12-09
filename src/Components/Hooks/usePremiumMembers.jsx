import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const usePremiumMembers = () => {
    const {data : premiums =[], isLoading, refetch}= useQuery({
        queryKey : ['premiums'],
        queryFn : async ()=>{
            const res = await axios.get('https://shaadi-server.vercel.app/memberpremium')
            return res.data;
        }
    })
    return {premiums, isLoading, refetch}
};

export default usePremiumMembers;