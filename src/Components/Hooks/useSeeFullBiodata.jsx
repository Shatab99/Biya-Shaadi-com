import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useSeeFullBiodata = ({requestedEmail}) => {
    const {data : fullbiodata=[], isLoading, refetch}= useQuery({
        queryKey:['fullbiodata', requestedEmail],
        queryFn : async()=>{
            const res= await axios.get(`https://shaadi-server.vercel.app/members/biodata/${requestedEmail}`)
            return res.data
        }
    })
    return {fullbiodata, isLoading, refetch}
};

export default useSeeFullBiodata;