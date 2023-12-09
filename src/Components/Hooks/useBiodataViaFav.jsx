import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useBiodataViaFav = ({requestEmail}) => {
    const {data : biodataViaFav =[],isLoading, refetch }=useQuery({
        queryKey :['biodataViaFav', requestEmail],
        queryFn : async()=>{
            const res = await axios.get(`https://shaadi-server.vercel.app/members/biodata/${requestEmail}`)
            return res.data 
        }
    })

    return {biodataViaFav, isLoading, refetch}

};

export default useBiodataViaFav;